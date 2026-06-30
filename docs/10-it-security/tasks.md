# IT & Security — Strategy & Task List

## Goal: Protect Kloudbiz and client data with minimal overhead

---

### Account Security

- [ ] Enable two-factor authentication (2FA) on: GitHub, Google Workspace, Stripe, domain registrar, and all client accounts you manage
- [ ] Use a password manager (Bitwarden or 1Password) — no reused passwords
- [ ] Audit all business accounts quarterly and revoke access for unused services
- [ ] Never store passwords in spreadsheets, WhatsApp chats, or plain text files

### Cloud Infrastructure

- [ ] Confirm GitHub Pages is the sole hosting mechanism for kloudbiz.com
- [ ] Ensure all client site repos are private by default on GitHub
- [ ] Review GitHub repository permissions — only collaborators who need access should have it
- [ ] Confirm the GitHub Actions deployment workflow only copies whitelisted files (index.html, sw.js, public/)

### Data Protection

- [ ] Never store sensitive client data (bank details, passwords, personal info) in email or WhatsApp
- [ ] Use Google Drive with restricted sharing for client documents — not public links
- [ ] If handling client credentials (CMS logins, domain panels), store them only in your password manager
- [ ] Purge client data you no longer need — don't accumulate data you're not using

### Domain & DNS

- [ ] Confirm kloudbiz.com domain auto-renews with a payment method that won't expire
- [ ] Enable DNSSEC on the domain if supported by your registrar
- [ ] Set up SPF, DKIM, and DMARC DNS records for info@kloudbiz.com to prevent email spoofing
- [ ] Document all DNS records and store a copy outside the registrar panel

### Monitoring & Incident Response

- [ ] Set up uptime monitoring for kloudbiz.com (UptimeRobot free tier — alerts via email)
- [ ] Subscribe to GitHub security advisories for your repos
- [ ] Define a simple incident plan: if kloudbiz.com goes down, what are the first 3 steps?
- [ ] Test your backup and recovery process at least once — know how long it takes to restore

### Client Site Security

- [ ] For every client site you build, run a basic security checklist before handoff (HTTPS, no exposed credentials, updated dependencies)
- [ ] Recommend clients change all passwords after you complete work on their accounts
- [ ] Never reuse your own credentials for client systems
