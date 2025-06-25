# 💼 HR Dashboard (Advanced)

A modern, responsive HR Dashboard for managing employee performance, bookmarks, and analytics. Built with Next.js, React, Tailwind CSS, Zustand, and Chart.js.

---

## 🚀 Features

- **Dashboard Homepage**: View, search, and filter employees. Performance ratings, department, and quick actions.
- **Search & Filter**: Case-insensitive search and multi-select filter by department or rating.
- **Employee Details**: Dynamic profile page with tabbed UI (Overview, Projects, Feedback), performance history, and more.
- **Bookmark Manager**: List, remove, and manage bookmarked employees. UI actions for "Promote" and "Assign to Project".
- **Analytics**: Department-wise average ratings and bookmark trends (Chart.js).
- **Dark/Light Mode**: Toggle with smooth transitions.
- **State Management**: Zustand for bookmarks and context for theme.
- **Responsive & Accessible**: Works great on mobile and desktop, keyboard accessible.
- **Bonus**: (Optional) Authentication, Create User modal, Pagination, Animations.

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **React 18**
- **Tailwind CSS 3**
- **Zustand** (state management)
- **Chart.js** (analytics)
- **Lucide React** (icons)

---

## 📸 Screenshots

> Add your screenshots here after running the app!

---

## 🏁 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/hr-dashboard.git
cd hr-dashboard
```

### 2. **Install Dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Run the Development Server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## ⚙️ Project Structure

```
app/
  components/      # Reusable UI components
  context/         # Theme context (dark/light mode)
  employee/[id]/   # Dynamic employee details page
  hooks/           # Custom React hooks
  lib/             # Utility functions
  store/           # Zustand store for bookmarks
  page.js          # Dashboard homepage
  bookmarks/       # Bookmarks manager page
  analytics/       # Analytics page
  globals.css      # Tailwind and global styles
  layout.js        # App layout
```

---

## 🌟 Bonus Features

- **Authentication**: Add NextAuth.js or a mock login screen.
- **Create User**: Modal or page with form validation.
- **Pagination/Infinite Scroll**: For main user list.
- **Animations**: Tab/content transitions (Framer Motion or Tailwind).


---

## 🙌 Credits

- [DummyJSON](https://dummyjson.com/) for user data
- [Chart.js](https://www.chartjs.org/)
- [Lucide Icons](https://lucide.dev/)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)

---

## 💬 Questions?

Open an issue or reach out! 