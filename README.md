# Rack Engineering Assistant - React Chat Interface

Production-ready React chat interface powered by n8n AI Agent.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
npm run deploy
```

Or use the Vercel dashboard:
1. Import your GitHub repository
2. Vercel auto-detects Vite
3. Deploy

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

Or drag-and-drop the `dist` folder to Netlify dashboard.

## Configuration

### Update Webhook URL

Edit `src/App.tsx` line 10:

```typescript
webhookUrl: 'YOUR_WEBHOOK_URL_HERE'
```

### Customize Branding

Edit CSS variables in `src/App.css`:

```css
:root {
  --chat--color--primary: #0066cc;
  --chat--color--secondary: #00a896;
  --chat--window--width: 450px;
  --chat--window--height: 650px;
}
```

### Enable Fullscreen Mode

In `src/App.tsx`, change:

```typescript
mode: 'fullscreen'
```

## n8n Setup

1. Open your n8n workflow Chat Trigger node
2. Enable "Streaming response" mode
3. Add your domain to "Allowed Origins (CORS)":
   ```
   http://localhost:3000
   https://yourdomain.com
   ```
4. Activate the workflow

## Project Structure

```
react-chat/
├── src/
│   ├── App.tsx          # Main component with chat logic
│   ├── App.css          # Styling and theme variables
│   └── main.tsx         # React entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config
```

## Tech Stack

- React 18
- TypeScript
- Vite
- @n8n/chat
