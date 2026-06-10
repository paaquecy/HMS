# MediCare HMS — Super Admin Dashboard

A modern Hospital Management System Super Admin dashboard built with React, TypeScript, Tailwind CSS, and Recharts.

## Features

- **12 dashboard pages**: Dashboard, Total Patients, Total Doctors, Staff Management, Revenue Analytics, Bed Occupancy, User Roles & Permissions, Hospital Branches, System Settings, Audit Logs, Reports & Analytics, Backup & Security
- Collapsible sidebar navigation with active route highlighting
- Top navbar with search, notifications, admin profile, and dark mode toggle
- Reusable components: stat cards, charts, data tables, alert panels, widgets
- Responsive layout for desktop and tablet
- Glassmorphism card styling with healthcare blue/white/gray palette
- Dummy hospital data throughout

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (dark mode)
- Recharts
- React Router
- Lucide React icons

## Project Structure

```
src/
├── components/
│   ├── layout/     # Sidebar, Navbar, DashboardLayout, PageHeader
│   └── ui/         # StatCard, ChartCard, DataTable, AlertPanel, etc.
├── contexts/       # ThemeContext (dark mode)
├── data/           # Navigation config and dummy data
└── pages/          # All 12 dashboard pages
```
