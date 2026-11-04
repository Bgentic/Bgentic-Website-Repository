# Client testimonial drafts

These are suggested testimonials for each client to review, change and approve. They are drafts, not quotes. None of
them goes on the site until the client has approved the exact wording in writing.

Each draft describes only the system Bgentic actually runs for that client (`src/content/clients.ts`). The client can
cut, reword or replace any of it. Their wording is what gets published, even if it's very different from the draft.

## How to ask

Send each client their draft with a short note, for example:

> We're refreshing the Bgentic website and would love a line from you about the system we run for [business]. Here's a
> draft to save you time, but please change anything, or write your own. We'll only publish the version you send back,
> with your name and role.

Keep the client's written approval (the email is enough) on file.

## Drafts

Each client has a confident version and a plainer one. Send whichever suits the client; strong praise only lands if
the client would genuinely say it.

### NPP Traffic Solutions

Built: job request forms, invoicing and controller scheduling.

> "Bgentic rebuilt how we run the business. Job requests, invoicing and controller scheduling used to be spread
> across spreadsheets, inboxes and phone calls. Now it's one system, and it runs like clockwork. Whenever we need
> something changed, it's done fast and done properly. They're not a vendor, they're our systems team."

Plainer:

> "Job requests, invoicing and controller scheduling used to live in three places. Bgentic pulled them into one
> system, and it just runs. When we need a change, they make it, quickly."

Credit: [name], [role], NPP Traffic Solutions

### Sydney Pink Slips

Built: online booking, text-to-pay on site, and a Google review request after every inspection.

> "Bgentic took the admin off our plate completely. Customers book themselves in online, pay by text before our
> inspector has packed up, and get a review request the moment the job's done. It all happens without us lifting a
> finger, and it never misses. Best decision we've made for the business."

Plainer:

> "Customers book online, pay by text before we've packed up, and get asked for a review after every inspection. All
> of it happens on its own. Bgentic set it up and keeps it running, so we can stay on the road."

Credit: [name], [role], Sydney Pink Slips

### We Are Art

Built: social DMs, event bookings and equipment scheduling in one shared inbox.

> "In our world a missed message is a missed gig. Bgentic put every DM, booking and equipment request into one inbox
> the whole crew works from, and nothing slips through any more, not even on our busiest weekends. They built it
> around how we actually work, and they're always there when we need them."

Plainer:

> "Every DM, booking and equipment request now lands in one inbox the whole crew can see, so nothing slips through on a
> busy weekend. Bgentic built it around how we actually work."

Credit: [name], [role], We Are Art

### Sventy8 Events

Built: the website, funnels, social planner and ticket enquiry forms.

> "Bgentic run the whole digital side of Sventy8: our website, funnels, social planner and ticket enquiries, all on
> one system they built and look after. It's rock solid, it looks the part, and it frees us to do what we're good
> at: putting on the events."

Plainer:

> "Our website, funnels, social planner and ticket enquiries all run through the system Bgentic built for us. They
> look after it, so we can focus on the events."

Credit: [name], [role], Sventy8 Events

### Before sending

Some lines make claims only the client can confirm, for example "it never misses", "best decision we've made" and
"nothing slips through any more". Leave them in only if the client agrees they're true. Their sign-off is what makes
the quote theirs.

## Publishing an approved quote

1. Add it to `APPROVED` in `src/content/testimonials.ts`, using the client's slug and their approved text and credit:

   ```ts
   const APPROVED = {
     "sydney-pink-slips": { text: "The approved wording, exactly as sent.", by: "Name, Role at Sydney Pink Slips" },
   }
   ```

2. That card then shows the quote, in quotation marks, credited to the person who said it.
3. Once at least one client is quoted, the section heading switches to "In their words."

Clients without an approved quote keep the factual card ("Runs on Bgentic").
