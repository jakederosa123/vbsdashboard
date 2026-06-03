# HOUSE Kids VBS Dashboard

This is the GitHub Pages version of the HOUSE Kids VBS Dashboard.

## Local setup

```bash
npm install
npm run dev
```

## Build test

```bash
npm run build
npm run preview
```

## GitHub Pages setup

1. Push this folder to the `main` branch of the `vbsdashboard` repo.
2. In GitHub, open `Settings > Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main`. The workflow in `.github/workflows/deploy.yml` will build and publish the site.

The expected public URL is:

```text
https://jakederosa123.github.io/vbsdashboard/
```

## Important

The Vite base path is currently set for a repo named `vbsdashboard`:

```js
base: command === "build" ? "/vbsdashboard/" : "/",
```

If the GitHub repo name changes, update `vite.config.js` so the base path matches the repo name.
