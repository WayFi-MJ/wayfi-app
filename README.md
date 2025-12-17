# Wayfi Admin Dashboard

Admin dashboard for managing the Wayfi Wireless DASHBOARD DB.

## Features

- 🔍 Quick search for Locations and NASIDs
- 📊 Performance graphs and analytics
- 📍 Location management
- 📡 Access Point management
- 📈 Real-time data visualization
- 🎨 Modern UI with shadcn/ui and Magic UI components
- 📱 Responsive sidebar navigation

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## UI Components

### shadcn/ui
This project uses [shadcn/ui](https://ui.shadcn.com/) for base components. To add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

### Magic UI
This project uses [Magic UI](https://magicui.design/) for animated components. Components are available from the `magicui` package and can be imported directly.

Example:
```tsx
import { AnimatedBeam } from 'magicui/animated-beam'
```

## Project Structure

```
├── app/
│   ├── dashboard/          # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components
│   └── Sidebar.tsx        # Sidebar navigation
├── lib/
│   ├── supabase/         # Supabase client utilities
│   └── utils.ts          # Utility functions
└── middleware.ts         # Next.js middleware (auth will be added later)
```

## Technologies

- Next.js 14 (App Router)
- TypeScript
- Supabase (Database)
- Tailwind CSS
- shadcn/ui (Component library)
- Magic UI (Animated components)
- Recharts (Graphs)
- Lucide React (Icons)
- Framer Motion (Animations)

## Authentication

Authentication will be added in a future update. Currently, all routes are accessible without authentication.

## Notes

- The sidebar navigation is responsive and includes active state highlighting
- All components use shadcn/ui styling system
- Magic UI components can be added for enhanced animations and interactions
