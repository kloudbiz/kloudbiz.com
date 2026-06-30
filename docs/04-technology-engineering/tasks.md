# Technology & Engineering — Strategy & Task List

## Goal: Maintain a fast, reliable platform and efficient delivery toolchain

---

### Website Platform

- [ ] Confirm kloudbiz.com scores 90+ on Google PageSpeed Insights (mobile and desktop)
- [ ] Verify GitHub Pages deployment pipeline is working and deploys within 60 seconds of push
- [ ] Add a robots.txt and sitemap.xml to the site root for SEO
- [ ] Test all forms, CTA buttons, WhatsApp links, and reCAPTCHA on a real mobile device
- [ ] Check the site renders correctly on iOS Safari, Android Chrome, and desktop Firefox

### Client Delivery Stack

- [ ] Choose a preferred stack for client websites (e.g. static HTML/GitHub Pages, WordPress, Webflow, Framer)
- [ ] Document pros/cons and pricing for each client delivery option
- [ ] Set up a reusable starter template for client websites so new projects start in minutes, not hours
- [ ] Build or choose a standard domain + hosting setup you can provision quickly for clients

### Development Practices

- [ ] Use Git branches for all changes to kloudbiz.com — never commit directly to main
- [ ] Write a test checklist that runs before every deploy (forms, links, mobile layout, i18n)
- [ ] Keep all client project repos private on GitHub under a Kloudbiz organisation
- [ ] Document your development environment setup so you can reproduce it on a new machine

### Tooling & Automation

- [ ] Identify 3 repetitive tasks in client delivery that could be templated or scripted
- [ ] Set up a simple CI check (e.g. HTML validation or Lighthouse CI) on the main repo
- [ ] Explore no-code/low-code tools (Webflow, Framer, Softr) for faster client delivery when appropriate
- [ ] Keep dependencies minimal — every third-party script is a performance and security risk

### Monitoring

- [ ] Set up uptime monitoring for kloudbiz.com (use UptimeRobot free tier)
- [ ] Enable GitHub email alerts for failed Actions runs
- [ ] Review Google Search Console monthly for crawl errors or indexing issues
