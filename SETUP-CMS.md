# Marley & Co — Going live + the editing dashboard

Your site is now **content-driven**: all the changeable stuff lives in `content/*.json`, and there's an editing dashboard at `/admin`. To turn that dashboard on and put the site live, there's a **one-time ~20-minute setup** of two free accounts. After that, editing is just: go to `marleyandco.com.au/admin` → log in → change things → **Publish**.

Do this with me on a call and it's quick — but here's the full path.

---

## A. Preview it locally any time (no setup)
1. Open PowerShell in `C:\marleyandco-website`
2. Run: `node server.js`
3. Open `http://localhost:8080`
(Opening `index.html` by double-click won't load the content — it needs the little server. That's only for local previewing; the live site won't need it.)

---

## B. One-time setup to go live + enable editing

### Step 1 — GitHub (stores the website's files), free
1. Create an account at **github.com**
2. Click **New repository** → name it `marleyandco-website` → **Private** is fine → Create
3. On the repo page: **Add file → Upload files** → drag in **everything inside** `C:\marleyandco-website` (including the `assets`, `content`, `admin` folders) → **Commit**

### Step 2 — Netlify (hosts the site, runs the dashboard), free
1. Create an account at **netlify.com** → sign up **with GitHub** (easiest)
2. **Add new site → Import an existing project → GitHub →** pick `marleyandco-website`
3. Build settings: leave **build command blank**, **publish directory = `/`** → **Deploy**
4. You'll get a temporary address like `marleyandco.netlify.app` — the live new site 🎉

### Step 3 — Turn on the editing dashboard
1. In Netlify: **Site configuration → Identity → Enable Identity**
2. Under Identity → **Registration → set to “Invite only”**
3. Identity → **Services → enable Git Gateway**
4. Identity → **Invite users →** invite **joe@marleyandco.com.au**
5. Check that inbox → accept the invite → set a password
6. Go to **`<your-site>.netlify.app/admin`** → log in → you're in the dashboard

### Step 4 — Point your domain at it (the cutover)
> Do this once you're happy with the preview. **Email is unaffected** — we only change the website records, never the MX record.
1. In Netlify: **Domain settings → Add custom domain →** `marleyandco.com.au`
2. Netlify shows you the exact **A record** and **www** record values
3. Log in to **Crazy Domains → DNS for marleyandco.com.au** → set those two records (leave the **MX** record exactly as is)
4. Wait a few minutes–hours. `marleyandco.com.au` now serves the new site. (Reversible — restore the old records to roll back.)

### Step 5 — Enquiry emails
Netlify → **Forms** → you'll see the `enquiry` form once it gets a submission → set the **notification email** to `joe@marleyandco.com.au`.

---

## C. How you edit, from then on
1. Go to **marleyandco.com.au/admin** → log in
2. **Site text** — hero headline, contact details. **Projects** — add/edit a project, drag photos into the gallery. **Testimonials** — add quotes. **Collaborators** — add names/logos, set category.
3. Click **Publish**. Netlify rebuilds automatically; the live site updates in 1–2 minutes.

No code, ever. And any time you'd rather I just make a change, send it to me — both work.

---

## What's where (for reference)
- `index.html` — the site (reads the content files)
- `content/` — **the editable content** (settings, projects, testimonials, collaborators)
- `assets/` — images (`assets/uploads/` is where dashboard uploads land)
- `admin/` — the editing dashboard (Decap CMS)
- `server.js` — local preview only
