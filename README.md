# Attendance Manager

A comprehensive web-based attendance management system for schools and colleges built with React, Vite, and Tailwind CSS.

## Features

### Core Features
- ✅ Student Registration & Management
- ✅ Secure Teacher/Admin Login
- ✅ Mark Attendance (Present, Absent, Late, Half-day, Leave)
- ✅ Date-wise Attendance Tracking
- ✅ Edit/Update & Delete Records

### Dashboard
- 📊 Real-time Attendance Summary
- 📈 Monthly Attendance Statistics
- 📉 Interactive Charts & Graphs
- 🎯 Class-wise Summary

### Reports & Export
- 📄 Daily, Weekly, Monthly Reports
- 📥 Download as PDF, Excel, CSV
- 👤 Student-wise Attendance Percentage
- 🎓 Class-wise Statistics

### Advanced Features
- 🔐 JWT Authentication
- 🔒 Role-based Access Control (Admin, Teacher, Student)
- 🔗 Multi-class Support
- 📧 Leave Application System
- 🚨 Attendance Threshold Alerts

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Export**: jsPDF, XLSX, PapaParse
- **HTTP**: Axios
- **Routing**: React Router v6

## Installation

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

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Project Structure

```
src/
├── components/        # Reusable components
├── pages/            # Page components
├── services/         # API services
├── store/            # Zustand stores
├── types/            # TypeScript types
├── utils/            # Utility functions
├── hooks/            # Custom React hooks
├── App.tsx           # Main App component
└── main.tsx          # Entry point
```

## Available Routes

- `/login` - Login page
- `/dashboard` - Main dashboard
- `/students` - Student management
- `/attendance` - Mark attendance
- `/reports` - Generate reports
- `/classes` - Manage classes (Admin only)
- `/users` - Manage users (Admin only)

## API Endpoints Expected

The application expects a backend API with the following endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance` - Get attendance records
- `GET /api/attendance/stats/:classId` - Get class stats
- `PUT /api/attendance/:id` - Update attendance
- `DELETE /api/attendance/:id` - Delete attendance

### Reports
- `GET /api/reports/daily` - Daily report
- `GET /api/reports/weekly` - Weekly report
- `GET /api/reports/monthly` - Monthly report
- `GET /api/reports/student/:id` - Student report

## Deployment on Vercel

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables
6. Click Deploy

The `vercel.json` configuration is already set up for proper routing.

## Default Demo Credentials

- **Admin**: admin@school.com / password123
- **Teacher**: teacher@school.com / password123
- **Student**: student@school.com / password123

## Future Enhancements

- 🔖 QR Code based attendance
- 🎯 Biometric support
- 👤 Face recognition integration
- 📱 SMS/Email notifications
- 📅 Leave management system
- 📊 Advanced analytics

## License

MIT License

## Support

For issues and feature requests, please create an issue in the repository.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
