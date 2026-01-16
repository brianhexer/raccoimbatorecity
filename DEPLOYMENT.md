# Hostinger Deployment Guide

This project is a static website (HTML/CSS/JS). You can deploy it to Hostinger in two ways:

## Option A — One‑click via GitHub Actions (Recommended)

1. Push this project to a GitHub repository.
2. In your repository, go to Settings → Secrets and variables → Actions → New repository secret and add:
   - `FTP_SERVER` → e.g. `ftp.yourdomain.com` (or server IP from hPanel)
   - `FTP_USERNAME` → your FTP username
   - `FTP_PASSWORD` → your FTP password
   - `FTP_DIR` → `/public_html/` (or a subfolder like `/public_html/site/`)
   - Optional: `FTP_PORT` (default 21), `FTP_PROTOCOL` (`ftp` or `ftps`)
3. The workflow file `.github/workflows/deploy-hostinger.yml` is already included. On every push to `main`/`master` or from Actions → "Deploy to Hostinger (FTP)" → Run workflow, your site is uploaded to Hostinger.
4. After deploy, purge cache in Hostinger hPanel → Advanced → Cache Manager if needed.

Notes:
- Service worker caching (sw.js) may hold old assets. Bump `VERSION` in sw.js on deploy or clear site storage in the browser for a hard reset.

## Option B — Manual upload via hPanel File Manager

1. Create a ZIP of the project root (exclude `.git/`, `node_modules/`, `.github/`).
2. hPanel → Files → File Manager → `public_html/` → Upload → select the ZIP → Extract.
3. Ensure `index.html` or `home.html` is accessible at your domain.

## Directory layout

- Upload to `public_html/` for your primary domain.
- Upload to `public_html/subfolder/` for a subpath (e.g. `yourdomain.com/subfolder`).

## Cache busting tips

- The Admin Dashboard already appends a query string to `admin-dashboard.js` to avoid stale caching.
- For global asset updates, bump `VERSION` in `sw.js` (and commit) so clients pick the new cache.

## Rollback

- You can re-run the Action with a previous commit (Actions → select run → Re-run with same ref), or manually upload a previous ZIP.
