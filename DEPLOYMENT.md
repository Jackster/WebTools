# Deployment Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
```
Visit `http://localhost:4321` to view the site

### 3. Production Build
```bash
npm run build
```
Output is generated in `dist/` directory

### 4. Preview Production Build
```bash
npm run preview
```

## Cloudflare Pages Deployment

### Option A: Git Integration (Recommended)

1. **Push to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create Cloudflare Pages Project**
   - Go to https://dash.cloudflare.com/
   - Navigate to Workers & Pages > Create Application > Pages
   - Connect your Git repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
   - Click "Save and Deploy"

### Option B: Manual Deploy with Wrangler

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy dist
```

## Cloudflare Configuration

The following files configure Cloudflare Pages behavior:

- `wrangler.toml` - Build settings
- `_headers` - Security headers

## Custom Domain Setup

After deployment:
1. Go to your project in Cloudflare Dashboard
2. Navigate to "Custom Domains"
3. Add your domain
4. Update DNS records as instructed by Cloudflare

## Adding New Tools

1. Add screenshot to `public/images/tools/` (SVG format recommended)
2. Edit `src/data/tools.ts`:
   ```typescript
   {
     id: 'tool-id',
     title: 'Tool Name',
     description: 'Description',
     screenshot: '/images/tools/tool-screenshot.svg',
     url: '/tools/tool-url',
     tags: ['tag1', 'tag2'],
   }
   ```
3. Rebuild: `npm run build`

## Troubleshooting

### Build fails
- Ensure Node.js 18+ is installed: `node --version`
- Clear cache: `rm -rf node_modules && npm install`

### Images not loading
- Check file paths in `src/data/tools.ts`
- Ensure images are in `public/images/tools/`

### Search not working
- Check browser console for errors
- Ensure Fuse.js is installed: `npm list fuse.js`
