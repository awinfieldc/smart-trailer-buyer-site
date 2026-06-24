# Analytics And Search Setup

The website is now prepared for analytics events and UTM source tracking. Account setup still has to happen in the provider dashboards.

## Recommended Analytics Path

Use Vercel Web Analytics first because the site is already deployed on Vercel and the product is privacy-focused.

What the site already includes:

- Vercel Analytics boot queue.
- Production-only Vercel script loader.
- Click events for:
  - `free_download_click`
  - `social_click`
  - `pdf_download_click`
- UTM-tagged checklist links.
- Dynamic UTM carry-through on `/links.html`.

Account steps:

1. Open the Vercel project for `smarttrailerbuyer.com`.
2. Go to Analytics.
3. Enable Web Analytics.
4. Deploy the updated site.
5. Visit the site in a normal browser window.
6. Confirm analytics receives page views.
7. Confirm checklist clicks appear as events if your plan supports custom events.

If Vercel gives a unique analytics script path in the dashboard, replace the script path in `analytics-loader.js` with the dashboard-provided path.

## UTM Links

Use these as public bio links:

- TikTok: `https://smarttrailerbuyer.com/links.html?utm_source=tiktok`
- Instagram: `https://smarttrailerbuyer.com/links.html?utm_source=instagram`
- YouTube: `https://smarttrailerbuyer.com/links.html?utm_source=youtube`

Use this for general website links:

- Website: `https://docs.google.com/forms/d/e/1FAIpQLSdH1wYYCZ9SqSf96cUZ6OXz_8ODyXU_800wetMPh14F6tSc_w/viewform?utm_source=website&utm_medium=site&utm_campaign=checklist`

## Search Console

After deployment:

1. Open Google Search Console.
2. Add `https://smarttrailerbuyer.com/` as a property.
3. Verify ownership using the method Google recommends for the domain or Vercel project.
4. Submit `https://smarttrailerbuyer.com/sitemap.xml`.
5. Inspect the home page URL and request indexing.

## Email Automation

Start manual if volume is tiny. Move to automation after there are real signups.

Good first tools:

- Google Forms plus manual replies.
- Google Apps Script if you want simple automatic delivery from the response sheet.
- ConvertKit, MailerLite, Beehiiv, or Mailchimp when you want tags, sequences, and better unsubscribe handling.

Minimum tags:

- `source:website`
- `source:youtube`
- `source:tiktok`
- `source:instagram`
- `interest:checklist`
- `interest:toolkit`
- `interest:audit`

Do not send bulk follow-up until unsubscribe handling and sender identity are clean.
