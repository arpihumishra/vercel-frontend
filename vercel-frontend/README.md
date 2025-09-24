# Notes App - Frontend

A minimal React frontend for the Notes API with user authentication and note management.

## Features

- 🔐 **User Authentication**: Login with predefined accounts
- 📝 **Notes Management**: Create, list, and delete notes
- 💎 **Upgrade to Pro**: Shows upgrade modal when free users reach note limits
- 📱 **Responsive Design**: Works on desktop and mobile
- ⚡ **Fast & Modern**: Built with Vite and Tailwind CSS

## Tech Stack

- **React 19** - Frontend framework
- **Tailwind CSS** (CDN) - Styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Heroicons** - Beautiful icons
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites
- Node.js 16+ 
- Backend API running on `http://localhost:3000`

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5174](http://localhost:5174) in your browser

## Deployment on Vercel

### Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

### GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push to main

## API Configuration

The app is configured to connect to the backend API at `http://localhost:3000/api`. 

For production, update the `API_BASE_URL` in `src/services/api.js` to your deployed backend URL.

## Predefined Test Accounts

Use these accounts to test the application:

- **Free User**: 
  - Email: `free@example.com`
  - Password: `password123`

- **Pro User**:
  - Email: `pro@example.com` 
  - Password: `password123`

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── Login.jsx          # Login page
│   ├── Register.jsx       # Registration page  
│   ├── Dashboard.jsx      # Main dashboard
│   ├── Notes.jsx          # Notes management
│   ├── UpgradeModal.jsx   # Upgrade to Pro modal
│   └── ProtectedRoute.jsx # Route protection
├── contexts/
│   └── AuthContext.jsx    # Authentication context
├── hooks/
│   └── useAuth.js         # Authentication hook
├── services/
│   ├── api.js             # HTTP client configuration
│   ├── authService.js     # Authentication API calls
│   └── notesService.js    # Notes API calls
└── main.jsx               # App entry point
```

## Environment Variables

No environment variables needed - the app uses:
- Tailwind CSS via CDN
- Predefined API base URL
- Local storage for authentication

## Build for Production

```bash
npm run build
```

This creates a `dist` folder with the production build ready for deployment.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
