# eyecare.parentguidebook.org

Bilingual (English/Chinese) static site for parents about child eye care.

## Local development

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal.

## Push to GitHub

The project is already a git repo with an initial commit. To put it on GitHub:

1. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new).
   - Repository name: e.g. `parentguidebook-eyecare` (or any name you prefer).
   - Choose **Private** or **Public**. Do **not** add a README, .gitignore, or license (this repo already has them).
   - Click **Create repository**.

2. **Add the remote and push** (replace `YOUR_USERNAME` and `REPO_NAME` with your GitHub username and repo name):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   git push -u origin main
   ```

3. **Connect to Cloudflare Pages** (see Deployment → Option B below) so every push deploys automatically.

## Build

```bash
npm run build
npm run preview
```

## Deployment (Cloudflare Pages)

### Option A: Deploy from this repo (one-time setup)

1. **Log in to Cloudflare** (one time):
   ```bash
   npx wrangler login
   ```
2. **Deploy**:
   ```bash
   npm run deploy
   ```
   This builds the site and uploads the `dist` folder to Cloudflare Pages. If the project doesn’t exist yet, Wrangler will prompt you to create it.

3. **Custom domain**: In the [Cloudflare dashboard](https://dash.cloudflare.com) → Pages → your project → **Custom domains**, add **eyecare.parentguidebook.org**.

### Option B: Auto-deploy from Git (GitHub/GitLab)

1. Push this repo to GitHub or GitLab.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Choose the repo and set:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Deploy command** (if required): `npx wrangler pages deploy dist --project-name=eyecare-parentguidebook`
   - **Root directory**: (leave default)
   - **Environment variables**: None needed. Set **Node.js version** to **18** or higher if available.
4. After the first deploy, add custom domain **eyecare.parentguidebook.org**.

### Option C: Worker connected to Git (Build + Deploy/Version command)

This repo includes **`wrangler.jsonc`** so the built `dist` folder is deployed as static assets. Use this if your project is a **Worker** with a separate deploy/version command.

1. **Build command**: `npm run build`
2. **Deploy command** (or **Version command**, whichever runs after the build): set to **`npm run deploy-worker`**.
   - This runs `wrangler versions upload` with **3 retries** and a 15s delay between attempts. Cloudflare’s API sometimes returns 504 Gateway Timeout on the asset upload; retrying usually succeeds.
   - If you prefer no retries, you can set the deploy command to `npx wrangler versions upload` instead.
3. Ensure the project **API token** has **Account → Workers** **Edit** and **User → User Details → Read**.
4. Redeploy. The Worker will serve the static site from the `dist` directory.

### Reference

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node**: 18+

