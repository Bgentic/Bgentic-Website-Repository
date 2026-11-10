// The Terms of Service and the Privacy Policy, word for word as supplied (Legal.txt, 2026-11-10, version 1.0,
// effective 11 August 2026). Locked: change them only with sign-off. Rendered by components/legal/legal-document.tsx.
//
// The body is light markdown, one block per paragraph:
//   ## 01. Title          a numbered section (its anchor is #s-01; a schedule's is #schedule-1)
//   ### Title             a heading within a section
//   - item / 1. item      a list; items starting "(a)" read as a lettered list
//   | a | b |             a table, the first row its header
//   > **Label:** text     a callout
//   **Lead.** text        a paragraph led by a bold phrase
//   [text](href)          a link; email addresses and phone numbers link themselves

export type LegalDoc = {
  title: string
  description: string
  intro: string
  version: string
  /** the clauses most people look for, linked from the top of the page */
  keySections?: { label: string; href: string }[]
  body: string
  /** the closing block: the company's details, then a link to the other document */
  closing: string[]
  seeAlso: { label: string; href: string }
}

export const COMPANY_LINE = "Bgentic Pty Ltd ACN 699 335 754. ABN 27 699 335 754."

export const TERMS: LegalDoc = {
  title: "Terms of Service",
  description:
    "The terms on which Bgentic Pty Ltd provides its business platform and setup and management services to Australian businesses.",
  intro:
    "Bgentic Pty Ltd ACN 699 335 754, ABN 27 699 335 754, provides a business platform and related setup and management services to Australian businesses. These Terms of Service form a binding contract between us and you. By creating an account, starting a trial, or using the Services, you agree to them.",
  version: "Version 1.0. Effective 11 August 2026.",
  keySections: [
    { label: "01. About these terms", href: "#s-01" },
    { label: "02. Definitions", href: "#s-02" },
    { label: "05. Free trial", href: "#s-05" },
    { label: "06. Fees & GST", href: "#s-06" },
    { label: "07. Usage charges", href: "#s-07" },
    { label: "13. AI features", href: "#s-13" },
    { label: "13A. Paid advertising", href: "#s-13a" },
    { label: "21. Term & termination", href: "#s-21" },
    { label: "25. Limitation of liability", href: "#s-25" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  body: `
## 01. About these terms

**Who we are.** "Bgentic", "we", "us" and "our" means Bgentic Pty Ltd ACN 699 335 754 (ABN 27 699 335 754), a company incorporated in Australia and based in Sydney, New South Wales.

**Who you are.** "You" and "your" means the business entity that subscribes to the Services. If you accept these terms on behalf of a business, you confirm you have authority to bind that business, and "you" means that business.

**What forms the agreement.** These terms, together with our [Privacy Policy](/privacy), the plan and fees you select at signup, and any written statement of work or proposal we agree with you, make up the whole agreement between us. If a signed statement of work conflicts with these terms, the statement of work applies to the extent of that conflict.

**For business use only.** The Services are supplied for use in your business or profession. They are not supplied for personal, domestic or household use.

## 02. Definitions

- **Build Fee.** A one off fee for a website build, snapshot integration, custom automation build or similar project work, as set out in a proposal or statement of work.
- **Contact Data.** Personal information about your customers, leads, staff and other individuals that you upload to, collect through, or process using the Platform.
- **Included Credits.** The complimentary monthly usage allowance attached to your Plan under clause 7.
- **Platform.** The software platform we make available to you, comprising the CRM, calendars, website and funnel builder, forms, automation workflows, messaging tools, AI features and related functionality.
- **Plan.** The subscription tier you select, and the fees, inclusions and limits that apply to it as published on our pricing page or set out in your proposal.
- **Platform Provider.** The third party software provider whose infrastructure underlies the Platform, together with its subprocessors.
- **Services.** Access to the Platform, together with any setup, configuration, build, management, support or advisory services we provide to you.
- **Usage Charges.** Charges for consumption based features under clause 7, including SMS, MMS, voice calls, phone numbers, email volume and AI usage.
- **Ad Account.** An advertising account held with an advertising platform, in your name and under your billing, on which we manage campaigns for you.
- **Advertising Services.** Where agreed in a proposal or statement of work, the planning, building, launching, management, optimisation and reporting of paid advertising campaigns under clause 13A.
- **Media Spend.** Amounts payable by you directly to an advertising platform for advertising, separate from and additional to our management fee.
- **Your Materials.** Content, branding, images, copy, data and other materials you supply to us or upload to the Platform.

## 03. Eligibility and your account

You must be at least 18 years old, and must be operating a business, to use the Services.

You must give us accurate and current registration and billing information, and tell us within 10 business days if it changes.

**Account security.** You are responsible for keeping your login credentials confidential and for everything done under your account, whether or not you authorised it. You must enable two factor authentication where it is available, and tell us immediately if you suspect unauthorised access. We are not liable for loss arising from your failure to secure your account or to implement the security measures we make available to you.

**Your users.** You are responsible for the conduct of your staff, contractors and anyone else you give access to your account, and you must ensure they comply with these terms.

## 04. What we provide

We provide access to the Platform on a subscription basis, and, depending on your Plan and any statement of work, setup, configuration, build and ongoing management services.

**What we do not provide.** We are a technology and services provider. We do not provide legal, accounting, tax, financial, medical or other professional advice, and nothing we supply should be relied on as such. We do not guarantee any particular business outcome, including any level of leads, enquiries, bookings, conversions, revenue, search ranking or message deliverability.

**Changes to the Platform.** The Platform evolves. We may add, change, or remove features from time to time. Where a change materially reduces core functionality you rely on, we will give you reasonable notice, and you may terminate under clause 21 if the change is not acceptable to you. We may also change the underlying Platform Provider on reasonable notice, provided the Services remain materially equivalent.

## 05. Free trial

We may offer a 14 day free trial. If you start a trial:

- we will collect your payment method at signup;
- your trial runs for 14 days from the day you sign up;
- unless you cancel before the trial ends, your subscription automatically continues and we will charge your payment method the Plan fee on day 15, and monthly thereafter;
- you can cancel at any time during the trial from your account, or by emailing info@bgentic.io, and you will not be charged;
- Usage Charges incurred during the trial are still payable;
- trials are one per business. Consecutive or repeated trials taken to avoid paying subscription fees are not permitted and we may cancel them.

> **In plain terms:** The trial converts to a paid subscription automatically. If you do not want it to, cancel before day 15.

## 06. Fees, GST and billing

All prices are in Australian dollars and inclusive of GST.

**Subscription fees.** Plan fees are billed monthly in advance. Your billing date is the day you first convert to a paid subscription, and recurs monthly on that date.

**Automatic renewal.** Your subscription continues month to month and renews automatically until cancelled. You authorise us to charge your nominated payment method for Plan fees, Usage Charges and Build Fees as they fall due, without further authorisation from you each cycle.

**Payment processing.** Payments are processed by our payment provider. You are responsible for any fees your bank or card issuer charges you.

**Failed and late payments.** If a payment fails we will retry. If an amount remains unpaid for 14 days we may suspend your account under clause 20. If it remains unpaid for 30 days we may terminate under clause 21. You are responsible for reasonable costs we incur recovering overdue amounts, including debt recovery agency fees, and for any chargeback fees or penalties resulting from a chargeback on your account.

**Disputed invoices.** If you dispute an amount, tell us in writing within 30 days of the invoice date and we will work with you in good faith to resolve it. Undisputed amounts remain payable while a dispute is on foot.

**No pro rata refunds.** Plan fees are charged for a whole billing month. If you cancel part way through a month, your access continues to the end of that month and we do not refund the unused portion. This clause does not limit your rights under the Australian Consumer Law (clause 23).

## 07. Usage charges and credits

Some features are charged on consumption in addition to your Plan fee. These include SMS and MMS, inbound and outbound voice calls, phone number rental, email volume above Plan inclusions, and AI usage.

**Included Credits.** Each Plan includes a complimentary monthly usage allowance, applied automatically against Usage Charges:

| Plan | Included Credits per month |
| Basic | $10 |
| Standard | $15 |
| Premium | $20 |

Included Credits do not roll over. Any unused portion expires at the end of each billing month. They have no cash value, are not refundable and are not redeemable for cash or credit on cancellation.

**How usage is billed.** Usage Charges are calculated at our published rates. Those rates are set by us and are not a pass through of any third party's cost. Included Credits are applied first each month. Once they are exhausted, further usage draws down your account balance.

**Automatic top ups.** Usage based features run on a prepaid account balance. When your balance falls below the threshold we set, we will automatically charge your payment method $10 to top it up, and will repeat that charge as often as your usage requires while consumption based features remain enabled. You authorise these charges without needing to approve each one. You can view your balance and usage history in your account at any time.

**Controlling your spend.** You may ask us in writing to set a monthly spend cap on your account, and we will apply one within a reasonable time. Once a cap is reached, consumption based features will stop until you lift it. If you do not set a cap, top ups continue automatically. If your balance goes negative for any reason, you authorise us to charge your payment method to clear it.

**Your responsibility for usage.** You are responsible for all Usage Charges incurred on your account, including usage generated by automations you or your staff configure, and including usage arising from misconfiguration, loops or unintended sends. We recommend you set and monitor sending limits. We are not liable for Usage Charges resulting from changes you or your users make.

**Rate changes.** We may change published usage rates on 30 days notice under clause 9.

## 08. Build fees and custom work

Website builds, snapshot integrations, custom automation builds and similar project work are quoted separately in a proposal or statement of work.

**Payment structure.** Unless the proposal says otherwise, Build Fees are payable 50% on acceptance of the proposal and 50% on completion. We are not obliged to start work until the deposit is received, and we are not obliged to make the completed work live until the balance is paid.

**Your inputs.** Build timeframes assume you provide content, branding, access credentials, approvals and feedback promptly. Where delays are caused by your inputs, timeframes extend accordingly. If a project is stalled awaiting your inputs for more than 60 days, we may invoice for work completed to that point and close the project.

**Scope.** The proposal defines the scope. Work outside it is charged separately at our then current rates and only after you approve it in writing.

**If you cancel a build in progress.** You may cancel a build at any time by written notice. We will retain from the deposit an amount equal to the value of work performed and third party costs committed up to the date of cancellation, calculated at our standard rates, and refund any balance. If the value of work performed and costs committed exceeds the deposit, you remain liable for the shortfall. On request we will give you a reasonable breakdown of the work performed.

**If we cannot complete a build.** If we cancel a build for a reason other than your breach, we will refund the deposit less the value of work already delivered to you and accepted by you.

## 09. Changes to fees

We may change Plan fees, Included Credits and published usage rates. If we do:

- we will give you at least 30 days written notice before the change takes effect;
- you may terminate your subscription at any time before the change takes effect, with no break fee and no penalty, by telling us in writing;
- if you do not terminate, the new fees apply from the date stated in the notice.

There is no break fee at any time. You are never locked into a minimum term.

## 10. Your responsibilities

You must:

- use the Services lawfully and in accordance with Schedule 1 (Acceptable Use);
- hold and maintain all licences, registrations, permits and consents your business needs;
- comply with all laws that apply to your business and to your communications with your customers, including the Privacy Act 1988 (Cth), the Spam Act 2003 (Cth), the Do Not Call Register Act 2006 (Cth), the Australian Consumer Law, and applicable surveillance devices legislation;
- own or hold all necessary rights in Your Materials, and ensure they do not infringe anyone else's rights;
- maintain your own privacy policy and, where you collect personal information through the Platform, provide the notices and obtain the consents that the Privacy Act requires;
- keep your own independent records of your customer data and not rely solely on the Platform as your only copy;
- cooperate reasonably with information requests from law enforcement, regulators or telecommunications carriers relating to your use of the Services.

**Accessibility.** If we build a website for you, you are responsible for ensuring the published site meets the accessibility standards that apply to your business, including under the Disability Discrimination Act 1992 (Cth). We will build to a reasonable standard and can quote separately on an accessibility audit.

## 11. Marketing communications and consent

> **Important:** You are the sender of every message sent from your account. We provide the tools. We do not choose your recipients, your content or your timing.

You warrant that, for every individual you contact using the Services:

- you have valid consent under the Spam Act 2003 (Cth) to send commercial electronic messages to them, whether express or properly inferred;
- every commercial electronic message clearly identifies you and includes a functional unsubscribe facility that you honour within 5 business days;
- you have checked numbers against the Do Not Call Register where the Do Not Call Register Act 2006 (Cth) requires it, or a recognised exemption applies;
- you keep accurate records of consent, and can produce them on request;
- you have not purchased, harvested or scraped the contact list, and it was not acquired from a source that did not obtain consent for onward sending.

You must not use the Services to send unsolicited bulk messages, to contact individuals who have opted out, or in any way that breaches the Spam Act or the Do Not Call Register Act. These obligations survive termination. You indemnify us under clause 26 for any claim, penalty or regulatory action arising from your communications.

## 12. Call recording

> **Read this clause carefully:** Recording a phone call without the consent of every party to it is a criminal offence in New South Wales and in most other Australian states and territories. If you enable call recording, these obligations are not optional.

The Platform includes an optional call recording feature. If you enable it, you must:

- play an automated announcement at the very start of every recorded call, before any substantive conversation, telling the other party that the call is being or may be recorded and why;
- give the other party a genuine opportunity to end the call, or to continue without being recorded, before recording begins;
- not disable, bypass, shorten or modify the announcement, and not configure any workflow that has that effect;
- state in your own privacy policy that you record calls, why, how long you keep recordings and who can access them;
- store, access and delete recordings in accordance with the Privacy Act, and restrict access to staff who need it;
- comply with the Surveillance Devices Act 2007 (NSW), the Telecommunications (Interception and Access) Act 1979 (Cth), and any equivalent legislation in any state or territory where you or the other party are located.

We will configure the announcement as part of your setup where call recording is enabled. You are solely responsible for keeping it in place. If you disable or circumvent it, or you record a call without the required consent, you indemnify us in full for all resulting claims, penalties, fines and costs, and we may suspend the feature or your account immediately.

We do not listen to, review or use your call recordings except where you ask us to for support or configuration purposes, or where we are required to by law.

## 13. AI features

The Platform includes AI features, which may include chat assistants, voice agents, content generation, summarisation and workflow automation.

**Disclosure is mandatory.** If you deploy an AI chat or voice agent that interacts with individuals, you must clearly disclose to them that they are interacting with an AI system, at the start of the interaction. You must not present AI generated output as human generated. You must not configure an AI agent to deny that it is an AI system.

**Output is not guaranteed.** AI output can be inaccurate, incomplete, out of date or inappropriate. It is generated statistically, not verified. You are solely responsible for reviewing and validating all AI generated content before you publish it, send it or act on it. We give no warranty as to accuracy, reliability or fitness of any AI output.

**No professional advice.** You must not use AI features to give individualised legal, medical, financial, tax or other advice that would ordinarily be given by a licensed professional, and you must not configure an AI agent to do so.

**Sensitive information.** You must not input sensitive information into AI features, including health information, government identifiers such as driver licence, Medicare or tax file numbers, biometric information, or information about a person's race, religion, sexual orientation, political opinions or criminal record.

**Automated decisions.** You must not use AI features to make automated decisions producing legal or similarly significant effects about an individual, including decisions about credit, employment, insurance or eligibility for a service, without meaningful human review.

**Processing.** AI features are delivered using third party AI providers listed in Schedule 2. Inputs you submit may be processed by those providers under their own terms.

## 13A. Paid advertising management

This clause applies where we manage paid advertising campaigns for you. It applies in addition to the rest of this agreement, and prevails over any inconsistent clause in relation to advertising services.

**What we do.** Where you engage us to manage paid advertising, we will plan, build, launch and manage campaigns on the platforms agreed with you, set up conversion tracking, and report on activity. The specific scope, platforms, management fee and reporting frequency are set out in a separate proposal or statement of work. Nothing in this clause obliges us to provide advertising services unless we have agreed to in writing.

**Your ad accounts.** All campaigns run on advertising accounts owned by you, in your name, with your own billing method attached. You grant us the access we need to manage them. You remain the account owner throughout, and you retain your account history, pixels, tracking assets and audiences. On termination we will remove our access promptly, and you keep the accounts. We will not run your campaigns on an advertising account owned by us.

**Media spend.** Media spend is paid by you directly to the advertising platform and is separate from, and additional to, our management fee. We do not fund, front or advance media spend. We are not responsible for spend charged to your account, including spend resulting from a change you or your personnel make. If you ask us to place media spend on our own payment method in any circumstance, we may decline, and if we agree it is repayable by you immediately on invoice.

**Budget and approvals.** You set your budget. We will obtain your written approval before launching a campaign, before increasing a budget, and before any material change to targeting or spend. Written approval includes email and any written approval given through the platform. We are not liable for spend incurred under an approval you gave.

**Advertising platforms are outside our control.** Advertising platforms set and enforce their own policies, and change them without notice. To the maximum extent permitted by law, we are not liable for, and give no warranty as to:

- (a) approval, disapproval, rejection or removal of any advertisement;
- (b) restriction, suspension, disabling or permanent ban of any advertising account, page, pixel or business manager;
- (c) the reach, impressions, placement, frequency or delivery of any advertisement;
- (d) the cost of advertising, including changes in auction pricing, cost per click, cost per impression or cost per acquisition;
- (e) the accuracy or availability of any platform's reporting, attribution or tracking; or
- (f) any change a platform makes to its policies, algorithms, targeting options, tracking or available features.

Where an account is restricted or an advertisement is rejected, we will use reasonable endeavours to identify the cause and pursue the platform's appeal process. We cannot guarantee reinstatement, and we are not liable for loss arising from the restriction or from the time taken to resolve it.

**No performance guarantee.** We do not guarantee any level of leads, enquiries, bookings, conversions, sales, revenue, return on ad spend, cost per result, or any other outcome. Advertising results depend on your offer, your pricing, your market, your competitors, your ability to respond to enquiries and factors outside anyone's control. Any forecast, projection, benchmark or estimate we give is an opinion based on the information available at the time and is not a representation, warranty or guarantee.

**Your responsibilities.** You must:

- (a) ensure your advertising complies with all applicable laws, including the Australian Consumer Law and any industry specific advertising rules that apply to your business;
- (b) hold all licences, registrations and approvals your business and your advertised claims require;
- (c) ensure any claim, price, offer, testimonial, review or before and after representation you ask us to advertise is accurate, current and substantiated, and provide the substantiation on request;
- (d) hold all rights in any creative, imagery, footage, music, logo or person's likeness you supply or ask us to use;
- (e) maintain your own privacy policy and any consent, collection notice or disclosure your tracking, pixels or lead forms require;
- (f) tell us promptly of any change to your offer, pricing, availability or capacity that affects a live campaign;
- (g) not make changes to a live campaign or account setting without telling us, as this may affect performance and reporting.

**Content approval.** We may decline to build, publish or continue running any advertisement that we reasonably believe is unlawful, misleading, unsubstantiated, likely to breach a platform's policies, or likely to damage our reputation. Declining to run an advertisement is not a breach of this agreement.

**Tracking.** Advertising platforms and browsers restrict tracking, and attribution is inherently approximate. Figures reported by different platforms will not reconcile with each other or with your own records. We do not warrant the accuracy of platform reported figures.

**Termination of advertising services.** Either party may end advertising services on 30 days written notice, without affecting the rest of this agreement. On the day advertising services end, we will pause campaigns unless you tell us otherwise in writing, and hand back full control of your accounts. You are responsible for spend incurred up to that point, and for pausing or continuing campaigns after it. Management fees already paid for the current period are not refundable.

**Indemnity.** You indemnify us for any claim, penalty, fine or regulatory action arising from the content of your advertising, the accuracy of your claims, the rights in your creative, your compliance with advertising law, or a breach of an advertising platform's terms by you or at your direction. This is in addition to clause 26.

## 14. Third party platforms and availability

The Platform is delivered on third party infrastructure, and integrates with third party services such as payment processing, accounting, advertising, calendar and messaging providers.

**No uptime guarantee.** We do not warrant that the Platform will be available without interruption, error free, secure, or that it will meet your requirements. Outages, degraded performance, delayed message delivery, feature changes and feature removals by the Platform Provider are outside our control.

**Third party services.** We are not responsible for the acts, omissions, availability, accuracy or security of any third party service, including where it modifies or deletes data. Your use of a third party service is governed by your agreement with that provider and is at your own risk. We do not warrant that any integration will continue to be supported.

**Carrier and deliverability.** Message delivery depends on telecommunications carriers, email providers and their filtering. We cannot guarantee that any message will be delivered, will reach an inbox, or will not be filtered as spam.

Where the Platform Provider requires us to suspend or terminate an account, or imposes a restriction on how the Platform may be used, we must comply, and we may pass that requirement through to you on the shortest notice reasonably practicable.

## 15. Domains and phone numbers

**Domains.** You should register and hold your own domain names in your own name, with your own registrar, and point them to the Platform. We will not act as registrant of your domain. If you ask us to arrange a domain through the Platform, you accept that the Platform Provider may be recorded as registrant or administrative contact, that this limits your control of the domain, and that you do so at your own risk.

**Phone numbers.** Numbers provisioned through the Platform are held under the Platform Provider's arrangements and are generally released shortly after an account is cancelled. If a number matters to your business, port it in from a carrier you control, or port it out before you cancel. We are not liable for the loss of a number you did not port in.

## 16. Support

We provide support by email at info@bgentic.io, and through the in platform AI assistant, which is available at any time for common questions and configuration help.

We will use reasonable endeavours to respond to support requests within a reasonable time during Australian Eastern business hours, Monday to Friday, excluding NSW public holidays. We do not commit to a guaranteed response or resolution time. Higher tier Plans receive priority.

**Please contact us, not the Platform Provider.** All support for the Services is provided by us. Do not contact the underlying Platform Provider directly.

**Out of scope.** Support does not include training beyond initial onboarding, support for your own hardware, networks or third party accounts, work covered by a separate statement of work, or fixing issues caused by changes you or your users make. We may quote separately for that work.

## 17. Intellectual property

### What you own

You own Your Materials, your Contact Data, your branding, and all content you create or upload.

**Website builds.** Where you have paid the Build Fee in full for a website build, you own the custom code, page templates, styling, copy and design assets we create specifically for you, and we assign that ownership to you on payment. On request we will provide an export of that code and the associated assets in a usable format.

**What transfers is the public facing website.** Ownership under this clause covers the customer facing site: its pages, code, styling, copy and design assets. It does not extend to what sits behind the site. The automation workflows, form and survey logic, pipelines, calendar configurations, message templates, snapshots and CRM structure that make the site function as part of the Platform remain ours under the clause below, and they do not transfer with the site. If you take the site elsewhere, you are taking the front end only, and you will need to rebuild or replace the automation layer.

**Two necessary limits:** First, we cannot transfer ownership of the underlying Platform's builder components, page rendering engine, hosting or third party libraries, because those belong to the Platform Provider or to their respective licensors and we hold only a licence to them. A site built inside the Platform may therefore need adaptation to run elsewhere.

Second, forms, automations, workflows and integrations connected to the site are part of the Platform configuration, not part of the website, and they stop working when your subscription ends.

We will tell you honestly what is portable before you commission a build, so there are no surprises later.

### What we own

We own, and retain, all rights in the Platform configuration we develop, including snapshots, automation workflows, pipeline structures, form and calendar configurations, prompt libraries, message templates, documentation and our methodology. While your subscription is active we grant you a non exclusive, non transferable licence to use that configuration in your own account for your own business. That licence ends when your subscription ends.

You must not copy, resell, sublicense, or make our configurations available to any third party, and must not use them to build a competing service.

### Licence to us

You grant us a non exclusive licence to use Your Materials only to the extent needed to provide the Services to you. We may name you as a client and use your logo in our marketing unless you tell us in writing that you would prefer we did not.

### Feedback

If you give us suggestions or feedback about the Services, we may use them without restriction or payment.

## 18. Your data

You retain ownership of your Contact Data. We process it on your behalf on the terms in Schedule 2 (Data Processing), which forms part of this agreement.

As between us, you are responsible for the lawfulness of your Contact Data, including collecting it lawfully, giving the required privacy notices, obtaining consents, responding to access and correction requests from individuals, and setting appropriate retention periods.

We may generate and use aggregated, de identified data about how the Services are used, to operate, secure and improve them. That data will never identify you or any individual.

Please maintain your own backups. While we take reasonable steps to protect your data, no system is perfectly secure and we do not warrant against data loss.

## 19. Confidentiality

Each of us may receive confidential information from the other. Each of us agrees to keep the other's confidential information confidential, to use it only for the purposes of this agreement, and to disclose it only to staff and advisers who need it and who are under equivalent obligations.

This does not apply to information that is public through no breach, was already lawfully known, is independently developed, or must be disclosed by law or by a regulator. These obligations continue for 3 years after this agreement ends, and indefinitely for personal information and trade secrets.

We operate strict access controls. Our personnel access your account only where needed to deliver, support or secure the Services, or where you ask us to.

## 20. Suspension

We may suspend your access to some or all of the Services, immediately and without liability, if:

- an amount is unpaid for more than 14 days;
- we reasonably believe you have breached Schedule 1, clause 11, clause 12 or clause 13;
- we reasonably suspect fraudulent, abusive or unlawful activity on your account;
- your use is threatening the security, integrity or performance of the Platform, or is causing carrier or deliverability problems affecting other users;
- the Platform Provider requires us to;
- suspension is necessary to comply with a law, court order or regulator direction.

We will tell you the reason and, where the circumstances allow, give you an opportunity to fix the problem. Plan fees continue to accrue during a suspension caused by your breach or non payment.

## 21. Term and termination

**No minimum term.** Your subscription runs month to month. There is no lock in and no break fee.

You may cancel at any time from your account or by emailing info@bgentic.io. Cancellation takes effect at the end of your current billing month. You keep access until then. Outstanding Build Fees and Usage Charges remain payable.

We may terminate for convenience on 30 days written notice. If we do, we will refund any Plan fees you have paid for a period after the termination date, and help you export your data.

Either of us may terminate immediately if the other commits a material breach that is not remedied within 14 days of written notice, or becomes insolvent, or has an administrator, receiver or liquidator appointed.

We may terminate immediately if you breach Schedule 1, clause 11, clause 12 or clause 13, if an amount is unpaid for more than 30 days, or if the Platform Provider requires it.

On termination your right to use the Services ends, licences granted to you under clause 17 end, and all amounts owing become immediately due. Clauses 11, 12, 17, 18, 19, 23, 24, 25, 26, 27 and 29 survive.

## 22. Getting your data out

For 30 days after your subscription ends, provided your account is paid up, you may request an export of your Contact Data and, where clause 17 applies, your public facing website code and assets. We will provide it in a common machine readable format within a reasonable time and at no charge for a standard export. Complex or repeated extractions may be quoted separately.

**To be clear about what an export includes:** you receive your contact records and, where you have paid the Build Fee in full, the front end of your website. You do not receive the automation workflows, forms, pipelines, snapshots or CRM configuration, which remain ours under clause 17 and cease to be available to you when your subscription ends.

After that 30 day window we are under no obligation to retain or provide your data, and it may be deleted from the Platform. Please export before you cancel, and keep your own backups. We are not liable for data that is no longer available after this window.

## 23. Australian Consumer Law

Nothing in these terms excludes, restricts or modifies any guarantee, right or remedy you have under the Competition and Consumer Act 2010 (Cth), including the Australian Consumer Law, that cannot lawfully be excluded, restricted or modified.

Our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law. Where a guarantee applies and the failure is major, you are entitled to a remedy under that law.

To the extent permitted by section 64A of the Australian Consumer Law, and where the services are not of a kind ordinarily acquired for personal, domestic or household use or consumption, our liability for failure to comply with a consumer guarantee is limited, at our option, to supplying the services again or paying the cost of having them supplied again.

## 24. Warranties and disclaimers

We warrant that we will provide the Services with due care and skill, and with reasonable competence, by suitably capable personnel.

Subject to clause 23, and to the maximum extent permitted by law, the Services and the Platform are provided on an "as is" and "as available" basis, and we do not warrant that:

- the Platform will be uninterrupted, timely, secure or error free;
- results obtained from the Services will be accurate, effective or reliable;
- any defect will be corrected, or that any particular feature will continue to be available;
- any message, email or campaign will be delivered, will reach an inbox, or will produce any result;
- AI generated output will be accurate or fit for any purpose.

## 25. Limitation of liability

Subject to clause 23, and to the maximum extent permitted by law:

**Cap.** Our total aggregate liability to you arising out of or in connection with this agreement and the Services, however arising, including in contract, tort (including negligence), under statute or otherwise, is limited to the total amount you paid us in the 6 months immediately before the event giving rise to the liability.

**Excluded loss.** We are not liable for any indirect, special, incidental, punitive or consequential loss, or for any loss of profit, loss of revenue, loss of anticipated savings, loss of business opportunity, loss of goodwill or reputation, loss of data or cost of data reconstruction, however arising, even if we were advised of the possibility.

**Matters outside our control.** We are not liable for loss arising from acts or omissions of the Platform Provider, any advertising platform or any third party service, telecommunications or carrier failure, message filtering or non delivery, advertisement disapproval or account restriction, your own configuration or campaign changes, your failure to secure your account, your failure to maintain backups, or your breach of these terms.

**Contribution.** Our liability is reduced to the extent your acts or omissions, or those of your personnel, caused or contributed to the loss.

**Mitigation.** Each of us must take reasonable steps to mitigate loss.

## 26. Indemnity

You indemnify us against all claims, liabilities, losses, fines, penalties and reasonable costs (including reasonable legal costs) arising from a third party claim or a regulatory action that results from:

- your breach of clause 11 (marketing communications), clause 12 (call recording), clause 13 (AI features) or Schedule 1;
- your Contact Data, including any claim that it was collected, used, disclosed or retained unlawfully, or without the required consent or notice;
- Your Materials, including any claim that they infringe a third party's intellectual property or other rights, or are misleading or deceptive;
- your breach of a law that applies to your business;
- a dispute between you and your own customers, staff or contractors;
- a data breach caused by your failure to secure your account or to implement security measures we made available to you;
- your advertising, including the content and accuracy of any claim, offer, price or representation, the rights in any creative you supply, and any breach of an advertising platform's terms or policies;

This indemnity is reduced to the extent our negligence or breach contributed to the loss. We will notify you promptly of any claim, not settle it without your consent (not to be unreasonably withheld), and let you control the defence if you confirm the indemnity applies.

## 27. Resolving disputes

If a dispute arises, we both agree to try to resolve it before starting proceedings.

1. **Notice.** The party raising the dispute gives the other written notice describing it and the outcome sought.
2. **Good faith discussion.** Within 10 business days, senior representatives of each party meet, in person or by video, and negotiate in good faith.
3. **Mediation.** If the dispute is not resolved within 20 business days of the notice, either party may refer it to mediation administered by the Australian Disputes Centre, on its standard terms, with costs shared equally.

Neither party may start court proceedings until these steps are complete, except to seek urgent interlocutory or injunctive relief, or to recover an undisputed debt.

## 28. Changes to these terms

We may update these terms, including where our Platform Provider changes its own requirements and we are contractually required to pass those changes through.

If a change is materially detrimental to you, we will give you at least 30 days written notice by email before it takes effect. You may terminate before it takes effect, with no penalty. If you continue using the Services after that date, the updated terms apply.

Minor changes, such as clarifications, corrections and updates to contact details, take effect when published. The current version and effective date are always shown at the top of this page.

## 29. General

**Governing law.** This agreement is governed by the laws of New South Wales, Australia. Each party submits to the non exclusive jurisdiction of the courts of New South Wales.

**Notices.** Notices to us go to info@bgentic.io. Notices to you go to the email address on your account. Email notices are taken to be received on the next business day after sending. We will provide a postal address for service on request.

**Assignment.** You may not assign this agreement without our written consent, not to be unreasonably withheld. We may assign it to a related entity, or in connection with a sale or restructure of our business, on notice to you.

**Subcontracting.** We may use subcontractors to deliver parts of the Services. We remain responsible for their performance.

**Force majeure.** Neither party is liable for a failure or delay caused by an event beyond its reasonable control, including natural disaster, fire, flood, pandemic, war, industrial action, government action, telecommunications or internet failure, cyber attack, or failure of a third party platform. This does not excuse an obligation to pay money already due.

**Relationship.** We are independent contractors. Nothing here creates a partnership, joint venture, employment or agency relationship.

**No waiver.** A failure or delay in exercising a right is not a waiver of it.

**Severability.** If a provision is unenforceable, it is read down or severed to the minimum extent necessary and the rest continues in force.

**Entire agreement.** These terms, the Privacy Policy, your Plan and any signed statement of work are the entire agreement, and replace all earlier discussions and representations.

## Schedule 1. Acceptable Use Policy

This schedule forms part of the agreement. Breaching it is a material breach and may result in immediate suspension or termination.

### Prohibited conduct

You must not use the Services to:

- break any law, or help anyone else break any law;
- send spam, chain messages, or any unsolicited commercial electronic message;
- contact anyone who has opted out, or anyone whose consent you cannot evidence;
- record a call without the consent required by law;
- impersonate any person or organisation, including us or the Platform Provider, or misrepresent your affiliation with anyone;
- publish or transmit content that is unlawful, defamatory, misleading, deceptive, threatening, harassing, or that vilifies or degrades a person or group;
- publish or transmit sexually explicit material, or any material that sexualises or exploits a child;
- infringe anyone's intellectual property, privacy, publicity or other rights;
- introduce malware, or attempt to gain unauthorised access to any system, account or data;
- probe, scan or penetration test the Platform, or attempt to disable, overburden or impair it;
- reverse engineer, decompile or attempt to derive the source code or underlying structure of the Platform;
- use bots, scrapers or automated means to extract data from the Platform beyond documented API use;
- resell, sublicense or make the Platform available to any third party without our written consent;
- use the Services to build, benchmark or market a competing product;
- generate fake reviews, fake testimonials, astroturfing or other deceptive social proof;
- run disinformation campaigns, or present AI output as human generated.

### Restricted industries and activities

The Services may not be used for, or on behalf of, the following without our prior written consent:

- gambling, wagering and online casinos;
- payday lending, high cost short term credit and debt collection;
- cryptocurrency mining, token sales and speculative digital asset promotion;
- multi level marketing, pyramid schemes, matrix schemes and business opportunity schemes;
- adult content and adult services;
- weapons, ammunition and explosives;
- tobacco, vaping and illicit substances;
- unlicensed financial, credit, legal, migration or medical advice;
- automated determinations of eligibility for credit, employment, education, insurance or public assistance;
- political campaigning or lobbying that breaches electoral law;
- law enforcement, criminal justice, military, warfare or weapons development applications;
- operation of critical infrastructure in energy, transport or water;
- any activity requiring a licence you do not hold.

### Data handling rules

- Do not store government identifiers in the Platform. This includes driver licence numbers, passport numbers, Medicare numbers and tax file numbers. These identifiers create serious harm risk in a data breach and are not needed for CRM functions.
- Do not store full payment card numbers, CVVs or bank account credentials in CRM fields, notes or custom fields. Use the payment integration.
- Do not store health information or other sensitive information as defined in the Privacy Act unless you have obtained express consent and have told us in writing.
- Do not upload a contact list you cannot evidence consent for.

### Advertising restrictions

Advertising platforms restrict or prohibit a much wider set of categories than this Schedule. We may decline to advertise, or may stop advertising, in any category a platform restricts, including health and medical claims, weight loss and body image, cosmetic procedures, financial products and credit, employment, housing and credit opportunity advertising, alcohol, dating, political and social issue advertising, and supplements.

You must not ask us to advertise, and must not run advertising through accounts we manage that involves:

- claims you cannot substantiate on request;
- before and after imagery or testimonials that do not meet the requirements applying to your industry;
- pricing, discount or savings claims that are not genuine;
- imagery, footage, music or likenesses you do not hold rights to;
- targeting that discriminates on a protected attribute where the platform or the law prohibits it;
- any attempt to circumvent a platform's review process, including cloaking, redirecting after approval, or running ads from a new account after a ban.

### Fair use

Where a Plan is described as including unlimited use of a feature, that is subject to fair use. If your usage is excessive, abusive, or materially affects performance for other users, we may throttle, suspend or require you to move to a higher Plan. We will talk to you before we do.

### Reporting

Report suspected misuse or a security vulnerability to info@bgentic.io. Please do not conduct unauthorised security testing against the Platform.

## Schedule 2. Data Processing Terms

This schedule forms part of the agreement and applies whenever we handle Contact Data on your behalf.

### 1. Roles

In relation to Contact Data, you decide what personal information is collected, why, and how it is used. You are the entity responsible for it under the Privacy Act. We handle it only on your behalf and on your instructions.

In relation to your own account and billing information, we act on our own behalf, and our [Privacy Policy](/privacy) applies.

### 2. Our undertakings

We will:

- process Contact Data only to provide the Services, to comply with your reasonable written instructions, or as required by law;
- not sell Contact Data, and not use it for our own marketing purposes;
- not use Contact Data to train generalised or publicly available AI models;
- take reasonable technical and organisational steps to protect it, including access controls, encryption in transit, multi factor authentication on administrative accounts, and role based access limited to personnel who need it;
- ensure our personnel are bound by confidentiality obligations;
- assist you, at your cost for anything beyond routine assistance, to respond to requests from individuals to access or correct their personal information;
- on termination, make Contact Data available for export for 30 days and then delete or de identify it, except where we must retain it by law.

### 3. Your undertakings

You warrant that you have collected Contact Data lawfully, given the privacy notices required by APP 5, obtained any consents required, and are entitled to give it to us and to have it processed as contemplated by this agreement. You are responsible for responding to access, correction and complaint requests from individuals in your database.

### 4. Subprocessors

We use the following categories of subprocessor to deliver the Services. Locations shown are where the data may be processed or stored.

| Purpose | Provider | Location |
| Core platform, CRM, messaging, telephony, website hosting | Platform infrastructure provider | United States, India |
| Payment processing | Stripe | United States, Australia |
| Email, document storage and internal collaboration | Microsoft 365 | Australia, United States |
| AI features and content generation | Anthropic (Claude), OpenAI (ChatGPT) | United States |
| Advertising and lead integrations, where you enable them | Meta, Google | United States |
| Accounting and invoicing | Xero | Australia, New Zealand |

We may add or change subprocessors. Where a change is material we will update this schedule and, where it materially affects the handling of your Contact Data, notify you by email.

### 5. Overseas disclosure

Contact Data will be stored and processed outside Australia, principally in the United States and India. By using the Services you acknowledge and consent to that disclosure. You should reflect this in your own privacy policy so your customers are properly informed. We take reasonable steps to ensure overseas recipients handle personal information consistently with the Australian Privacy Principles, but you acknowledge that overseas providers may be subject to lawful access requests under their own laws.

### 6. Data breaches

If we become aware of unauthorised access to, unauthorised disclosure of, or loss of Contact Data held in your account, we will notify you without undue delay and in any event within 72 hours of becoming aware, and give you the information reasonably available to us about what happened, what data is involved, and what we are doing about it.

You are responsible for assessing whether the incident is an eligible data breach under the Notifiable Data Breaches scheme in Part IIIC of the Privacy Act, for notifying the Office of the Australian Information Commissioner and affected individuals within the required timeframes, and for the cost of doing so. We will cooperate reasonably with your assessment and response.

You must tell us promptly if you become aware of a breach affecting your account.

### 7. Retention

We retain Contact Data for as long as your account is active, then for the 30 day export window, after which it is deleted or de identified. We retain financial and transaction records for 7 years as required by the Corporations Act 2001 (Cth) and taxation law.
`,
  closing: [
    "Bgentic Pty Ltd",
    "ACN 699 335 754. ABN 27 699 335 754.",
    "Sydney, New South Wales, Australia",
    "info@bgentic.io . 0422 246 085",
    "Terms of Service version 1.0. Effective 11 August 2026.",
  ],
  seeAlso: { label: "Privacy Policy", href: "/privacy" },
}

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  description:
    "How Bgentic Pty Ltd handles personal information, in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.",
  intro:
    "Bgentic Pty Ltd ACN 699 335 754, ABN 27 699 335 754, respects your privacy. This policy explains how we handle personal information, and we handle it in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.",
  version: "Version 1.0. Effective 11 August 2026.",
  body: `
## 01. About this policy

In this policy, "Bgentic", "we", "us" and "our" means Bgentic Pty Ltd. "Personal information" has the meaning given in the Privacy Act: information or an opinion about an identified individual, or an individual who is reasonably identifiable.

This policy applies to personal information we collect through our website, when you enquire about or subscribe to our services, when you communicate with us, and when we deliver our services.

We have chosen to comply with the Australian Privacy Principles in full, including where the Privacy Act might otherwise exempt a business of our size. We think that is the right standard for a business that handles customer databases on behalf of others.

## 02. Our two roles, and which one applies to you

It matters which of these describes your relationship with us, because it determines whose privacy policy governs your information.

### If you are our client, or an enquirer

We collect and handle your information for our own purposes, and this policy applies to you. That covers your enquiry, your account, your billing, and our communications with you.

### If you are a customer of one of our clients

Our clients use our platform to run their own businesses, including to store their customer records, send messages and book appointments. When your information sits in a client's account, we handle it on their behalf and on their instructions, and their privacy policy applies to it, not this one.

> **What to do:** If you want to access, correct or delete information held by a business that uses our platform, please contact that business directly. They control it and they can action your request. If you contact us instead, we will forward your request to them and let you know we have done so.

## 03. What personal information we collect

**From clients and enquirers:**

- name, business name, job title, email address, phone number, business address;
- ABN or ACN, and other business registration details;
- billing and payment information. We do not store full card numbers. Card details are captured and held by our payment provider;
- account credentials and access logs for the platform;
- records of our communications with you, including emails, form submissions, support requests, meeting notes and, where you have been told, call recordings;
- information about your business needed to set up and run your account, such as services offered, operating hours and existing systems.

**From website visitors:** IP address, device and browser type, pages viewed, referring page, time and date of visit, and information collected by cookies (section 9).

**Sensitive information.** We do not seek sensitive information as defined in the Privacy Act, which includes health information, biometric information, and information about race, religion, political opinions, sexual orientation or criminal record. Please do not send it to us. If you do, we will only use it for the purpose you gave it and will delete it when it is no longer needed.

**Government identifiers.** We do not collect or store driver licence numbers, passport numbers, Medicare numbers or tax file numbers, and we instruct our clients not to store them on the platform either.

**Anonymity.** You can deal with us anonymously or under a pseudonym for general enquiries. We will need to identify you to provide services, manage an account or take payment.

## 04. How we collect it

We collect personal information directly from you wherever we reasonably can, including when you complete a form on our website, book a call, email or phone us, sign up for a trial, subscribe to a plan, or use the platform.

We also collect it automatically when you visit our website, and from third parties such as our payment provider, our platform provider, publicly available business registers, and referral partners who introduce you to us.

## 05. Why we use it

We use personal information to:

- respond to your enquiry and prepare a proposal;
- set up, configure, deliver, support and manage your account and services;
- process payments, issue invoices and recover amounts owing;
- communicate with you about your account, including service notices, security alerts, billing and changes to our terms;
- provide support, including through our AI assistant;
- improve, secure and troubleshoot our services;
- send you marketing about our own services, where you have not opted out (section 14);
- meet our legal, tax, accounting and regulatory obligations;
- protect our legal rights, and detect and prevent fraud or misuse.

We will only use your personal information for a secondary purpose where you would reasonably expect it, where you have consented, or where the law permits or requires it.

## 06. Call recording

We may record phone calls with clients and enquirers for quality, training, accuracy of records and dispute resolution.

Where we record a call, we will tell you at the start of the call, before any substantive discussion, and you can ask us not to record it or end the call. If you ask us not to record, we will not record. We do not record calls covertly.

Recordings are stored securely, access is limited to staff who need it, and they are deleted in accordance with section 12. We comply with the Surveillance Devices Act 2007 (NSW) and the Telecommunications (Interception and Access) Act 1979 (Cth).

> **If you are a client:** Where our platform records calls for your business, you are responsible for the announcement, the consent and the handling of those recordings. Those recordings are yours, not ours, and your own privacy policy governs them. See [clause 12 of our Terms of Service](/terms#s-12).

## 07. AI processing

We use AI tools to help deliver and support our services, including drafting content, summarising communications, powering chat and voice assistants and helping to configure automations.

**Our position on AI and your information:**

- we do not permit our AI providers to use your personal information to train generalised or publicly available AI models;
- we do not input sensitive information or government identifiers into AI tools;
- we review AI generated output before we rely on it or send it to you;
- where you interact with an AI assistant of ours, we tell you that it is an AI system;
- we do not use AI to make automated decisions with legal or similarly significant effects about you without human review.

Our AI providers are listed in section 8 and are located in the United States.

## 08. Who we share it with

We do not sell personal information. We disclose it only as set out below.

| Who | Why | Where |
| Platform infrastructure provider | Core platform: CRM, automation, messaging, telephony, website hosting | United States, India |
| Stripe | Payment processing and subscription billing | United States, Australia |
| Microsoft 365 | Email, calendars, document storage, internal collaboration | Australia, United States |
| Anthropic (Claude), OpenAI (ChatGPT) | AI assistance, content generation, summarisation | United States |
| Xero | Accounting, invoicing and financial records | Australia, New Zealand |
| Meta, Google | Advertising and lead integrations, where enabled | United States |

We may also disclose personal information:

- where you consent or ask us to;
- where required or authorised by law, including in response to a subpoena, court order, or a request from a regulator or law enforcement agency;
- to establish, exercise or defend a legal claim;
- to a purchaser or successor in connection with a sale, merger or restructure of our business, subject to equivalent privacy protections.

We require our service providers to protect personal information and to use it only for the purpose we engaged them for.

## 09. Cookies and website analytics

Our website uses cookies and similar technologies. Cookies are small files stored on your device.

- Essential cookies make the site work, including session management, security and form submission. These cannot be turned off.
- Analytics cookies help us understand which pages are visited and how the site performs, so we can improve it. This information is aggregated and does not identify you personally.
- Functional cookies remember your preferences.

You can block or delete cookies through your browser settings. If you block essential cookies, parts of the site may not work.

Our website does not respond to browser "Do Not Track" signals, because there is no agreed standard for how to interpret them.

## 10. Overseas disclosure

Personal information we hold is stored and processed outside Australia. The principal locations are the United States and India, and, for some services, New Zealand. This is because the platform and tools we use to deliver our services are provided by overseas companies. The specific recipients and their locations are in the table in section 8.

Before disclosing personal information overseas, we take reasonable steps to ensure the recipient handles it consistently with the Australian Privacy Principles, including by selecting established providers with published privacy and security commitments and contractual protections.

## 11. How we keep it secure

We take reasonable steps to protect personal information from misuse, interference, loss, and unauthorised access, modification or disclosure, including:

- encryption of data in transit;
- multi factor authentication on administrative accounts;
- role based access, so staff only access what they need;
- confidentiality obligations on all personnel and contractors;
- selecting service providers with recognised security practices;
- prompt destruction or de identification of information we no longer need.

No system can be completely secure. If you believe your account has been compromised, contact us immediately at info@bgentic.io or 0422 246 085.

## 12. How long we keep it

| Information | Retention period |
| Enquiries that do not become clients | 24 months from last contact |
| Client account and contact records | Duration of the relationship, then 90 days |
| Client data held on the platform | Available for export for 30 days after the account closes, then deleted or de identified |
| Call recordings | 12 months, unless needed for an ongoing dispute |
| Financial and tax records | 7 years, as required by the Corporations Act and taxation law |
| Records relating to a dispute or legal claim | Until the matter is resolved and any limitation period has expired |

Where we no longer need personal information and are not required to keep it, we destroy it or de identify it.

## 13. Access and correction

You can ask us for a copy of the personal information we hold about you, and ask us to correct it if it is wrong, out of date, incomplete or misleading. Email info@bgentic.io.

We will ask you to verify your identity, and will respond within 30 days. We do not charge for making a request. We may charge a reasonable cost based fee for providing access where a request is complex or repeated, and we will tell you before we do.

In limited circumstances we may refuse access or correction, for example where it would unreasonably affect another person's privacy, where the information relates to a legal dispute, or where the law allows us to. If we refuse, we will tell you in writing why, and how you can complain.

Where the information sits in a client's platform account, please contact that client, as described in section 2.

## 14. Marketing and how to opt out

We may send you marketing about our own services by email or SMS where you have given us your details or consented, and always in accordance with the Spam Act 2003 (Cth).

Every marketing message includes an unsubscribe link. You can also email info@bgentic.io at any time and we will remove you. We action opt outs promptly and in any case within 5 business days.

Even if you opt out of marketing, we will still send you service messages about your account, such as billing notices, security alerts and changes to our terms. Those are not marketing and cannot be opted out of while you hold an account.

We do not disclose your contact details to third parties for their own direct marketing purposes.

## 15. Data breaches

We maintain a data breach response plan. If we become aware of unauthorised access to, unauthorised disclosure of, or loss of personal information we hold, we will contain it, assess it promptly, and take steps to reduce the risk of harm.

Where a breach is likely to result in serious harm, we will notify the affected individuals and the Office of the Australian Information Commissioner as required by the Notifiable Data Breaches scheme in Part IIIC of the Privacy Act.

Where a breach affects personal information held in a client's account, we will notify that client without undue delay and in any event within 72 hours of becoming aware, and support their own assessment and notification obligations.

## 16. Children

Our services are for businesses. We do not knowingly collect personal information from anyone under 16. If you believe we have, contact us and we will delete it.

## 17. Making a complaint

If you think we have breached the Australian Privacy Principles or mishandled your personal information, please tell us. We take complaints seriously and want the chance to fix it.

1. **Contact our Privacy Officer.** Bayan Jahani, info@bgentic.io or 0422 246 085. Please describe what happened and what outcome you are seeking.
2. We will acknowledge your complaint within 5 business days and investigate it.
3. We will respond in writing within 30 days with our findings and what we propose to do. If we need longer, we will tell you why and when to expect a response.

If you are not satisfied with our response, you can complain to the Office of the Australian Information Commissioner:

- **Website:** [www.oaic.gov.au](https://www.oaic.gov.au)
- **Phone:** 1300 363 992
- **Post:** GPO Box 5288, Sydney NSW 2001

## 18. Changes to this policy

We may update this policy from time to time. The current version and effective date are shown at the top of this page.

If we make a change that materially affects how we handle your personal information, we will notify clients by email before it takes effect. Otherwise, changes take effect when published. Please check back occasionally.

## 19. Contact us

For any privacy question, request or complaint:

- **Privacy Officer:** Bayan Jahani
- **Email:** info@bgentic.io
- **Phone:** 0422 246 085
- **Postal address:** available on request by emailing us
`,
  closing: [
    "Bgentic Pty Ltd",
    "ACN 699 335 754. ABN 27 699 335 754.",
    "Sydney, New South Wales, Australia",
    "info@bgentic.io, 0422 246 085",
    "Privacy Policy version 1.0. Effective 11 August 2026.",
  ],
  seeAlso: { label: "Terms of Service", href: "/terms" },
}
