## Plan: Update OPG role entry

Edit `src/data/experiences.ts` for the `opg-intern` entry only.

### 1. Title
Change `title` from "Electrical Engineering Intern" to:
**"Reliability Engineer (PEY) — Monitoring & Diagnostics"**

(Succinct, leads with the actual role, notes it's a Professional Experience Year, and names the team. Fits the style of other titles on the site like "Battery Pack Team Leader".)

### 2. Date
Change `date` from "May 2026 – August 2027 (Incoming)" to:
**"May 2026 – May 2027 (Incoming)"**

### 3. Tags
Replace the existing tags array with exactly:
`["AVEVA Predictive Analytics", "Seeq", "OSIsoft PI", "Databricks", "Python"]`

### 4. Short `description` (card blurb)
Rewrite to a single sentence matching the forward-looking, first-person tone used elsewhere. Something like:
> "Joining OPG's Monitoring & Diagnostics team for a 12-month PEY placement, working on equipment-health models and reliability analytics across the nuclear and hydro fleet."

### 5. `fullDescription` (detail page body)
Replace the current two-paragraph block with a rewritten version of the supplied content — same approximate length, conversational first-person, no resume-speak, ends with a "still early, page will grow" note. Draft:

> "I'm joining OPG's Monitoring & Diagnostics team for a 12-month reliability engineering placement (PEY). OPG is the largest nuclear generator in Canada, and the M&D team sits at the centre of keeping a fleet of equipment-health models running accurately across the company's nuclear and hydroelectric assets — basically catching problems in big rotating machines before they actually become problems.
>
> My work will span model maintenance and anomaly screening in AVEVA Predictive Analytics and Seeq, digging into signals to connect flagged anomalies back to operating context, and building reliability dashboards in Microsoft Power Platform. On the data side, I'll be developing pipelines in Databricks and Azure and writing Python tools to automate alert triage and data-refresh workflows so the team spends less time on plumbing.
>
> I'm early in the term and learning fast — I'll keep this page updated as the work develops and I get a clearer sense of what I'm actually contributing."

### Out of scope
No other entries, components, images, or styling change. Tag pill styling already comes from the shared `Badge` component, so no CSS work needed.
