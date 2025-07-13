# 🏨 UniHostel – Hostel Management System

UniHostel is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that manages university hostel meals and reviews. Students can log in, request meals, give feedback, and upgrade packages, while admins handle all operations efficiently.

🔗 **Live Site:** [https://unihostel.web.app](https://unihostel.web.app)  
🔒 **Admin Email:** `admin@unihostel.com`  
🔑 **Admin Password:** `Admin@1234`

---

## 🚀 Features at a Glance

- 🔐 Firebase authentication (Email/Password & Social Login)
- 🍽️ Add, view, and request hostel meals
- ⭐ Student reviews and meal likes
- 💬 Post & manage reviews with like counts
- 🛍️ Premium package checkout with Stripe
- 👤 Responsive user & admin dashboard
- 🔄 Persistent login and protected routes
- ⚙️ Admin panel to manage users, meals, and reviews
- 🗂️ MongoDB indexing + server-side pagination
- 📦 Upcoming meal management (admin only)
- ✅ SweetAlerts and Toast notifications

---

## 📄 Pages and Core Functionalities

### 1. 🏠 Home Page
- Responsive navbar with conditional login/logout/profile
- Hero banner with search field
- Meal categories (Breakfast, Lunch, Dinner, All) using tabs
- Membership section with 3 package tiers: Silver, Gold, Platinum
- Extra sections (e.g. benefits, testimonials)

### 2. 🍲 Meal Detail Page
- Meal info: image, ingredients, distributor, price
- Like & Review functionality (auth required)
- Meal Request button (Premium users only)

### 3. 🍛 Meals Page
- All meals with:
  - 🔍 Server-side search
  - 🔄 Infinite scroll (React Infinite Scroll Component)
  - 🎯 Filter by category & price range (server-side)

### 4. ⏳ Upcoming Meals
- Premium users can like upcoming meals (one like per meal)
- Admin can publish meals to main collection

### 5. 💳 Checkout Page
- Dynamic route: `/checkout/:package_name`
- Stripe integration with toast confirmation
- Assigns badge (Silver, Gold, Platinum)

### 6. 👥 Join Us Page
- Login/Register with `react-hook-form`
- Social login support
- New users get Bronze badge by default

---

## 👤 User Dashboard (Private Route)

- **My Profile:** Name, email, profile pic, badge
- **Requested Meals:** View/cancel requested meals
- **My Reviews:** Edit/delete/view reviews
- **Payment History:** List of all transactions

---

## 🛠️ Admin Dashboard (Admin Protected Route)

- **Admin Profile:** Name, email, total meals added
- **Manage Users:** Make admin, search users by name/email
- **Add Meal:** Form with image upload (ImageBB), category, ingredients
- **All Meals:** Sort by likes or review count (server-side)
- **All Reviews:** View and delete reviews
- **Serve Meals:** Serve pending meals, update status
- **Upcoming Meals:** Add, view, and publish upcoming meals

---

## 📦 Technologies Used

| Tech          | Purpose                             |
|---------------|-------------------------------------|
| React         | Frontend UI                         |
| React Router  | Routing                             |
| Firebase      | Authentication                     |
| Tailwind CSS  | Styling                             |
| Express.js    | Backend server                      |
| MongoDB       | Database                            |
| Stripe        | Payment integration                 |
| Axios         | HTTP requests                       |
| TanStack Query| Optimized data fetching (GET only)  |
| SweetAlert2   | Custom alerts/toasts                |
| JWT           | Secure API access & Axios interceptor|

---

## 🔐 Security and Best Practices

- ✅ Environment variables for Firebase & MongoDB
- ✅ `.env` files added to `.gitignore`
- ✅ Protected routes for user/admin
- ✅ JWT token handling and Axios interceptor
- ✅ Server-side filtering, searching, and sorting

---

## 📊 Bonus Challenges Completed

- ✅ MongoDB indexing for efficient meal search
- ✅ Publish upcoming meals after 10+ likes
- ✅ JWT token setup for login + Axios interceptor
- ✅ Pagination in dashboard tables (10 items per page)

---

## 📁 GitHub Repositories

- 🔗 **Client:** [GitHub Client Repo](https://github.com/your-username/unihostel-client)
- 🔗 **Server:** [GitHub Server Repo](https://github.com/your-username/unihostel-server)

---

> 🔄 Make sure to replace all placeholder links, credentials, and usernames with your actual deployment URLs and data.
