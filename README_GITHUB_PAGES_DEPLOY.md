# HOUSE Kids VBS Dashboard, GitHub Pages Version

This folder contains the updated VBS dashboard configured for GitHub Pages.

## Files to copy into your repo

Copy everything in this folder into:

```bash
/Users/jake/Documents/GitHub/vbsdashboard
```

Replace existing files when asked.

The main updated files are:

```text
index.html
package.json
package-lock.json
vite.config.js
.github/workflows/deploy.yml
src/App.jsx
src/styles.css
src/useDashboardAutosave.js
src/firebase.js
src/main.jsx
.gitignore
.env.example
README_GITHUB_PAGES_DEPLOY.md
README_MANUAL_UPDATE.txt
```

## Local test

```bash
cd /Users/jake/Documents/GitHub/vbsdashboard
npm install
npm run build
npm run dev
```

## GitHub Pages setup

In GitHub, go to:

```text
Repo > Settings > Pages
```

Set:

```text
Source: GitHub Actions
```

## Firebase Actions secrets

In GitHub, go to:

```text
Repo > Settings > Secrets and variables > Actions > New repository secret
```

Add these secrets:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

The current firebase.js also includes fallback values for the existing VBS Firebase project, so the app can still build locally if the secrets are not present. The secrets are the cleaner setup for GitHub Pages.

## Deploy

```bash
cd /Users/jake/Documents/GitHub/vbsdashboard
git add .
git commit -m "Deploy VBS dashboard to GitHub Pages"
git push
```

When the GitHub Action finishes, your site should be available at:

```text
https://jakederosa123.github.io/vbsdashboard/
```

## Important note about vite.config.js

This project assumes the GitHub repository is named:

```text
vbsdashboard
```

If the repo name changes, update this line in vite.config.js:

```js
base: command === "build" ? "/vbsdashboard/" : "/",
```

For example, if the repo is named `house-vbs-dashboard`, change it to:

```js
base: command === "build" ? "/house-vbs-dashboard/" : "/",
```
