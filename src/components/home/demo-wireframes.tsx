// Grey-box wireframes for the "See it working" viewer, one per service, standing in until each service's real demo is
// built. Built from a few primitives (lines, blocks, one accent per scene for where the eye should go) with real words
// only where a label explains the layout. Decorative: the viewer's caption carries the meaning. Styles: the wireframes
// section of styles/depth.css.
import * as React from "react"
import type { ServiceSlug } from "@/content/services"

const Line = ({ w, strong }: { w: string; strong?: boolean }) => (
  <span className={strong ? "wf-line wf-line-strong" : "wf-line"} style={{ width: w }} />
)
const Block = ({ className = "", accent, children }: { className?: string; accent?: boolean; children?: React.ReactNode }) => (
  <div className={`wf-block ${accent ? "wf-accent" : ""} ${className}`}>{children}</div>
)
const Label = ({ children }: { children: React.ReactNode }) => <span className="wf-label">{children}</span>

/** AI consultancy: the four-question quiz, and where we'd start */
function Consultancy() {
  return (
    <div className="wf-split">
      <Block className="wf-pad wf-stack">
        <div className="wf-progress">
          <i data-on />
          <i data-on />
          <i />
          <i />
        </div>
        <Label>Question 2 of 4</Label>
        <p className="wf-q">How do most enquiries reach you?</p>
        <div className="wf-options">
          {["Phone calls", "Website form", "Email", "Social DMs"].map((o, i) => (
            <Block key={o} accent={i === 0} className="wf-option">
              <span className="wf-dot" />
              <span className="wf-option-text">{o}</span>
            </Block>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <Line w="30%" />
          <Block accent className="wf-button" />
        </div>
      </Block>
      <Block className="wf-pad wf-stack wf-side">
        <Label>Where we&apos;d start</Label>
        {[0, 1, 2].map((i) => (
          <Block key={i} accent={i === 0} className="wf-pad-sm wf-stack-sm">
            <Line w="70%" strong />
            <Line w="90%" />
            <Line w="55%" />
          </Block>
        ))}
      </Block>
    </div>
  )
}

/** Automations: the lead flow, branch by branch */
function Automations() {
  const node = (x: number, y: number, w: number, label: string, on?: boolean) => (
    <g key={label}>
      <rect x={x} y={y} width={w} height={44} rx={12} className={on ? "wf-node wf-node-on" : "wf-node"} />
      <text x={x + w / 2} y={y + 27} className="wf-node-text" textAnchor="middle">
        {label}
      </text>
    </g>
  )
  return (
    <div className="wf-pad wf-stack h-full">
      <div className="flex items-center gap-2">
        <span className="wf-toggle" data-on>
          Leads
        </span>
        <span className="wf-toggle">Orders</span>
      </div>
      <svg className="wf-flow" viewBox="0 0 860 300" preserveAspectRatio="xMidYMid meet">
        <path className="wf-edge wf-edge-on" d="M150 70 H210" />
        <path className="wf-edge wf-edge-on" d="M370 70 H430" />
        <path className="wf-edge wf-edge-on" d="M530 70 H590" />
        <path className="wf-edge wf-edge-on" d="M480 115 V170 H520" />
        <path className="wf-edge" d="M480 115 V250 H520" />
        <path className="wf-edge wf-edge-on" d="M690 170 H730" />
        {node(10, 48, 140, "Call or form", true)}
        {node(210, 48, 160, "AI receptionist", true)}
        <g>
          <path d="M480 25 L530 70 L480 115 L430 70 Z" className="wf-node wf-node-on" />
          <text x={480} y={75} className="wf-node-text" textAnchor="middle">
            Booked?
          </text>
        </g>
        {node(590, 48, 150, "Reminders", true)}
        {node(520, 148, 170, "Showed up", true)}
        {node(730, 148, 120, "Paid + review", true)}
        {node(520, 228, 210, "No-show recovery")}
      </svg>
    </div>
  )
}

/** CRM: the inbox rail, today's numbers and the pipeline */
function Crm() {
  return (
    <div className="wf-app">
      <div className="wf-rail wf-side">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={i === 2 ? "wf-rail-item wf-rail-on" : "wf-rail-item"}>
            <span className="wf-dot" />
            <Line w={i === 2 ? "60%" : "50%"} strong={i === 2} />
          </div>
        ))}
      </div>
      <div className="wf-pad wf-stack min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <Line w="28%" strong />
          <Line w="16%" />
        </div>
        <div className="wf-stats">
          {[0, 1, 2, 3].map((i) => (
            <Block key={i} className="wf-pad-sm wf-stack-sm">
              <Line w="55%" />
              <Line w="35%" strong />
            </Block>
          ))}
        </div>
        <div className="wf-kanban">
          {[3, 2, 1, 2].map((n, c) => (
            <div key={c} className="wf-stack-sm">
              <Line w="50%" strong />
              {Array.from({ length: n }, (_, i) => (
                <Block key={i} accent={c === 2} className="wf-pad-sm wf-stack-sm">
                  <Line w="80%" strong />
                  <Line w="55%" />
                </Block>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Websites: a client site, and an enquiry from its form landing in the CRM */
function Websites() {
  return (
    <div className="wf-pad h-full">
      <Block className="wf-browser">
        <div className="wf-browser-bar">
          <span className="wf-dot" />
          <Line w="34%" />
        </div>
        <div className="wf-pad wf-stack">
          <div className="flex items-center justify-between">
            <Line w="14%" strong />
            <div className="flex w-1/3 justify-between gap-3">
              <Line w="20%" />
              <Line w="20%" />
              <Line w="20%" />
            </div>
          </div>
          <div className="wf-hero">
            <div className="wf-stack">
              <Line w="85%" strong />
              <Line w="65%" strong />
              <Line w="90%" />
              <Line w="70%" />
              <Block accent className="wf-button mt-2" />
            </div>
            <Block className="wf-image wf-side" />
          </div>
          <div className="wf-cards">
            {[0, 1, 2].map((i) => (
              <Block key={i} className="wf-pad-sm wf-stack-sm">
                <Line w="45%" strong />
                <Line w="85%" />
              </Block>
            ))}
          </div>
        </div>
      </Block>
      <Block accent className="wf-toast">
        <Label>New enquiry</Label>
        <span className="wf-toast-text">Added to your pipeline</span>
      </Block>
    </div>
  )
}

/** Ecommerce: a trade customer's usual order, and the summary */
function Ecommerce() {
  return (
    <div className="wf-split">
      <Block className="wf-pad wf-stack">
        <Label>Your usual order</Label>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="wf-product">
            <Block className="wf-thumb" />
            <div className="wf-stack-sm min-w-0 flex-1">
              <Line w="60%" strong />
              <Line w="35%" />
            </div>
            <div className="wf-stepper">
              <span>−</span>
              <b>{[4, 2, 6, 1][i]}</b>
              <span>+</span>
            </div>
          </div>
        ))}
      </Block>
      <Block className="wf-pad wf-stack wf-side">
        <Label>Order summary</Label>
        <Line w="80%" />
        <Line w="65%" />
        <Line w="75%" />
        <div className="wf-rule" />
        <div className="flex justify-between">
          <Line w="30%" strong />
          <Line w="22%" strong />
        </div>
        <Block accent className="wf-button wf-button-wide mt-auto" />
      </Block>
    </div>
  )
}

/** SEO marketing: the morning report on your phone, and the trend behind it */
function Seo() {
  return (
    <div className="wf-split wf-split-even">
      <Block className="wf-pad wf-stack">
        <Label>Daily report · 6:00 am</Label>
        {["80%", "65%", "72%"].map((w, i) => (
          <div key={i} className={i === 1 ? "wf-bubble wf-bubble-them" : "wf-bubble"}>
            <Line w={w} strong={i !== 1} />
            <Line w="90%" />
            {i === 0 && <Line w="50%" />}
          </div>
        ))}
      </Block>
      <Block className="wf-pad wf-stack wf-side">
        <Label>Search visibility</Label>
        <svg className="wf-chart" viewBox="0 0 300 120" preserveAspectRatio="none">
          <path className="wf-chart-fill" d="M0 100 C40 96 60 92 90 84 S150 70 180 58 S240 36 300 24 V120 H0 Z" />
          <path className="wf-chart-line" d="M0 100 C40 96 60 92 90 84 S150 70 180 58 S240 36 300 24" />
        </svg>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <Line w="55%" />
            <Line w="14%" strong />
          </div>
        ))}
      </Block>
    </div>
  )
}

export function DemoWireframe({ slug }: { slug: ServiceSlug }) {
  switch (slug) {
    case "ai-consultancy":
      return <Consultancy />
    case "automations":
      return <Automations />
    case "crm":
      return <Crm />
    case "websites":
      return <Websites />
    case "ecommerce":
      return <Ecommerce />
    case "seo-marketing":
      return <Seo />
  }
}
