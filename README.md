# ScholarStream - Client

A comprehensive scholarship management platform built with React, Tailwind CSS, and DaisyUI.

## 🌐 Live Demo

- **Client:** [https://scholarstreambd.web.app/](https://scholarstreambd.web.app/)
- **Server:** [https://scholarstream-server.vercel.app](https://scholarstream-server.vercel.app)

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@scholarstream.com | Admin@123 |
| Moderator | moderator@scholarstream.com | Moderator@123 |
| Student | student@scholarstream.com | Student@123 |

## ✨ Key Features

### 🎨 Design & UI
- **Light/Dark Mode** toggle with persistent preference
- **Responsive Design** for mobile, tablet, and desktop
- **Modern UI** with Tailwind CSS & DaisyUI
- **Framer Motion** animations throughout
- **Custom Theming** with Playfair Display & DM Sans fonts

### 🔐 Authentication
- Email/Password registration and login
- Google Sign-in integration
- Password validation (6+ chars, uppercase, special character)
- Demo login buttons for quick testing

### 📚 Scholarships
- Browse all scholarships with search, filter, sort, pagination
- Detailed scholarship pages with reviews
- Related scholarships recommendations
- Wishlist functionality
- 4 cards per row on desktop

### 💳 Payments
- Stripe integration for secure payments
- Payment success/failed pages with animations
- Confetti animation on successful payment

### 👥 Role-Based Dashboards

**Student:**
- My Profile (editable)
- My Applications (view, edit, delete, pay, review)
- My Reviews (edit, delete)

**Moderator:**
- Manage Applications (view, feedback, status update)
- All Reviews (moderate, delete)

**Admin:**
- Add Scholarship
- Manage Scholarships (edit, delete)
- Manage Users (change roles, delete)
- Analytics (charts, statistics)

## 🛠️ Tech Stack

- **React 18** with Vite
- **React Router 6** for routing
- **TanStack Query** for data fetching
- **React Hook Form** for forms
- **Tailwind CSS 4** with DaisyUI 5
- **Firebase** for authentication
- **Axios** for API calls
- **Framer Motion** for animations
- **Recharts** for charts
- **Stripe** for payments
- **SweetAlert2** for alerts
- **React Hot Toast** for notifications

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/scholarstream-client.git
cd scholarstream-client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PK=your_stripe_publishable_key
```

4. Start development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## 🚀 Deployment

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init hosting
```

4. Build and deploy:
```bash
npm run build
firebase deploy
```

## 📁 Project Structure

```
src/
├── components/
│   ├── home/           # Home page sections (Banner, Stats, etc.)
│   ├── scholarship/    # Scholarship related components
│   └── shared/         # Reusable components (Navbar, Footer, etc.)
├── firebase/           # Firebase configuration
├── hooks/              # Custom hooks (useAuth, useRole, etc.)
├── layouts/            # Layout components
├── pages/              # Page components
│   ├── auth/           # Login, Register
│   └── dashboard/      # Dashboard pages by role
├── providers/          # Context providers
└── routes/             # Router configuration
```

## 📝 NPM Packages Used

- `react`, `react-dom`
- `react-router-dom`
- `@tanstack/react-query`
- `react-hook-form`
- `axios`
- `firebase`
- `tailwindcss`, `daisyui`
- `framer-motion`
- `react-icons`
- `recharts`
- `@stripe/react-stripe-js`, `@stripe/stripe-js`
- `sweetalert2`
- `react-hot-toast`
- `react-helmet-async`
- `date-fns`
- `canvas-confetti`

## 🎯 Requirements Met

- ✅ 20+ meaningful commits
- ✅ Comprehensive README
- ✅ Secure Firebase config with environment variables
- ✅ Light/Dark mode
- ✅ Responsive design
- ✅ 10+ home sections
- ✅ 4 cards per row
- ✅ Search, filter, sort, pagination
- ✅ Role-based dashboard
- ✅ Stripe payment integration
- ✅ JWT authentication
- ✅ Charts and analytics

## 📄 License

MIT License

---

**Built with ❤️ for ScholarStream**
