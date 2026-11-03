// The example workspace in "Every tool you juggle" (components/crm): Bgentic's own CRM, every tab clickable, with
// made-up leads and clients. The window's bar labels it Example. Plan prices on invoices are the real ones; phone
// numbers are from the range ACMA sets aside for fiction (0491 570 xxx). No ratings or review text: the site shows
// none.

export type Tone = "blue" | "green" | "amber" | "red" | "violet" | "grey"

export const crmDemo = {
  workspace: { name: "Bgentic.", place: "CARLINGFORD, NSW", me: "BA" },

  launchpad: {
    steps: [
      { text: "Connect your business phone number", done: true },
      { text: "Connect your Google Business Profile", done: true },
      { text: "Import your contacts", done: true },
      { text: "Connect Xero", done: true },
      { text: "Set up your booking calendar", done: false, now: true },
      { text: "Install the mobile app", done: false },
    ],
    training: { title: "Your training session", when: "Thu 10:00 am", with: "Christian" },
  },

  dashboard: {
    stats: [
      { label: "Open opportunities", value: "6", note: "Across 4 stages" },
      { label: "Pipeline value", value: "AU$26,900", note: "Marketing pipeline" },
      { label: "Calls answered", value: "48", note: "This week, 9 after hours" },
      { label: "Bookings", value: "9", note: "This week" },
    ],
    tasks: [
      { text: "Send the proposal to Coastal Brew Supply", due: "Today", done: false },
      { text: "Prepare Thursday's training session", due: "Wed", done: false },
      { text: "Call Tom Brennan about the invoice", due: "Today", done: true },
      { text: "Review the new website lead from Ava Chen", due: "Mon", done: true },
    ],
    activity: [
      { who: "HB", text: "Hannah Bright's missed call was texted back by the AI receptionist", when: "2 min ago" },
      { who: "ER", text: "Elena Rossi paid INV-1043, AU$3,500.00", when: "1 h ago" },
      { who: "MN", text: "Marcus Ng booked a discovery call for Monday 9:00 am", when: "3 h ago" },
      { who: "PN", text: "Coastal Brew Supply moved to Qualified", when: "Yesterday" },
    ],
  },

  threads: [
    { initials: "HB", name: "Hannah Bright", channel: "SMS", last: "Yes please. Can someone come Thursday?", when: "2m", unread: true },
    { initials: "ER", name: "Elena Rossi", channel: "Email", last: "Signed proposal attached", when: "1h" },
    { initials: "JO", name: "James Olano", channel: "Messenger", last: "Thanks for the demo today", when: "3h" },
    { initials: "PN", name: "Priya Naidu", channel: "SMS", last: "Works for us, see you Saturday", when: "Yesterday" },
    { initials: "MN", name: "Marcus Ng", channel: "Call", last: "Missed call, texted back", when: "Yesterday" },
    { initials: "TB", name: "Tom Brennan", channel: "Email", last: "Quick question on the invoice", when: "Mon" },
  ],
  thread: {
    name: "Hannah Bright",
    detail: "Brightwater Plumbing · 0491 570 110",
    messages: [
      { kind: "system", text: "Missed call · 6:42 pm" },
      { kind: "ai", text: "Hi Hannah, it's Bgentic. Sorry we missed your call. How can we help?" },
      { kind: "in", text: "We keep missing calls while we're out on jobs. Can you help with that?" },
      { kind: "ai", text: "We can. Our AI receptionist answers every call and texts back the ones you miss. Want to book a 20-minute discovery call?" },
      { kind: "in", text: "Yes please. Can someone come Thursday?" },
      { kind: "ai", text: "Done: Thursday at 10:00 am. You'll get a reminder the day before." },
      { kind: "system", text: "Booked · Discovery call, Thu 10:00 am" },
    ],
  },

  calendar: {
    week: "12 – 18 October",
    days: [
      { name: "Mon", date: 12 },
      { name: "Tue", date: 13, today: true },
      { name: "Wed", date: 14 },
      { name: "Thu", date: 15 },
      { name: "Fri", date: 16 },
      { name: "Sat", date: 17 },
      { name: "Sun", date: 18 },
    ],
    /** day index, start and end in hours, colour */
    events: [
      { day: 0, start: 9, end: 9.75, title: "Discovery call", who: "Marcus Ng", tone: "blue" },
      { day: 0, start: 11.5, end: 12.5, title: "Onboarding", who: "Summit Fitouts", tone: "green" },
      { day: 1, start: 10, end: 11, title: "Training", who: "Brightwater Plumbing", tone: "grey" },
      { day: 1, start: 14, end: 15, title: "Demo", who: "Harbour Dental", tone: "violet" },
      { day: 2, start: 10, end: 11.5, title: "Site visit", who: "Coastal Brew", tone: "amber" },
      { day: 3, start: 10, end: 10.5, title: "Discovery call", who: "Hannah Bright", tone: "blue" },
      { day: 3, start: 15.5, end: 16.25, title: "Follow up", who: "Northgate Legal", tone: "grey" },
      { day: 4, start: 13, end: 14, title: "Proposal review", who: "Evergreen", tone: "violet" },
      { day: 5, start: 9, end: 10, title: "Kickoff", who: "Coastal Brew", tone: "green" },
    ] as { day: number; start: number; end: number; title: string; who: string; tone: Tone }[],
    now: 12.6,
  },

  contacts: [
    { initials: "HB", name: "Hannah Bright", company: "Brightwater Plumbing", phone: "0491 570 110", tags: ["Lead", "Website"], last: "Missed call, texted back", when: "2 min ago" },
    { initials: "MN", name: "Marcus Ng", company: "Northgate Legal", phone: "0491 570 111", tags: ["Lead"], last: "Booked a discovery call", when: "3 h ago" },
    { initials: "ER", name: "Elena Rossi", company: "Summit Fitouts", phone: "0491 570 112", tags: ["Client", "Retainer"], last: "Paid INV-1043", when: "Today" },
    { initials: "JO", name: "James Olano", company: "Harbour Dental Group", phone: "0491 570 113", tags: ["Client"], last: "Opened the proposal", when: "Yesterday" },
    { initials: "PN", name: "Priya Naidu", company: "Coastal Brew Supply", phone: "0491 570 114", tags: ["Qualified"], last: "Replied by SMS", when: "Yesterday" },
    { initials: "TB", name: "Tom Brennan", company: "Evergreen Landscapes", phone: "0491 570 115", tags: ["Proposal"], last: "Viewed the invoice", when: "Mon" },
    { initials: "AC", name: "Ava Chen", company: "Surry Hills Physio", phone: "0491 570 116", tags: ["Lead", "Referral"], last: "Submitted the quote form", when: "Mon" },
    { initials: "SP", name: "Sam Patel", company: "Ryde Electrical", phone: "0491 570 117", tags: ["Client"], last: "Review request sent", when: "12 Oct" },
  ],

  lanes: [
    {
      stage: "New Lead",
      total: "AU$0.00",
      deals: [
        { title: "Brightwater Plumbing - Service Plan", biz: "Brightwater Plumbing", value: "AU$0.00", who: "Hannah Bright", ini: "HB", n: 1 },
        { title: "Northgate Legal - CRM Setup", biz: "Northgate Legal", value: "AU$0.00", who: "Marcus Ng", ini: "MN", n: 1 },
      ],
    },
    {
      stage: "Contacted",
      total: "AU$6,500.00",
      deals: [
        { title: "Summit Fitouts - $3,500 | MRR Retainer", biz: "Summit Fitouts", value: "AU$3,500.00", who: "Elena Rossi", ini: "ER", n: 2 },
        { title: "Harbour Dental - $3,000 | MRR Retainer", biz: "Harbour Dental Group", value: "AU$3,000.00", who: "James Olano", ini: "JO", n: 3 },
      ],
    },
    {
      stage: "Qualified",
      total: "AU$12,000.00",
      deals: [{ title: "Coastal Brew - Trade Portal", biz: "Coastal Brew Supply", value: "AU$12,000.00", who: "Priya Naidu", ini: "PN", n: 1 }],
    },
    {
      stage: "Proposal Sent",
      total: "AU$8,400.00",
      deals: [{ title: "Evergreen - $8,400 | MRR Retainer", biz: "Evergreen Landscapes", value: "AU$8,400.00", who: "Tom Brennan", ini: "TB", n: 2 }],
    },
  ],

  payments: {
    stats: [
      { label: "Collected in October", value: "AU$4,348.00" },
      { label: "Outstanding", value: "AU$3,000.00" },
      { label: "Overdue", value: "AU$199.00" },
      { label: "Drafts", value: "AU$8,400.00" },
    ],
    invoices: [
      { no: "INV-1043", who: "Summit Fitouts", what: "Monthly retainer", amount: "AU$3,500.00", status: "Paid", when: "12 Oct" },
      { no: "INV-1042", who: "Brightwater Plumbing", what: "Standard plan", amount: "AU$349.00", status: "Paid", when: "10 Oct" },
      { no: "INV-1041", who: "Northgate Legal", what: "Premium plan", amount: "AU$499.00", status: "Paid", when: "9 Oct" },
      { no: "INV-1040", who: "Harbour Dental Group", what: "Monthly retainer", amount: "AU$3,000.00", status: "Sent", when: "Due 20 Oct" },
      { no: "INV-1039", who: "Ryde Electrical", what: "Basic plan", amount: "AU$199.00", status: "Overdue", when: "Due 6 Oct" },
      { no: "INV-1038", who: "Evergreen Landscapes", what: "Monthly retainer", amount: "AU$8,400.00", status: "Draft", when: "Not sent" },
    ],
  },

  studio: {
    prompt: "A follow-up sequence for leads who don't book a call within a day",
    result: [
      { when: "Day 1", channel: "SMS", text: "Still keen to chat? Here's a link to pick a time that suits." },
      { when: "Day 3", channel: "Email", text: "Three ways other trades stopped missing calls, and a booking link." },
      { when: "Day 5", channel: "Task", text: "Call them. Notes from the first enquiry are attached." },
      { when: "Day 7", channel: "SMS", text: "Last nudge: reply STOP and we won't follow up again." },
    ],
    ideas: [
      { title: "Follow-up sequence", text: "SMS and email that run on their own" },
      { title: "Booking page", text: "A page that fills your calendar" },
      { title: "Quote template", text: "Your prices, your branding" },
      { title: "FAQ assistant", text: "Answers from your own documents" },
      { title: "Review request", text: "Sent when an invoice is paid" },
      { title: "Newsletter", text: "A month of news, drafted" },
    ],
  },

  agents: [
    { name: "Receptionist", kind: "Voice", on: true, text: "Answers every call, books jobs and texts back the calls you miss.", count: "48 calls this week" },
    { name: "Website chat", kind: "Chat", on: true, text: "Answers questions on bgentic.io and books discovery calls.", count: "31 chats this week" },
    { name: "Lead qualifier", kind: "SMS", on: true, text: "Asks new leads three questions and sorts them by fit.", count: "12 leads this week" },
    { name: "Review replies", kind: "Reviews", on: false, text: "Drafts replies to new Google reviews for you to approve.", count: "Paused" },
  ],
  call: {
    caller: "Marcus Ng · Northgate Legal",
    lines: [
      { who: "Caller", text: "Hi, I'm after someone to look at our phones and our booking system." },
      { who: "Agent", text: "Happy to help. Can I get your name and your business?" },
      { who: "Caller", text: "Marcus, from Northgate Legal." },
      { who: "Agent", text: "Thanks Marcus. I can book you a 20-minute discovery call. Does Monday at 9 work?" },
    ],
    outcome: "Booked · Discovery call, Mon 9:00 am",
  },

  marketing: {
    stats: [
      { label: "Emails sent", value: "1,240", note: "Last 30 days" },
      { label: "SMS sent", value: "318", note: "Last 30 days" },
      { label: "Unsubscribes", value: "3", note: "Last 30 days" },
    ],
    campaigns: [
      { name: "October newsletter", channel: "Email", status: "Sent", sent: "412", opened: "58%", clicked: "9%", when: "6 Oct" },
      { name: "Discovery call reminder", channel: "SMS", status: "Active", sent: "86", opened: "–", clicked: "14%", when: "Ongoing" },
      { name: "Spring service check", channel: "Email", status: "Scheduled", sent: "–", opened: "–", clicked: "–", when: "20 Oct" },
      { name: "Review request follow-up", channel: "SMS", status: "Active", sent: "34", opened: "–", clicked: "21%", when: "Ongoing" },
      { name: "New plans announcement", channel: "Email", status: "Draft", sent: "–", opened: "–", clicked: "–", when: "–" },
    ],
  },

  workflows: [
    { name: "Missed call text back", trigger: "Missed call", on: true, runs: "214", last: "2 min ago" },
    { name: "New lead instant reply", trigger: "Form submitted", on: true, runs: "96", last: "1 h ago" },
    { name: "Discovery call reminders", trigger: "Appointment booked", on: true, runs: "58", last: "3 h ago" },
    { name: "Proposal follow-up", trigger: "Moved to Proposal Sent", on: true, runs: "21", last: "Yesterday" },
    { name: "Invoice reminders", trigger: "Invoice due", on: true, runs: "40", last: "Yesterday" },
    { name: "Review request", trigger: "Invoice paid", on: true, runs: "33", last: "Mon" },
    { name: "No-show recovery", trigger: "Appointment missed", on: false, runs: "–", last: "Draft" },
  ],

  sites: [
    { name: "bgentic.io", kind: "Website", status: "Published", pages: "9 pages", updated: "Updated today" },
    { name: "Book a discovery call", kind: "Funnel", status: "Published", pages: "2 steps", updated: "Updated Mon" },
    { name: "Free systems audit", kind: "Funnel", status: "Draft", pages: "3 steps", updated: "Updated Fri" },
    { name: "Client onboarding", kind: "Form", status: "Published", pages: "12 fields", updated: "Updated 8 Oct" },
    { name: "Brightwater Plumbing", kind: "Client website", status: "Published", pages: "6 pages", updated: "Updated 6 Oct" },
    { name: "Summit Fitouts", kind: "Client website", status: "In review", pages: "5 pages", updated: "Updated 2 Oct" },
  ],

  courses: [
    { title: "Getting started with Bgentic", lessons: 6, members: 14, done: 0.82 },
    { title: "Using the mobile app", lessons: 4, members: 11, done: 0.64 },
    { title: "Running your pipeline", lessons: 5, members: 9, done: 0.47 },
    { title: "Your AI receptionist", lessons: 3, members: 12, done: 0.9 },
  ],
  learning: [
    { who: "ER", text: "Elena Rossi finished Running your pipeline, lesson 4", when: "1 h ago" },
    { who: "HB", text: "Hannah Bright started Getting started with Bgentic", when: "3 h ago" },
    { who: "SP", text: "Sam Patel finished Using the mobile app", when: "Yesterday" },
  ],

  media: {
    used: 2.4,
    total: 10,
    folders: [
      { name: "Brand", files: 24 },
      { name: "Client photos", files: 118 },
      { name: "Documents", files: 37 },
      { name: "Videos", files: 6 },
    ],
    files: [
      { name: "bgentic-logo.svg", kind: "image", size: "12 KB" },
      { name: "brand-guide.pdf", kind: "doc", size: "4.2 MB" },
      { name: "proposal-template.docx", kind: "doc", size: "86 KB" },
      { name: "site-hero.jpg", kind: "image", size: "1.8 MB" },
      { name: "onboarding-walkthrough.mp4", kind: "video", size: "64 MB" },
      { name: "onboarding-checklist.pdf", kind: "doc", size: "220 KB" },
      { name: "team-photo.jpg", kind: "image", size: "2.6 MB" },
      { name: "invoice-template.pdf", kind: "doc", size: "140 KB" },
    ],
  },

  reputation: {
    stats: [
      { label: "Requests sent", value: "42", note: "Last 30 days" },
      { label: "Opened", value: "31", note: "74% of requests" },
      { label: "Clicked through", value: "18", note: "To your Google profile" },
    ],
    requests: [
      { initials: "ER", name: "Elena Rossi", channel: "SMS", sent: "12 Oct", status: "Opened" },
      { initials: "SP", name: "Sam Patel", channel: "Email", sent: "11 Oct", status: "Clicked through" },
      { initials: "JO", name: "James Olano", channel: "SMS", sent: "10 Oct", status: "Sent" },
      { initials: "MN", name: "Marcus Ng", channel: "Email", sent: "9 Oct", status: "Opened" },
    ],
  },

  reporting: {
    weeks: [
      { label: "24 Aug", leads: 9 },
      { label: "31 Aug", leads: 12 },
      { label: "7 Sep", leads: 10 },
      { label: "14 Sep", leads: 15 },
      { label: "21 Sep", leads: 14 },
      { label: "28 Sep", leads: 18 },
      { label: "5 Oct", leads: 17 },
      { label: "12 Oct", leads: 21 },
    ],
    calls: [
      { day: "Mon", answered: 9, missed: 1 },
      { day: "Tue", answered: 11, missed: 0 },
      { day: "Wed", answered: 8, missed: 2 },
      { day: "Thu", answered: 10, missed: 1 },
      { day: "Fri", answered: 7, missed: 0 },
      { day: "Sat", answered: 3, missed: 0 },
      { day: "Sun", answered: 0, missed: 0 },
    ],
    sources: [
      { label: "Website", share: 41 },
      { label: "Phone", share: 33 },
      { label: "Referral", share: 16 },
      { label: "Social", share: 10 },
    ],
  },

  settings: {
    profile: [
      { label: "Business name", value: "Bgentic" },
      { label: "Business email", value: "hello@bgentic.io" },
      { label: "Location", value: "Carlingford, NSW" },
      { label: "Time zone", value: "Australia/Sydney" },
    ],
    team: [
      { initials: "C", name: "Christian", role: "Engineer" },
      { initials: "J", name: "John", role: "Engineer" },
      { initials: "B", name: "Bayan", role: "Engineer" },
    ],
    integrations: [
      { name: "Xero", on: true },
      { name: "MYOB", on: false },
      { name: "Google Business Profile", on: true },
      { name: "Facebook Messenger", on: true },
    ],
  },
}
