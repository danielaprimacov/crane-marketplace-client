# KranHub - The Art Of Precision Lifting

**KranHub** is a specialized online platform for buying, selling, renting, transporting, installing, and dismantling construction cranes. It functions as a managed marketplace: a central Administrator (the crane‐service company) handles all customer interactions, while registered Users can list their own cranes for display.

---

## 📦 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running in Development](#running-in-development)
  - [Building for Production](#building-for-production)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Models](#api-models)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 👤 Regular User (Crane Owner)

- ✅ Register / log in
- ✅ Add, edit or delete **only** your own crane listings (photos, description, price, location)
- 🚫 Cannot see other users’ contact details or inquiries

### 🛠️ Administrator (Crane Service Company)

- ✅ Add / edit / delete **any** crane listing (including user-submitted)
- ✅ View, manage and respond to **all** inquiries
- ✅ Role‐based access control (RBAC)

### 🌍 Public Visitor (No Login)

- ✅ Browse full crane catalog
- ✅ Submit inquiry on any crane via a simple form
- 🚫 Cannot see owner contact details

---

## 💻 Tech Stack

- **Frontend**: React (v18+), React Router, Tailwind CSS, Framer Motion
- **State & Auth**: Context + JWT
- **Forms & Validation**: Controlled components, date‐pickers, custom modals
- **API Requests**: Axios
- **Icons**: @heroicons/react, custom SVGs
- **Styling**: Tailwind CSS, CSS modules for globals
- **Bundler**: Vite

---

## 🏗️ Getting Started

### Prerequisites

- Node.js ≥ v16
- npm or yarn

### Installation

```bash
# clone repo
git clone https://github.com/danielaprimacov/kranhub-client.git
cd kranhub-client

# install dependencies
npm install
# or
yarn
```

### Running in Development

```bash
# start dev server
npm run dev
# or
yarn dev
```

Open your browser at http://localhost:3000 (or the port shown in your console).

### Building for Production

```bash
npm run build
# or
yarn build
```

This will generate a dist/ folder ready for deployment (Netlify, Vercel, etc.).

## 🛠️ Environment Variables

Create a .env file at project root:

```bash
VITE_API_URL=https://api.yourdomain.com
```

- VITE_API_URL — the backend (Express/MongoDB) base URL.

## 📁 Project Structure

```bash
public/
  index.html
  favicon.ico
src/
  assets/                   # static images, fonts, videos
  components/               # reusable UI components
    AllProducers.jsx
    ContactForm.jsx
    CookieForm.jsx
    ExpertForm.jsx
    Footer.jsx
    HeroSection.jsx
    Modal.jsx
    NewsletterForm.jsx
    OurClients.jsx
    ProducersNav.jsx
    RangeDropDown.jsx
    …others…
  context/
    auth.context.jsx        # authentication state provider
  hooks/
    useProducers.js
  pages/                    # route components
    AboutPage.jsx
    CranesPage.jsx
    CraneDetailsPage.jsx
    HomePage.jsx
    LoginPage.jsx
    ProducerPage.jsx
    TermsPage.jsx
    PrivacyPolicyPage.jsx
    RevocationPage.jsx
    ImprintPage.jsx
    MessagesPage.jsx
    InquiriesListPage.jsx
    ProfilePage.jsx
    …others…
  utils/
    helpers.js              # slugify, date formatting, etc.
  App.jsx                   # root component with routes
  main.jsx                  # entry point
tailwind.config.js
vite.config.js
README.md
```

## 📦 API Models

On the [server](https://github.com/danielaprimacov/crane-marketplace-server) (not in this client repo) you will find corresponding Mongoose models:

1. User

```bash
{
  name: String,
  email: String,
  password: String, // hashed
  role: String      // "admin" | "user"
}

```

2. Crane

```bash
{
  title: String,
  images: [String],
  description: String,
  price: Number,
  location: String,
  status: "for sale" | "for rent",
  owner: ObjectId,
  availability: { from: Date, to: Date },
  capacity: Number,
  height: Number,
  radius: Number,
  variantRevision: String
}

```

3. Inquiry / Message

```bash
{
  formType: "contact" | "expert",
  // common
  email: String,
  phone?: String,
  // contact-specific
  salutation?: String,
  firstName?: String,
  lastName?: String,
  country?: String,
  message?: String,
  // expert-specific
  name?: String,
  company?: String,
  projectDetails?: String,
}

```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feat/YourFeature)
3. Commit your changes (git commit -m "feat: add your feature")
4. Push to the branch (git push origin feat/YourFeature)
5. Open a Pull Request and describe your changes
