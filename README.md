# Tools Directory - Static Website

A static website showcasing useful tools, built with Astro and hosted on Cloudflare Pages.

## Features

- 📦 Static site generation with Astro.
- 🔍 Client-side search with Fuse.js
- 🎨 Responsive design
- ⚡ Fast load times
- 🚀 Cloudflare Pages deployment

## Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start local development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Build

```bash
# Build for production
npm run build
```

The static files will be generated in the `dist/` directory.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── ToolCard.tsx       # Individual tool card component
│   │   ├── ToolDirectory.tsx   # Main directory component with search
│   │   └── SearchBar.tsx      # Search input component
│   ├── data/
│   │   └── tools.ts           # Tool data and configuration
│   ├── pages/
│   │   └── index.astro       # Main page
│   └── styles/
│       └── global.css         # Global styles
├── public/
│   └── images/
│       └── tools/            # Tool screenshots (SVG format)
├── astro.config.mjs          # Astro configuration
├── wrangler.toml             # Cloudflare Pages config
└── package.json
```

## Adding New Tools

1. Create a screenshot image in `public/images/tools/` (SVG or PNG format)
2. Add tool entry to `src/data/tools.ts`:

```typescript
{
  id: 'unique-tool-id',
  title: 'Tool Name',
  description: 'Brief description of what the tool does.',
  screenshot: '/images/tools/tool-screenshot.svg',
  url: '/tools/tool-page',
  tags: ['tag1', 'tag2', 'tag3'],
}
```

3. Rebuild the site to see changes

## Search Configuration

Search is powered by [Fuse.js](https://fusejs.io/). Adjust search options in `src/components/ToolDirectory.tsx`:

```typescript
const fuseOptions = {
  keys: ['title', 'description', 'tags'],
  threshold: 0.3,  // Lower = more strict
  includeScore: true,
};
```

## Cloudflare Pages Deployment

### Option 1: Deploy via Cloudflare Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Go to **Workers & Pages** > **Create Application** > **Pages**
4. Connect your Git repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**

### Option 2: Deploy via Wrangler CLI

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist
```

### Environment Variables

The site doesn't require any environment variables by default.

### Custom Domain

After deployment:
1. Go to your project in Cloudflare Dashboard
2. Navigate to **Custom Domains**
3. Add your custom domain and follow the DNS instructions

## Screenshots

Screenshots are stored as SVG files in `public/images/tools/`. 

To create new screenshots:
- Take a screenshot of your tool (800x450px recommended)
- Save as SVG or PNG format
- Place in `public/images/tools/`
- Reference in your tool data

## Performance

- Static HTML generated at build time
- Minimal JavaScript for interactive features
- Client-side search (fast, no server requests)
- Optimized asset loading with lazy loading
- Cloudflare CDN for global distribution

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
