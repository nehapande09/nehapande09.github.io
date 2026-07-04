# nehapande09.github.io

Personal portfolio site — Neha Pande, Full Stack Engineer.

## Deploy to GitHub Pages

1. Create a new **public** repo on GitHub named exactly:
   ```
   nehapande09.github.io
   ```
2. From this folder, push it:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/nehapande09/nehapande09.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: main, folder: / (root) → Save**
4. Live in ~1 minute at `https://nehapande09.github.io`

## Structure

```
├── index.html
├── style.css
├── script.js
└── assets/
    ├── images/profile.jpg
    └── resume/Neha_Pande_Resume.pdf
```

## Adding a new project

Open `index.html`, find the `<!-- Placeholder slot -->` comment inside the
`.project-grid` in the Projects section, and replace that card's content —
title, description, tags, and a link to the repo. Duplicate the `<article
class="project-card">` block for additional projects.

## Updating your resume

Replace `assets/resume/Neha_Pande_Resume.pdf` with a new file of the **same
name** — no code changes needed.

## Theme

Dark theme is the default; the toggle in the top-right of the nav bar
switches to light and remembers the choice on return visits.
