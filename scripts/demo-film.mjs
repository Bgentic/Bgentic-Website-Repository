// The "See it working" film: one Bgentic app window moving through six screens on an ordinary Tuesday at an example
// plumbing business (Overview, Inbox, Pipeline, Automations, Website, Reports), the sidebar steady while the main
// panel changes, as on Attio's homepage. Every frame is drawn from this file: a deterministic seek(t) sets each
// element for an instant, Edge screenshots it, and WebCodecs encodes the frames to H.264 in the page (Mediabunny
// muxes the MP4). The loop is seamless: the last screen hands back to the first.
//
//   npm run film                         render public/video/see-it-working.mp4 and its poster (needs Edge)
//   npm run film -- --stills             write a few frames to scripts/.film-stills for review instead
//
// Everything on screen is made up, and the page around the film says so.
import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import * as lucide from "lucide-react"
import { chromium } from "playwright-core"

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(HERE, "..")
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
// Attio's screen proportions (1.835:1, measured on attio.com); 2070 x 1128 frames, sharp in a window up to 1440px
const W = 1380
const H = 752
const SCALE = 1.5
const FPS = 30
const BITRATE = 2_000_000
const STILLS = process.argv.includes("--stills")

const icon = (name, size = 16, stroke = 1.75) => {
  const C = lucide[name]
  if (!C) throw new Error("no icon " + name)
  return renderToStaticMarkup(React.createElement(C, { size, strokeWidth: stroke, "aria-hidden": true }))
}
const BRAND = `<svg viewBox="9.17 10.06 20.34 28.28" width="15" height="21" aria-hidden="true"><path fill="#fff" d="M24.45,20.88c.75-1.07,1.2-2.36,1.2-3.77,0-3.6-2.9-6.51-6.49-6.55h0s-7.45,0-7.45,0c-1.13,0-2.04.91-2.04,2.04v16.19l8.99,9.05h.5s.51,0,.51,0c4.87,0,9.06-3.72,9.33-8.58.2-3.58-1.69-6.74-4.55-8.39Z"/><path fill="#3b82f6" d="M16.74,28.79h-7.07s8.99,9.05,8.99,9.05v-7.14c0-1.06-.86-1.92-1.92-1.92Z"/></svg>`

/* ---------------------------------------------------------------- the story */

const NAV = [
  ["LayoutGrid", "Overview"],
  ["Inbox", "Inbox", 3],
  ["CalendarDays", "Calendar"],
  ["Users", "Contacts"],
  ["KanbanSquare", "Pipeline"],
  ["Workflow", "Automations"],
  ["Globe", "Website"],
  ["BarChart3", "Reports"],
]
// scene: nav item it lights, breadcrumb, length in seconds
const SCENES = [
  { nav: 0, icon: "LayoutGrid", crumb: "Overview", sub: "", dur: 5 },
  { nav: 1, icon: "Inbox", crumb: "Inbox", sub: "Hannah Bright", dur: 7 },
  { nav: 4, icon: "KanbanSquare", crumb: "Pipeline", sub: "Jobs", dur: 5.5 },
  { nav: 5, icon: "Workflow", crumb: "Automations", sub: "Missed call text back", dur: 6 },
  { nav: 6, icon: "Globe", crumb: "Website", sub: "Quote form", dur: 6 },
  { nav: 7, icon: "BarChart3", crumb: "Reports", sub: "Search", dur: 5.5 },
]
const TOTAL = SCENES.reduce((s, x) => s + x.dur, 0)

const KPIS = [
  ["Calls answered", 14, "", "2 after hours"],
  ["Jobs booked", 9, "", "3 more than last Tuesday"],
  ["Invoices paid", 6480, "$", "by text-to-pay"],
  ["New leads", 11, "", "5 from the website"],
]
const WEEKS = [38, 46, 41, 55, 52, 63, 58, 72]
const FEED = [
  ["7:42 am", "Missed call answered by the AI receptionist", "PhoneIncoming"],
  ["8:10 am", "Job booked: blocked drain, Paddington", "CalendarCheck"],
  ["9:15 am", "Invoice #2041 paid by text", "CreditCard"],
  ["10:02 am", "Review request sent to Sam Patel", "Star"],
  ["11:30 am", "Quote accepted: Northgate Legal", "FileCheck"],
]
const THREADS = [
  ["HB", "Hannah Bright", "Blocked drain in the kitchen…", "6:43 pm", true],
  ["SP", "Sam Patel", "Thanks, see you Thursday", "5:10 pm"],
  ["NL", "Northgate Legal", "Can we move it to 2 pm?", "3:02 pm"],
  ["MN", "Marcus Ng", "The quote looks good", "1:15 pm"],
  ["AC", "Ava Chen", "Is Friday free?", "11:20 am"],
]
const COLUMNS = [
  ["New lead", [["HB", "Hannah Bright", "Blocked drain", "$480", "move"], ["AC", "Ava Chen", "Leaking tap", "$260", "rise"]]],
  ["Quoted", [["MN", "Marcus Ng", "Bathroom refit", "$3,900"], ["NL", "Northgate Legal", "Office kitchen", "$2,400"]]],
  ["Booked", [["SP", "Sam Patel", "Hot water service", "$650"], ["SF", "Summit Fitouts", "Site maintenance", "$1,800"]]],
  ["Paid", [["HD", "Harbour Dental", "Annual service", "$980"]]],
]
const RUNS = [
  ["Run #214", "Running", "now"],
  ["Run #213", "Completed", "yesterday"],
  ["Run #212", "Completed", "2 days ago"],
  ["Run #211", "Completed", "2 days ago"],
]
const SUBMISSIONS = [
  ["Marcus Ng", "Bathroom quote", "Glebe", "1:12 pm"],
  ["Tom Brennan", "Hot water", "Ryde", "10:40 am"],
  ["Priya Naidu", "Gutter guard", "Epping", "Yesterday"],
]
const RANKS = [
  ["emergency plumber paddington", 8, 2],
  ["hot water repairs ryde", 11, 3],
  ["blocked drain sydney", 14, 6],
]
const CHANGES = ["Titles rewritten on 6 pages", "New page: blocked drains in Paddington", "Google profile updated with this week's photos"]
// the search chart's curve, drawn in a 600 x 220 sketch and mapped to the chart's real 530 x 470 box, so it stays
// unstretched and the line, its dash and its leading point agree
const CHART = [586, 430]
const sketch = "M0 196 C 40 190, 70 186, 100 182 S 160 168, 200 170 S 260 150, 300 140 S 360 128, 400 112 S 470 84, 520 62 S 570 40, 600 30"
const LINE = sketch.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${((x * CHART[0]) / 600).toFixed(1)} ${((y * CHART[1]) / 220).toFixed(1)}`)
const AREA = `${LINE} L ${CHART[0]} ${CHART[1]} L 0 ${CHART[1]} Z`

/* ---------------------------------------------------------------- markup */

const av = (i, cls = "") => `<span class="av ${cls}">${i}</span>`

const s0 = `
<div class="scene" id="s0">
  <div class="head"><div><h1>Tuesday overview</h1><p>What the system handled today, so far.</p></div><span class="pill">${icon("RefreshCw", 13)} Updated just now</span></div>
  <div class="kpis">${KPIS.map(([l, v, pre, s], i) => `<div class="card kpi"><p>${l}</p><b class="num" data-to="${v}" data-pre="${pre}" id="k${i}">${pre}0</b><small>${s}</small></div>`).join("")}</div>
  <div class="row2">
    <div class="card"><p class="card-h">Jobs booked, last 8 weeks</p><div class="bars">${WEEKS.map((h, i) => `<i id="b${i}" style="height:${h}%"${i === WEEKS.length - 1 ? ' class="now"' : ""}></i>`).join("")}</div><div class="axis"><span>Sep</span><span>Oct</span></div></div>
    <div class="card"><p class="card-h">Today</p><ul class="feed">${FEED.map(([t, x, ic], i) => `<li id="f${i}"><span class="feed-ic">${icon(ic, 14)}</span><span class="feed-x">${x}</span><span class="feed-t">${t}</span></li>`).join("")}</ul></div>
  </div>
</div>`

const s1 = `
<div class="scene" id="s1">
  <div class="inbox">
    <div class="card threads"><p class="card-h">Conversations</p><ul>${THREADS.map(([i, n, x, t, on]) => `<li${on ? ' class="on"' : ""}>${av(i)}<span class="th-x"><b>${n}</b><small>${x}</small></span><span class="th-t">${t}</span>${on ? '<span class="dot"></span>' : ""}</li>`).join("")}</ul></div>
    <div class="card thread">
      <div class="thread-h">${av("HB")}<div><b>Hannah Bright</b><small>Paddington · SMS</small></div><span class="pill sky">${icon("Sparkles", 13)} AI receptionist on</span></div>
      <div class="msgs">
        <p class="sys" id="m0">${icon("PhoneMissed", 13)} Missed call · 6:42 pm</p>
        <div class="msg ai" id="m1"><span class="mk">${icon("Sparkles", 12)}</span><p><span class="dots"><i></i><i></i><i></i></span><span class="txt">Hi Hannah, it's Brightwater Plumbing. Sorry we missed your call. What can we help with?</span></p></div>
        <div class="msg you" id="m2"><p><span class="txt">Blocked drain in the kitchen. Can someone come tomorrow?</span></p></div>
        <div class="msg ai" id="m3"><span class="mk">${icon("Sparkles", 12)}</span><p><span class="dots"><i></i><i></i><i></i></span><span class="txt">We can be there Wednesday at 8:00 am. Shall I book it in?</span></p></div>
        <div class="msg you" id="m4"><p><span class="txt">Yes please!</span></p></div>
        <p class="booked" id="m5">${icon("CalendarCheck", 14)} Booked for Wed 8:00 am and added to the calendar</p>
      </div>
    </div>
  </div>
</div>`

const deal = ([i, n, what, v, role], col, row) =>
  `<div class="deal" data-role="${role || ""}" id="d${col}${row}"><div class="deal-top"><b>${n}</b>${av(i, "sm")}</div><small>${what}</small><span class="deal-v">${v}</span></div>`
const s2 = `
<div class="scene" id="s2">
  <div class="head"><div><h1>Jobs</h1><p>Every enquiry from first call to paid.</p></div><span class="pill">${icon("SlidersHorizontal", 13)} This week</span></div>
  <div class="board">${COLUMNS.map(([name, deals], c) => `<div class="col" id="c${c}"><p class="col-h"><b>${name}</b><span class="cnt" id="cnt${c}">${deals.length}</span></p>${deals.map((d, r) => deal(d, c, r)).join("")}</div>`).join("")}</div>
</div>`

const node = (id, ic, title, sub) =>
  `<div class="node" id="${id}"><span class="node-ic">${icon(ic, 15)}</span><span><b>${title}</b><small>${sub}</small></span><span class="badge" id="${id}-b"></span></div>`
const s3 = `
<div class="scene" id="s3">
  <div class="flow">
    <div class="canvas">
      <div class="tabs"><span>${icon("PenLine", 13)} Editor</span><span class="on">${icon("Play", 13)} Runs <em>214</em></span><span>${icon("Settings", 13)} Settings</span><span class="live"><i></i> Live</span></div>
      <div class="area">
        <svg class="wires" viewBox="0 0 640 560" aria-hidden="true">
          <path id="w0" d="M320 82 V 162" />
          <path id="w1" d="M320 214 V 296" />
          <path id="w2" d="M320 348 C 320 392, 160 392, 160 436" />
          <path id="w3" d="M320 348 C 320 392, 480 392, 480 436" />
          <circle id="pulse" r="5" cx="320" cy="82" />
        </svg>
        ${node("n0", "PhoneMissed", "Missed call", "Any number, after hours")}
        ${node("n1", "Sparkles", "AI receptionist", "Text back and ask what's needed")}
        ${node("n2", "GitBranch", "Booked a job?", "Checks the calendar")}
        ${node("n3", "BellRing", "Send a reminder", "24 hours before the job")}
        ${node("n4", "Clock", "Follow up", "In two days, by text")}
      </div>
    </div>
    <div class="card runs">
      <p class="card-h">Run history</p>
      <ul>${RUNS.map(([r, , t], i) => `<li id="r${i}"><span class="run-ic${i === 0 ? " spin" : ""}">${icon(i === 0 ? "LoaderCircle" : "CircleCheck", 14)}</span><b>${r}</b><small>${i === 0 ? "Running" : t}</small></li>`).join("")}</ul>
      <p class="card-h mt">Last 30 days</p>
      <div class="tiles"><div><b class="num" data-to="149" id="rt0">0</b><small>Completed</small></div><div><b>1</b><small>In progress</small></div><div><b>0</b><small>Failed</small></div><div><b>2 s</b><small>Average run</small></div></div>
    </div>
  </div>
</div>`

const s4 = `
<div class="scene" id="s4">
  <div class="site">
    <div class="card browser">
      <div class="br-bar"><span class="br-dots"><i></i><i></i><i></i></span><span class="br-url">${icon("Lock", 11)} Brightwater Plumbing<em>/quote</em></span></div>
      <div class="br-page">
        <p class="br-kicker">${icon("Droplets", 14)} Brightwater Plumbing</p>
        <h2>Blocked drain? We can be there today.</h2>
        <div class="form">
          <label>Name<span class="field" id="i0" data-text="Ava Chen"></span></label>
          <label>Suburb<span class="field" id="i1" data-text="Surry Hills"></span></label>
          <label>What's wrong?<span class="field tall" id="i2" data-text="Leaking tap in the laundry"></span></label>
          <span class="submit" id="go">Get a quote</span>
          <p class="thanks" id="thanks">${icon("Check", 13, 2.25)} Thanks Ava, we'll text you shortly.</p>
        </div>
      </div>
    </div>
    <div class="card subs">
      <div class="subs-h"><p class="card-h">Form submissions</p><span class="pill"><b class="num" data-to="24" data-from="23" id="wk">23</b> this week</span></div>
      <ul id="sublist">
        <li class="new" id="new"><span class="sub-x"><b>Ava Chen</b><small>Leaking tap · Surry Hills</small></span><span class="pill sky" id="added">${icon("Check", 12, 2.25)} Added to pipeline</span><span class="sub-t">Just now</span></li>
        ${SUBMISSIONS.map(([n, x, s, t], i) => `<li id="o${i}"><span class="sub-x"><b>${n}</b><small>${x} · ${s}</small></span><span class="sub-t">${t}</span></li>`).join("")}
      </ul>
    </div>
  </div>
</div>`

const s5 = `
<div class="scene" id="s5">
  <div class="head"><div><h1>Search report</h1><p>Checked this morning, while you slept.</p></div><span class="pill sky">${icon("Smartphone", 13)} Sent to your phone at 6:00 am</span></div>
  <div class="report">
    <div class="card chart2">
      <div class="ch-h"><p class="card-h">Visitors from Google, last 12 weeks</p><p class="big"><b class="num" data-to="1284" id="vis">0</b><span class="up">${icon("TrendingUp", 13)} 38%</span></p></div>
      <svg viewBox="0 0 ${CHART[0]} ${CHART[1]}" class="line" aria-hidden="true">
        <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3b82f6" stop-opacity="0.3"/><stop offset="1" stop-color="#3b82f6" stop-opacity="0"/></linearGradient></defs>
        <g class="grid"><path d="M0 ${CHART[1] / 4}H${CHART[0]}M0 ${CHART[1] / 2}H${CHART[0]}M0 ${(CHART[1] * 3) / 4}H${CHART[0]}"/></g>
        <path id="area" d="${AREA}" fill="url(#g)"/>
        <path id="ln" d="${LINE}" fill="none"/>
      </svg>
      <span class="tip" id="tip"></span>
    </div>
    <div class="side2">
      <div class="card ranks"><p class="card-h">Rankings</p><ul>${RANKS.map(([q, a, b], i) => `<li><span class="q">${q}</span><span class="pos"><b class="num" data-from="${a}" data-to="${b}" data-pre="#" id="p${i}">#${a}</b></span><span class="chg" id="c${i}x">${icon("ArrowUp", 11, 2.5)} ${a - b}</span></li>`).join("")}</ul></div>
      <div class="card changes"><p class="card-h">What changed this week</p><ul>${CHANGES.map((c, i) => `<li id="h${i}">${icon("Check", 13, 2.25)} ${c}</li>`).join("")}</ul></div>
    </div>
  </div>
</div>`

const HTML = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&family=Geist:wght@500;600&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:Inter,sans-serif;font-feature-settings:"cv11","ss01";-webkit-font-smoothing:antialiased;color:#fbf6f2;background:#060b17}
svg{display:block;flex:none}
b{font-weight:600}
small{display:block;color:#938F8C}
.app{display:grid;grid-template-columns:236px 1fr;height:${H}px}
/* sidebar */
.side{position:relative;display:flex;flex-direction:column;padding:18px 12px 14px;background:radial-gradient(130% 45% at 0% 0%,rgba(21,44,85,.55),transparent 65%),linear-gradient(180deg,#060b17,color-mix(in oklab,#060b17 60%,#060b17));border-right:1px solid rgba(255,255,255,.06)}
.brand{display:flex;align-items:center;gap:9px;padding:0 8px 16px;font-family:Geist,Inter,sans-serif;font-size:16px;font-weight:600;letter-spacing:-.01em}
.ws{display:flex;align-items:center;gap:10px;padding:8px 10px;margin-bottom:10px;border-radius:11px;background:rgba(6,11,23,.35);box-shadow:inset 0 0 0 1px rgba(59,130,246,.12)}
.ws b{display:block;font-size:12.5px}.ws small{font-size:11px;color:rgba(251,247,243,.5)}.ws svg{margin-left:auto;color:rgba(251,247,243,.5)}
.ws-av{display:grid;place-items:center;width:28px;height:28px;border-radius:8px;font-size:11px;font-weight:700;color:#fbf7f3;background:linear-gradient(180deg,#152c55,#112344);box-shadow:inset 0 0 0 1px rgba(59,130,246,.25)}
.search{display:flex;align-items:center;gap:8px;height:32px;padding:0 10px;margin-bottom:12px;border-radius:9px;font-size:12px;color:rgba(251,247,243,.5);background:rgba(6,11,23,.4);box-shadow:inset 0 0 0 1px rgba(59,130,246,.1)}
.search kbd{margin-left:auto;font:600 10px Inter,sans-serif;padding:2px 5px;border-radius:5px;background:rgba(59,130,246,.1)}
.nav{position:relative;display:grid;gap:2px}
.nav-hl{position:absolute;left:0;right:0;top:0;height:34px;border-radius:9px;background:linear-gradient(90deg,rgba(59,130,246,.18),rgba(59,130,246,.06));box-shadow:inset 0 0 0 1px rgba(59,130,246,.18),inset 0 1px 0 rgba(255,255,255,.06)}
.nav-i{position:relative;display:flex;align-items:center;gap:10px;height:34px;padding:0 10px;font-size:12.5px;font-weight:500;color:rgba(251,247,243,.62)}
.nav-i svg{color:rgba(251,247,243,.45)}
.nav-i em{margin-left:auto;font-style:normal;font-size:10px;font-weight:700;padding:1px 6px;border-radius:999px;color:#060b17;background:#3b82f6}
.side-foot{margin-top:auto;display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:10px;font-size:12px;color:#fbf7f3;background:rgba(59,130,246,.08);box-shadow:inset 0 0 0 1px rgba(59,130,246,.14)}
.side-foot svg{color:#3b82f6}
/* main */
.main{position:relative;min-width:0;background:radial-gradient(800px 380px at 75% -10%,rgba(21,44,85,.3),transparent 70%),#060b17}
.top{position:relative;display:flex;align-items:center;height:52px;padding:0 22px;border-bottom:1px solid rgba(255,255,255,.06)}
.crumbs{position:relative;flex:1;height:52px}
.crumb{position:absolute;inset:0;display:flex;align-items:center;gap:8px;font-size:13.5px;font-weight:600}
.crumb svg{color:#3b82f6}
.crumb em{font-style:normal;font-weight:500;color:#82807F}.crumb em:before{content:"/";margin:0 8px;color:rgba(255,255,255,.18)}
.top-r{display:flex;align-items:center;gap:10px}
.chip{display:flex;align-items:center;gap:6px;height:28px;padding:0 10px;border-radius:8px;font-size:11.5px;color:#938F8C;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
.ask{display:flex;align-items:center;gap:6px;height:28px;padding:0 11px;border-radius:8px;font-size:11.5px;font-weight:600;color:#fbf7f3;background:rgba(59,130,246,.1);box-shadow:inset 0 0 0 1px rgba(59,130,246,.2)}
.ask svg{color:#3b82f6}
.me{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;font-size:10.5px;font-weight:700;color:#fbf7f3;background:linear-gradient(180deg,#152c55,#112344);box-shadow:inset 0 0 0 1px rgba(59,130,246,.25)}
.stage{position:absolute;left:0;right:0;top:52px;bottom:0}
.scene{position:absolute;inset:0;padding:22px 24px;opacity:0}
/* shared */
.card{border-radius:14px;background:linear-gradient(180deg,#0f141f,#090e1a);box-shadow:inset 0 0 0 1px rgba(255,255,255,.07),inset 0 1px 0 rgba(255,255,255,.06),0 1px 2px rgba(0,0,0,.4),0 14px 30px -18px rgba(0,0,0,.9)}
.card-h{font-size:12px;font-weight:600;color:#d7d0c6}
.head{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:18px}
.head h1{font-family:Geist,Inter,sans-serif;font-size:22px;font-weight:600;letter-spacing:-.02em}
.head p{margin-top:3px;font-size:12.5px;color:#82807F}
.pill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;border-radius:999px;font-size:11px;font-weight:500;color:#938F8C;box-shadow:inset 0 0 0 1px rgba(255,255,255,.09);white-space:nowrap}
.pill.sky{color:#fbf7f3;background:rgba(59,130,246,.12);box-shadow:inset 0 0 0 1px rgba(59,130,246,.24)}
.pill.sky svg{color:#3b82f6}
.av{display:grid;place-items:center;flex:none;width:30px;height:30px;border-radius:50%;font-size:10.5px;font-weight:700;color:#fbf7f3;background:linear-gradient(180deg,#152c55,#112344);box-shadow:inset 0 0 0 1px rgba(59,130,246,.25)}
.av.sm{width:24px;height:24px;font-size:9px}
.num{font-variant-numeric:tabular-nums}
/* s0 overview */
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.kpi{padding:14px 16px}
.kpi p{font-size:11.5px;color:#938F8C}
.kpi b{display:block;margin-top:4px;font-family:Geist,Inter,sans-serif;font-size:26px;letter-spacing:-.02em}
.kpi small{margin-top:2px;font-size:11px;color:#82807F}
.row2{display:grid;grid-template-columns:1.25fr 1fr;gap:12px;margin-top:12px}
.row2 .card{padding:16px 18px;height:430px}
.bars{display:flex;align-items:flex-end;gap:12px;height:330px;margin-top:18px}
.bars i{flex:1;border-radius:6px 6px 3px 3px;background:linear-gradient(180deg,rgba(59,130,246,.34),rgba(59,130,246,.08));transform-origin:bottom}
.bars i.now{background:linear-gradient(180deg,#3b82f6,#3b82f6)}
.axis{display:flex;justify-content:space-between;margin-top:10px;font-size:10.5px;color:#82807F}
.feed{list-style:none;display:grid;gap:4px;margin-top:12px}
.feed li{display:flex;align-items:center;gap:12px;padding:12px 4px;border-bottom:1px solid rgba(255,255,255,.05)}
.feed-ic{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;color:#3b82f6;background:rgba(59,130,246,.1);box-shadow:inset 0 0 0 1px rgba(59,130,246,.16)}
.feed-x{flex:1;font-size:12.5px;color:#e9e4dd}
.feed-t{font-size:11px;color:#82807F;font-variant-numeric:tabular-nums}
/* s1 inbox */
.inbox{display:grid;grid-template-columns:300px 1fr;gap:12px;height:100%}
.threads{padding:16px 10px}
.threads .card-h{padding:0 8px 10px}
.threads ul{list-style:none;display:grid;gap:2px}
.threads li{position:relative;display:flex;align-items:center;gap:10px;padding:10px 8px;border-radius:10px}
.threads li.on{background:rgba(59,130,246,.1);box-shadow:inset 0 0 0 1px rgba(59,130,246,.16)}
.th-x{flex:1;min-width:0}.th-x b{display:block;font-size:12.5px}.th-x small{font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.th-t{align-self:flex-start;font-size:10.5px;color:#82807F}
.threads .dot{position:absolute;right:10px;bottom:14px;width:7px;height:7px;border-radius:50%;background:#3b82f6}
.thread{display:flex;flex-direction:column;padding:0}
.thread-h{display:flex;align-items:center;gap:12px;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.06)}
.thread-h b{display:block;font-size:13px}.thread-h small{font-size:11.5px}.thread-h .pill{margin-left:auto}
.msgs{display:flex;flex-direction:column;gap:12px;padding:20px 22px}
.sys{align-self:center;display:flex;align-items:center;gap:6px;padding:5px 11px;border-radius:999px;font-size:11px;color:#938F8C;background:rgba(255,255,255,.04)}
.msg{display:flex;align-items:flex-end;gap:8px;max-width:72%}
.msg p{position:relative;padding:10px 14px;font-size:13px;line-height:1.45}
.msg.ai p{border-radius:14px 14px 14px 4px;color:#fbf6f2;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.07)}
.msg.you{align-self:flex-end}
.msg.you p{border-radius:14px 14px 4px 14px;color:#060b17;background:#3b82f6;box-shadow:inset 0 1px 0 rgba(255,255,255,.18)}
.mk{display:grid;place-items:center;flex:none;width:24px;height:24px;border-radius:50%;color:#3b82f6;background:rgba(59,130,246,.14);box-shadow:inset 0 0 0 1px rgba(59,130,246,.24)}
.dots{display:flex;gap:4px;padding:5px 2px}
.dots i{width:6px;height:6px;border-radius:50%;background:#938F8C}
.booked{align-self:center;display:flex;align-items:center;gap:7px;padding:7px 13px;border-radius:999px;font-size:12px;font-weight:600;color:#fbf7f3;background:rgba(59,130,246,.18);box-shadow:inset 0 0 0 1px rgba(59,130,246,.32)}
.booked svg{color:#3b82f6}
/* s2 pipeline */
.board{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.col{position:relative;display:flex;flex-direction:column;gap:10px;min-height:540px;padding:12px;border-radius:14px;background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01) 70%,transparent);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),inset 0 0 0 1px rgba(255,255,255,.04)}
.col-h{display:flex;align-items:center;justify-content:space-between;padding:2px 4px 6px;font-size:12.5px}
.cnt{min-width:22px;padding:1px 7px;border-radius:999px;font-size:10.5px;font-weight:700;text-align:center;color:#fbf7f3;background:rgba(59,130,246,.14)}
.deal{position:relative;z-index:1;padding:12px 13px;border-radius:12px;background:linear-gradient(180deg,#161a25,#0d121d);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),inset 0 1px 0 rgba(255,255,255,.06),0 10px 22px -14px rgba(0,0,0,.9)}
.deal-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.deal-top b{font-size:12.5px}
.deal small{margin-top:2px;font-size:11.5px}
.deal-v{display:block;margin-top:8px;font-size:12.5px;font-weight:600;color:#3b82f6;font-variant-numeric:tabular-nums}
.deal[data-role="move"]{z-index:3}
/* s3 automations */
.flow{display:grid;grid-template-columns:1fr 300px;gap:12px;height:100%}
.canvas{position:relative;border-radius:14px;background-color:#060b17;background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1px);background-size:18px 18px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06)}
.tabs{position:absolute;left:14px;right:14px;top:12px;display:flex;align-items:center;gap:6px;font-size:11.5px;color:#938F8C}
.tabs span{display:flex;align-items:center;gap:6px;padding:5px 9px;border-radius:8px}
.tabs .on{color:#fbf6f2;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
.tabs em{font-style:normal;font-size:10px;color:#82807F}
.tabs .live{margin-left:auto;color:#fbf7f3}
.tabs .live i{width:7px;height:7px;border-radius:50%;background:#45cf92;box-shadow:0 0 0 3px rgba(69,207,146,.18)}
.area{position:absolute;left:50%;top:60px;width:640px;height:560px;transform:translateX(-50%)}
.wires{position:absolute;inset:0;width:640px;height:560px;overflow:visible}
.wires path{fill:none;stroke:rgba(59,130,246,.32);stroke-width:1.5;vector-effect:non-scaling-stroke}
.wires #pulse{fill:#fbf7f3;filter:drop-shadow(0 0 6px rgba(59,130,246,.9))}
.node{position:absolute;display:flex;align-items:center;gap:11px;width:230px;padding:11px 13px;border-radius:12px;background:linear-gradient(180deg,#161a25,#0d121d);box-shadow:inset 0 0 0 1px rgba(255,255,255,.09),inset 0 1px 0 rgba(255,255,255,.06),0 12px 26px -16px rgba(0,0,0,.9)}
.node b{display:block;font-size:12.5px}.node small{font-size:11px}
.node-ic{display:grid;place-items:center;flex:none;width:30px;height:30px;border-radius:9px;color:#3b82f6;background:rgba(59,130,246,.12);box-shadow:inset 0 0 0 1px rgba(59,130,246,.2)}
.badge{position:absolute;right:10px;top:-11px;display:flex;align-items:center;gap:5px;height:21px;padding:0 8px;border-radius:999px;font-size:10.5px;font-weight:600;opacity:0}
.badge.done{color:#8ee2bd;background:#12261f;box-shadow:inset 0 0 0 1px rgba(69,207,146,.35)}
.badge.run{color:#fbf7f3;background:#0f1e3b;box-shadow:inset 0 0 0 1px rgba(59,130,246,.4)}
.badge.skip{color:#82807F;background:#0c111d;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}
.runs{padding:16px}
.runs ul{list-style:none;display:grid;gap:2px;margin-top:10px}
.runs li{display:flex;align-items:center;gap:10px;padding:9px 8px;border-radius:9px;font-size:12px}
.runs li:first-child{background:rgba(59,130,246,.08)}
.runs li small{margin-left:auto;font-size:11px}
.run-ic{display:grid;color:#45cf92}.run-ic.spin{color:#3b82f6}
.card-h.mt{margin-top:22px}
.tiles{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
.tiles div{padding:11px 12px;border-radius:11px;background:rgba(255,255,255,.03);box-shadow:inset 0 0 0 1px rgba(255,255,255,.06)}
.tiles b{display:block;font-family:Geist,Inter,sans-serif;font-size:18px}
.tiles small{font-size:10.5px}
/* s4 website */
.site{display:grid;grid-template-columns:1fr 1fr;gap:12px;height:100%}
.browser{overflow:hidden;display:flex;flex-direction:column}
.br-bar{display:flex;align-items:center;gap:12px;padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.02)}
.br-dots{display:flex;gap:5px}.br-dots i{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.16)}
.br-url{display:flex;align-items:center;gap:6px;padding:4px 10px;border-radius:7px;font-size:11px;color:#938F8C;background:rgba(0,0,0,.22)}
.br-url em{font-style:normal;color:#82807F}
.br-page{flex:1;padding:28px 30px;background:radial-gradient(420px 220px at 80% 0%,rgba(59,130,246,.16),transparent 70%)}
.br-kicker{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:600;color:#fbf7f3}
.br-kicker svg{color:#3b82f6}
.br-page h2{margin-top:14px;max-width:340px;font-family:Geist,Inter,sans-serif;font-size:26px;font-weight:600;line-height:1.15;letter-spacing:-.025em}
.form{display:grid;gap:12px;margin-top:22px;max-width:380px}
.form label{display:grid;gap:5px;font-size:11px;font-weight:500;color:#938F8C}
.field{display:flex;align-items:center;height:36px;padding:0 11px;border-radius:9px;font-size:12.5px;color:#fbf6f2;background:rgba(0,0,0,.25);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}
.field.tall{height:56px;align-items:flex-start;padding-top:10px}
.field.focus{box-shadow:inset 0 0 0 1px rgba(59,130,246,.7),0 0 0 3px rgba(59,130,246,.18)}
.caret{display:inline-block;width:1.5px;height:15px;margin-left:1px;background:#3b82f6}
.submit{justify-self:start;display:inline-flex;align-items:center;height:38px;padding:0 18px;border-radius:999px;font-size:12.5px;font-weight:600;color:#060b17;background:linear-gradient(180deg,#5692f6,#3b82f6);box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 8px 20px -8px rgba(59,130,246,.7)}
.thanks{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:600;color:#fbf7f3;opacity:0}
.thanks svg{color:#3b82f6}
.subs{padding:16px 16px 10px;overflow:hidden}
.subs-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.subs ul{position:relative;list-style:none}
.subs li{display:flex;align-items:center;gap:10px;height:62px;padding:0 10px;border-bottom:1px solid rgba(255,255,255,.05)}
.subs li.new{position:absolute;left:0;right:0;top:0;border-radius:11px;background:rgba(59,130,246,.08);box-shadow:inset 0 0 0 1px rgba(59,130,246,.2)}
.sub-x{flex:1;min-width:0}.sub-x b{display:block;font-size:12.5px}.sub-x small{font-size:11.5px}
.sub-t{width:62px;text-align:right;font-size:11px;color:#82807F}
/* s5 reports */
.report{display:grid;grid-template-columns:1.35fr 1fr;gap:12px}
.chart2{position:relative;padding:16px 18px;height:560px}
.tip{position:absolute;left:0;top:0;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:#fbf7f3;box-shadow:0 0 0 4px rgba(59,130,246,.2),0 0 12px rgba(59,130,246,.8)}
.ch-h{display:flex;align-items:flex-start;justify-content:space-between}
.big{display:flex;align-items:baseline;gap:10px}
.big b{font-family:Geist,Inter,sans-serif;font-size:26px;letter-spacing:-.02em}
.up{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600;color:#3b82f6}
.line{display:block;width:${CHART[0]}px;height:${CHART[1]}px;margin-top:40px;overflow:visible}
.line .grid path{stroke:rgba(255,255,255,.05);stroke-width:1}
#ln{stroke:#3b82f6;stroke-width:2.5;stroke-linecap:round}
.side2{display:grid;gap:12px;align-content:start}
.ranks,.changes{padding:16px 18px}
.ranks ul,.changes ul{list-style:none;margin-top:8px}
.ranks li{display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.q{flex:1;font-size:12.5px;color:#e9e4dd}
.pos b{font-family:Geist,Inter,sans-serif;font-size:17px}
.chg{display:inline-flex;align-items:center;gap:3px;width:44px;justify-content:center;padding:2px 0;border-radius:999px;font-size:10.5px;font-weight:700;color:#fbf7f3;background:rgba(59,130,246,.14);opacity:0}
.changes li{display:flex;align-items:center;gap:9px;padding:9px 0;font-size:12.5px;color:#e9e4dd;opacity:0}
.changes li svg{color:#3b82f6}
</style></head><body>
<div class="app">
  <aside class="side">
    <div class="brand">${BRAND}Bgentic</div>
    <div class="ws"><span class="ws-av">BP</span><span><b>Brightwater Plumbing</b><small>Workspace</small></span>${icon("ChevronsUpDown", 14)}</div>
    <div class="search">${icon("Search", 13)}Search<kbd>Ctrl K</kbd></div>
    <nav class="nav"><span class="nav-hl" id="hl"></span>${NAV.map(([ic, l, n]) => `<span class="nav-i">${icon(ic, 15)}${l}${n ? `<em>${n}</em>` : ""}</span>`).join("")}</nav>
    <div class="side-foot">${icon("Sparkles", 14)}Ask Bgentic AI</div>
  </aside>
  <main class="main">
    <header class="top">
      <div class="crumbs">${SCENES.map((s, i) => `<span class="crumb" id="cr${i}">${icon(s.icon, 15)}${s.crumb}${s.sub ? `<em>${s.sub}</em>` : ""}</span>`).join("")}</div>
      <div class="top-r"><span class="chip">${icon("CalendarDays", 13)} Tue 14 Oct</span><span class="ask">${icon("Sparkles", 13)} Ask AI</span><span class="me">BA</span></div>
    </header>
    <section class="stage">${s0}${s1}${s2}${s3}${s4}${s5}</section>
  </main>
</div>
<script>
const SCENES = ${JSON.stringify(SCENES.map((s) => ({ nav: s.nav, dur: s.dur })))}
const TOTAL = ${TOTAL}
const X = 0.7 // the hand-over between screens, at the end of each
const $ = (id) => document.getElementById(id)
const clamp = (x) => Math.max(0, Math.min(1, x))
const seg = (t, a, b) => clamp((t - a) / (b - a))
const out = (x) => 1 - Math.pow(1 - x, 4) // the strong ease-out
const inout = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const lerp = (a, b, k) => a + (b - a) * k
const fmt = (v, pre) => pre + Math.round(v).toLocaleString("en-AU")
const show = (el, k, dy = 8) => { el.style.opacity = k; el.style.transform = "translateY(" + (1 - k) * dy + "px)" }
const count = (el, k) => { const to = +el.dataset.to, from = +(el.dataset.from || 0); el.textContent = fmt(lerp(from, to, k), el.dataset.pre || "") }

// layout measured once: nav rows, board slots, path lengths
const navY = [...document.querySelectorAll(".nav-i")].map((n) => n.offsetTop)
const NODE = { n0: [205, 30], n1: [205, 162], n2: [205, 296], n3: [45, 436], n4: [365, 436] }
for (const [id, [x, y]] of Object.entries(NODE)) { $(id).style.left = x + "px"; $(id).style.top = y + "px" }
const wires = ["w0", "w1", "w2"].map((id) => $(id))
const ln = $("ln"), LN = ln.getTotalLength()
ln.style.strokeDasharray = LN
const mover = document.querySelector('[data-role="move"]'), riser = document.querySelector('[data-role="rise"]')
const target = $("c2").querySelector(".deal:last-of-type")
const moveDx = $("c2").getBoundingClientRect().left - $("c0").getBoundingClientRect().left
const moveDy = target.getBoundingClientRect().bottom + 10 - mover.getBoundingClientRect().top
const riseDy = mover.getBoundingClientRect().top - riser.getBoundingClientRect().top
const typed = (el, k) => { const s = el.dataset.text; const n = Math.round(s.length * k); el.innerHTML = s.slice(0, n) + (k > 0 && k < 1 ? '<span class="caret"></span>' : "") }
const dots = (el, t) => el.querySelectorAll(".dots i").forEach((d, i) => { d.style.opacity = 0.35 + 0.65 * Math.max(0, Math.sin((t * 6 - i * 0.9) % (Math.PI * 2))) })
// a reply: the bubble arrives with the typing dots, then grows into its words
const bubble = (id, t, typeA, textA) => {
  const m = $(id), d = m.querySelector(".dots"), x = m.querySelector(".txt")
  show(m, out(seg(t, typeA, typeA + 0.3)), 10)
  const typing = d && t < textA
  if (d) { d.style.display = typing ? "flex" : "none"; dots(m, t) }
  x.style.display = typing ? "none" : "inline"
  x.style.opacity = d ? out(seg(t, textA, textA + 0.3)) : 1
}

// each screen at its own time t (seconds since it settled)
const SCENE = [
  (t) => {
    document.querySelectorAll("#s0 .kpi b").forEach((b, i) => count(b, out(seg(t, 0.15 + i * 0.08, 1.4 + i * 0.08))))
    for (let i = 0; i < 8; i++) $("b" + i).style.transform = "scaleY(" + out(seg(t, 0.2 + i * 0.07, 1.1 + i * 0.07)) + ")"
    for (let i = 0; i < 5; i++) show($("f" + i), out(seg(t, 0.6 + i * 0.28, 1.1 + i * 0.28)))
  },
  (t) => {
    show($("m0"), out(seg(t, 0.1, 0.4)), 6)
    bubble("m1", t, 0.5, 1.4)
    bubble("m2", t, 2.2, 2.2)
    bubble("m3", t, 3.0, 3.9)
    bubble("m4", t, 4.6, 4.6)
    const b = out(seg(t, 5.2, 5.6)); $("m5").style.opacity = b; $("m5").style.transform = "scale(" + lerp(0.94, 1, b) + ")"
  },
  (t) => {
    const lift = out(seg(t, 0.7, 1.0)), go = inout(seg(t, 1.0, 2.0)), drop = out(seg(t, 2.0, 2.3))
    const s = 1 + 0.04 * lift - 0.04 * drop
    mover.style.transform = "translate(" + moveDx * go + "px," + moveDy * go + "px) scale(" + s + ") rotate(" + (lift - drop) * 1.5 + "deg)"
    mover.style.boxShadow = lift - drop > 0 ? "inset 0 0 0 1px rgba(59,130,246,.5), 0 24px 40px -16px rgba(0,0,0,.9), 0 16px 40px -20px rgba(59,130,246,.6)" : drop > 0.5 ? "inset 0 0 0 1px rgba(59,130,246,.4), 0 10px 22px -14px rgba(0,0,0,.9)" : ""
    riser.style.transform = "translateY(" + riseDy * inout(seg(t, 1.3, 2.0)) + "px)"
    $("cnt0").textContent = t >= 2.0 ? 1 : 2
    $("cnt2").textContent = t >= 2.0 ? 3 : 2
  },
  (t) => {
    const legs = [[0.4, 1.0], [1.4, 2.0], [2.4, 3.0]]
    let p = null
    legs.forEach(([a, b], i) => { if (t >= a && t <= b) { const w = wires[i]; p = w.getPointAtLength(w.getTotalLength() * inout(seg(t, a, b))) } })
    const pulse = $("pulse"); pulse.style.opacity = p ? 1 : 0; if (p) { pulse.setAttribute("cx", p.x); pulse.setAttribute("cy", p.y) }
    const badge = (id, at, cls, html) => { const b = $(id + "-b"); b.className = "badge " + cls; b.innerHTML = html; const k = out(seg(t, at, at + 0.3)); b.style.opacity = k; b.style.transform = "translateY(" + (1 - k) * 4 + "px)" }
    badge("n0", 0.3, "done", "${icon("Check", 11, 2.5).replace(/"/g, '\\"')} Completed")
    badge("n1", 1.3, "done", "${icon("Check", 11, 2.5).replace(/"/g, '\\"')} Completed")
    badge("n2", 2.3, "done", "Yes")
    badge("n3", 3.0, "run", "${icon("LoaderCircle", 11, 2.5).replace(/"/g, '\\"')} Scheduled")
    badge("n4", 3.0, "skip", "Skipped")
    $("n4").style.opacity = lerp(1, 0.45, out(seg(t, 3.0, 3.4)))
    document.querySelector("#s3 .run-ic.spin svg").style.transform = "rotate(" + t * 300 + "deg)"
    count($("rt0"), out(seg(t, 0.2, 1.4)))
  },
  (t) => {
    const f = [[0.3, 1.0], [1.2, 1.9], [2.1, 3.0]]
    f.forEach(([a, b], i) => { const el = $("i" + i); typed(el, seg(t, a, b)); el.classList.toggle("focus", t >= a - 0.1 && t < b + 0.15) })
    const press = seg(t, 3.25, 3.45), rel = seg(t, 3.45, 3.65)
    $("go").style.transform = "scale(" + (1 - 0.04 * press + 0.04 * rel) + ")"
    show($("thanks"), out(seg(t, 3.6, 3.9)), 4)
    const ins = out(seg(t, 3.9, 4.4))
    const nw = $("new"); nw.style.opacity = ins; nw.style.transform = "translateY(" + (1 - ins) * -12 + "px)"
    document.querySelectorAll("#sublist li:not(.new)").forEach((li) => (li.style.transform = "translateY(" + 62 * inout(seg(t, 3.8, 4.3)) + "px)"))
    show($("added"), out(seg(t, 4.6, 4.9)), 0)
    $("wk").textContent = t >= 4.2 ? 24 : 23
  },
  (t) => {
    const k = out(seg(t, 0.3, 2.0))
    ln.style.strokeDashoffset = LN * (1 - k)
    $("area").style.opacity = out(seg(t, 1.0, 2.0))
    // the leading point, in the card's own pixels (the chart is stretched, so a circle inside it wouldn't stay round)
    const pt = ln.getPointAtLength(LN * k), m = ln.getScreenCTM(), box = $("tip").parentElement.getBoundingClientRect()
    const sp = new DOMPoint(pt.x, pt.y).matrixTransform(m)
    $("tip").style.transform = "translate(" + (sp.x - box.left) + "px," + (sp.y - box.top) + "px)"
    $("tip").style.opacity = k > 0.01 ? 1 : 0
    count($("vis"), k)
    for (let i = 0; i < 3; i++) { count($("p" + i), out(seg(t, 1.4 + i * 0.25, 2.4 + i * 0.25))); show($("c" + i + "x"), out(seg(t, 2.2 + i * 0.25, 2.5 + i * 0.25)), 0) }
    for (let i = 0; i < 3; i++) show($("h" + i), out(seg(t, 2.8 + i * 0.3, 3.2 + i * 0.3)), 6)
  },
]

const starts = SCENES.map((_, i) => SCENES.slice(0, i).reduce((s, x) => s + x.dur, 0))
window.seek = (time) => {
  const t = ((time % TOTAL) + TOTAL) % TOTAL
  let i = starts.findLastIndex((s) => t >= s)
  const local = t - starts[i]
  const next = (i + 1) % SCENES.length
  const k = inout(seg(local, SCENES[i].dur - X, SCENES[i].dur))
  SCENES.forEach((_, j) => {
    const el = $("s" + j), cr = $("cr" + j)
    let o = 0, y = 0, blur = 0
    if (j === i) { o = 1 - k; y = -12 * k; blur = 6 * k }
    else if (j === next && k > 0) { o = k; y = 14 * (1 - k); blur = 6 * (1 - k) }
    el.style.opacity = o; el.style.transform = "translateY(" + y + "px)"; el.style.filter = blur > 0.05 ? "blur(" + blur + "px)" : "none"
    cr.style.opacity = o; cr.style.transform = "translateY(" + y * 0.4 + "px)"
  })
  SCENE[next](0) // the incoming screen waits at its first frame
  SCENE[i](local)
  $("hl").style.transform = "translateY(" + lerp(navY[SCENES[i].nav], navY[SCENES[next].nav], k) + "px)"
}
window.TOTAL = TOTAL
seek(0)
</script>
<script type="module">
import * as M from "./mediabunny.mjs"
window.encoder = {
  async start(w, h, fps, bitrate) {
    this.fps = fps
    this.canvas = new OffscreenCanvas(w, h)
    this.ctx = this.canvas.getContext("2d")
    this.output = new M.Output({ format: new M.Mp4OutputFormat({ fastStart: "in-memory" }), target: new M.BufferTarget() })
    this.source = new M.CanvasSource(this.canvas, { codec: "avc", bitrate, keyFrameInterval: 2 })
    this.output.addVideoTrack(this.source, { frameRate: fps })
    await this.output.start()
  },
  async add(b64, i) {
    const bmp = await createImageBitmap(await (await fetch("data:image/jpeg;base64," + b64)).blob())
    this.ctx.drawImage(bmp, 0, 0)
    bmp.close()
    await this.source.add(i / this.fps, 1 / this.fps)
  },
  async finish() {
    await this.output.finalize()
    const bytes = new Uint8Array(this.output.target.buffer)
    let s = ""
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000))
    return btoa(s)
  },
}
window.encoderReady = true
</script>
</body></html>`

/* ---------------------------------------------------------------- render */

;(async () => {
  const browser = await chromium.launch({ executablePath: EDGE })
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE })
  const page = await ctx.newPage()
  const errors = []
  page.on("pageerror", (e) => errors.push(String(e)))
  // a made-up https origin, so the page is a secure context (WebCodecs) without a server
  await page.route("https://film.local/**", (route) => {
    const url = route.request().url()
    if (url.endsWith("/mediabunny.mjs"))
      return route.fulfill({ contentType: "text/javascript", body: fs.readFileSync(path.join(ROOT, "node_modules/mediabunny/dist/bundles/mediabunny.min.mjs")) })
    return route.fulfill({ contentType: "text/html", body: HTML })
  })
  await page.goto("https://film.local/", { waitUntil: "networkidle" })
  await page.evaluate(() => document.fonts.ready)
  const fontsOk = await page.evaluate(() => document.fonts.check("600 14px Inter") && document.fonts.check("600 16px Geist"))
  if (!fontsOk) throw new Error("fonts did not load")
  await page.waitForFunction(() => window.encoderReady === true)
  const total = await page.evaluate(() => window.TOTAL)

  if (STILLS) {
    const dir = path.join(HERE, ".film-stills")
    fs.mkdirSync(dir, { recursive: true })
    for (const t of [0, 2.5, 4.65, 7, 9.5, 11.8, 14.5, 17.5, 20.5, 23.5, 26.3, 28.5, 31.5, total - 0.3]) {
      await page.evaluate((x) => window.seek(x), t)
      await page.screenshot({ path: path.join(dir, `t${String(t.toFixed(2)).padStart(6, "0")}.png`) })
    }
    console.log("stills in", dir, "errors", JSON.stringify(errors))
    await browser.close()
    return
  }

  await page.evaluate(([w, h, fps, br]) => window.encoder.start(w, h, fps, br), [W * SCALE, H * SCALE, FPS, BITRATE])
  const frames = Math.round(total * FPS)
  const t0 = Date.now()
  for (let i = 0; i < frames; i++) {
    await page.evaluate((x) => window.seek(x), i / FPS)
    const jpg = await page.screenshot({ type: "jpeg", quality: 92 })
    await page.evaluate(([b64, n]) => window.encoder.add(b64, n), [jpg.toString("base64"), i])
    if (i % 150 === 0) console.log(`frame ${i}/${frames} · ${Math.round((Date.now() - t0) / 1000)}s`)
  }
  const mp4 = Buffer.from(await page.evaluate(() => window.encoder.finish()), "base64")
  const outDir = path.join(ROOT, "public/video")
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, "see-it-working.mp4"), mp4)
  // the poster: the overview, settled
  await page.evaluate(() => window.seek(3.2))
  await page.screenshot({ path: path.join(outDir, "see-it-working-poster.jpg"), type: "jpeg", quality: 88 })
  console.log(`done: ${frames} frames, ${(mp4.length / 1e6).toFixed(2)} MB, ${Math.round((Date.now() - t0) / 1000)}s`, "errors", JSON.stringify(errors))
  await browser.close()
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
