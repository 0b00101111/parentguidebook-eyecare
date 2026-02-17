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
   - **Root directory**: (leave default)
   - **Environment variables**: None needed. Set **Node.js version** to **18** or higher if available.
4. After the first deploy, add custom domain **eyecare.parentguidebook.org**.

### Reference

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node**: 18+

