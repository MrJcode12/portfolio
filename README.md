# Portfolio MERN Stack

Complete migration of vanilla HTML/CSS/JS portfolio to React + TypeScript frontend with MERN-ready backend.

## Project Structure

```
portfolio-mern/
├── client/                 # React + TypeScript frontend (Vite)
│   ├── public/
│   │   └── resources/     # Assets (images, resume)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files (unchanged)
│   │   ├── App.tsx        # Main app with routing
│   │   └── main.tsx       # Entry point
│   └── package.json
├── server/                # Node.js + Express backend
│   ├── src/
│   │   ├── config/        # MongoDB config
│   │   ├── models/        # Mongoose models (scaffold)
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route controllers
│   │   └── server.ts      # Express server
│   └── package.json
├── package.json           # Root package.json for concurrent dev
└── README.md
```

## Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB (optional - only if you want to use backend features)

## Installation

### 1. Install all dependencies (from root)

```bash
npm install
```

This will install dependencies for both client and server.

### 2. Set up environment variables

**Server (.env in server/):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development

# Optional: for email functionality
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=jpgabarda@up.edu.ph
```

**Client (.env in client/):**
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode (Concurrent)

Run both client and server simultaneously:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Run Client Only

```bash
npm run client
```

### Run Server Only

```bash
npm run server
```

### Production Build

```bash
# Build frontend
npm run build:client

# Build backend
npm run build:server

# Build both
npm run build
```

## Migration Checklist

### Files Migrated

| Original File | New Location | Notes |
|--------------|--------------|-------|
| `index.html` | `client/src/pages/Home.tsx` | Split into components |
| `Blog/Blog.html` | `client/src/pages/Blog.tsx` | Converted to React component |
| `styles.css` | `client/src/styles/styles.css` | Unchanged, imported in components |
| `Blog.css` | `client/src/styles/Blog.css` | Unchanged, imported in Blog page |
| `script.js` | Various `*.tsx` components | Logic distributed to React hooks |
| `resources/` | `client/public/resources/` | Assets moved to public folder |

### Logic Migration Map

| Original Logic | New Location | Implementation |
|---------------|--------------|----------------|
| Hamburger menu toggle | `Navbar.tsx` | useState hook |
| Mobile overlay | `MobileOverlay.tsx` | useState + props |
| Smooth scrolling | `Navbar.tsx`, `MobileOverlay.tsx` | Event handlers with scrollTo |
| Typing animation | `Hero.tsx` | useEffect hook with intervals |
| Skills section animations | `Skills.tsx` | IntersectionObserver in useEffect |
| Projects scroll | `Projects.tsx` | useRef + mouse event handlers |
| Profile image swap | `Hero.tsx` | Mouse event handlers |
| Active nav highlighting | `Navbar.tsx` | useEffect with scroll listener |

## Parity Verification Checklist

Test these to confirm behavior/design is unchanged:

### Visual/Layout
- [ ] All sections render in correct order
- [ ] Spacing, margins, padding identical
- [ ] Typography (fonts, sizes, weights) unchanged
- [ ] Colors match exactly
- [ ] Responsive breakpoints work the same
- [ ] Animations run at same speed/timing

### Navigation
- [ ] Hamburger menu opens/closes smoothly
- [ ] Mobile overlay animates correctly
- [ ] Clicking nav links scrolls to sections
- [ ] Active section highlighting works
- [ ] Escape key closes mobile menu
- [ ] Clicking overlay background closes menu

### Hero Section
- [ ] Typing animation cycles through phrases
- [ ] Profile image swaps on hover (shy.png)
- [ ] Profile container hover animation works
- [ ] Buttons have correct hover states

### Skills Section
- [ ] Fade-in animation triggers on scroll
- [ ] Title and subtitle animate in sequence
- [ ] Skill categories animate with delay
- [ ] Hover states on skill items work
- [ ] Resume download button functions

### Projects Section
- [ ] Horizontal scroll works (mouse drag)
- [ ] Scroll buttons appear/disappear correctly
- [ ] Project cards fade in on scroll
- [ ] Hover overlays show correctly
- [ ] Project links work

### Contact Section
- [ ] Email link opens mail client
- [ ] Social links open in new tabs
- [ ] Hover animations work
- [ ] Footer copyright displays

### Blog Page
- [ ] Accessible via navigation
- [ ] Back link returns to portfolio
- [ ] All content renders correctly
- [ ] Typography and spacing match
- [ ] Responsive design works

### Performance
- [ ] Page loads quickly
- [ ] Animations are smooth (60fps)
- [ ] No console errors
- [ ] Images load properly

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router DOM** - Client-side routing

### Backend (Scaffold)
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB/Mongoose** - Database (optional)
- **Nodemailer** - Email (optional)
- **Cors** - Cross-origin requests
- **dotenv** - Environment variables

## API Endpoints (Scaffold)

Even though the current portfolio doesn't have a contact form, the backend includes a scaffold for future use:

### POST /api/contact
Submit contact form (for future use)

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message received"
}
```

## Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build:client`
2. Deploy `client/dist` folder
3. Set environment variable: `VITE_API_URL`

### Backend (Heroku/Railway/Render)
1. Build: `npm run build:server`
2. Deploy `server/dist` folder
3. Set all environment variables
4. Ensure MongoDB is accessible

## Notes

- All original CSS is preserved unchanged
- Class names remain identical for pixel-perfect parity
- No new features added - pure migration
- Backend is scaffold-ready but optional for current features
- TypeScript strict mode enabled
