# HRMS Lite - Frontend

live link - [Live Demo](https://hrms-frontend-silk-tau.vercel.app/)

A modern HR Management System interface built with React.

## Features

- 📊 Dashboard with statistics
- 👥 Employee Management
- ✅ Attendance Tracking
- 🎨 Smooth animations
- 📱 Responsive design

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Axios** - API calls
- **Lucide React** - Icons

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

### 3. Run Dev Server

```bash
npm run dev
```

Visit: http://localhost:5173

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## Project Structure

```
src/
├── api/             # API configuration
├── components/      # Reusable components
│   ├── common/      # Loaders, modals, etc.
│   ├── layout/      # Sidebar, layout
│   ├── employees/   # Employee components
│   └── attendance/  # Attendance components
├── pages/           # Main pages
├── styles/          # CSS files
├── utils/           # Helper functions
├── App.jsx          # Main app
└── main.jsx         # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Pages

- **Dashboard** (`/`) - Overview and statistics
- **Employees** (`/employees`) - Manage employees
- **Attendance** (`/attendance`) - Track attendance

## Deployment
live link - [Live Demo](https://hrms-lite-frontend-pi.vercel.app/)

2. Upload `dist/` folder to Netlify
3. Configure SPA redirects
4. Done!

## License

MIT
