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

The project is structured around a clear separation of pages, reusable UI components, domain-specific components, API service modules, hooks, constants, and shared utilities.

The frontend no longer calls Axios directly from most page components. API communication is centralized in the `services/` layer through a shared `apiClient`, which attaches authentication headers and keeps request logic consistent across the app.

```txt
src/
  assets/
    animations/              # Lottie animations
    icons/                   # UI icons
    images/                  # Static images
    video/                   # Video assets

  components/
    cranes/
      cards/                 # Crane card components
      forms/                 # Crane create/edit form sections
      gallery/               # Crane gallery, thumbnails, zoom/full view
      AvailabilityRange.jsx
      Crane.jsx
      CraneDetailsPanel.jsx
      CraneGallery.jsx
      CraneManageButtons.jsx
      CraneSpecsGrid.jsx
      FullViewGalleryModal.jsx
      InquiryCard.jsx
      LastAddedCranes.jsx
      ProducersNav.jsx
      ProducersSidebar.jsx

    forms/
      auth/                  # Login and signup forms
      contact/               # Contact, expert advice, newsletter, cookie forms
      inquiry/               # Inquiry form sections and helpers

    guards/                  # Route guards for private/admin routes

    home/                    # Home page sections and widgets

    kanban/
      icons/                 # Kanban-specific icons
      ColumnItem.jsx
      Columns.jsx
      DragLayer.jsx
      KanbanContext.jsx
      KanbanProvider.jsx
      TaskItem.jsx
      Tasks.jsx

    layout/
      navbar/                # Navbar, mobile drawer, navbar actions, producer menu
      AdminLayout.jsx
      Footer.jsx
      PublicLayout.jsx

    ui/
      form/                  # Reusable floating fields and form UI
      ErrorState.jsx
      LoadingState.jsx
      Modal.jsx
      FilterDropDown.jsx
      RangeDropDown.jsx
      BackButton.jsx

  constants/
    events.js                # Shared frontend events, e.g. crane refresh event
    inquiryStatus.js         # Inquiry column/status configuration
    navbar.js                # Navbar/service link configuration
    craneGallery.constants.js

  context/
    auth.context.jsx         # Authentication provider and user session state

  hooks/
    useAvailableImageUrls.js
    useBodyScrollLock.js
    useCloudinaryUpload.js
    useCraneDetails.js
    useCraneGalleryZoom.js
    useDragAutoScroll.js
    useEscapeClose.js
    useHomeCranes.js
    useNavbarCounts.js
    useNavbarVisibility.js
    useProducers.js

  pages/
    AboutPage.jsx
    AddCranePage.jsx
    CraneDetailsPage.jsx
    CranesPage.jsx
    EditCranePage.jsx
    EditProfilePage.jsx
    HomePage.jsx
    ImprintPage.jsx
    InquiriesListPage.jsx
    MessagesPage.jsx
    NewInquiryPage.jsx
    NotFoundPage.jsx
    OurServicesPage.jsx
    PrivacyPolicyPage.jsx
    ProducerPage.jsx
    ProfilePage.jsx
    RevocationPage.jsx
    TermsPage.jsx
    UserCranesPage.jsx

  services/
    apiClient.js             # Shared Axios instance with auth interceptor
    authApi.js               # Authentication requests
    craneApi.js              # Crane CRUD and crane-specific requests
    inquiryApi.js            # Inquiry create/admin update/delete requests
    messageApi.js            # Contact/expert/newsletter message requests
    userApi.js               # Profile/user requests

  utils/
    craneHelpers.js          # Crane id/image/model helpers
    getDndConfig.js          # React DnD backend configuration
    helpers.js               # General helpers such as slugify, formatting, etc.
    imageHelpers.js          # Image normalization helpers

  App.jsx                    # App routes and layout composition
  main.jsx                   # React entry point
  index.css                  # Global styles
  App.css                    # App-level styles
```

### Frontend Layer Responsibilities

| Layer         | Responsibility                                   |
| ------------- | ------------------------------------------------ |
| `pages/`      | Route-level page components and page composition |
| `components/` | Reusable and domain-specific UI components       |
| `services/`   | API communication and backend integration        |
| `hooks/`      | Reusable stateful logic                          |
| `context/`    | Global authentication/session state              |
| `constants/`  | Shared static configuration                      |
| `utils/`      | Pure helper functions and data normalization     |

### API Service Layer

All backend communication is handled through service modules.

```txt
services/
  apiClient.js
  authApi.js
  craneApi.js
  inquiryApi.js
  messageApi.js
  userApi.js
```

The shared `apiClient` centralizes Axios configuration and automatically attaches the JWT token from local storage when available.

Typical usage:

```js
const cranes = await craneApi.getAll();
const myCranes = await craneApi.getMine();
const updatedInquiry = await inquiryApi.updateAdmin(id, payload);
const updatedUser = await userApi.updateProfile(payload);
```

This keeps page components cleaner and avoids repeated Axios configuration, token handling, and endpoint strings throughout the frontend.

### Domain Structure

The app is organized by domain where it makes sense:

```txt
cranes/      # crane cards, gallery, detail panels, forms, producer navigation
forms/       # auth/contact/inquiry forms
kanban/      # admin inquiry workflow
layout/      # public/admin layout and navigation
ui/          # reusable low-level UI components
```

This makes the codebase easier to maintain because crane-specific logic, inquiry logic, admin workflow logic, and generic UI logic are separated.

### Backend Cleanup Reflected in Frontend

The backend was cleaned up around a layered structure:

```txt
routes       -> define HTTP endpoints
controllers  -> handle req/res
services     -> business logic and database operations
validations  -> request body/params validation
middleware   -> auth, role checks, validation, error handling
models       -> Mongoose schemas
```

The frontend now mirrors that cleanup by using a dedicated service layer instead of calling backend endpoints directly from components.

Example flow:

```txt
User action
  -> Page/component handler
  -> frontend service module
  -> apiClient
  -> backend route
  -> backend controller
  -> backend service
  -> MongoDB model
```

Example inquiry update flow:

```txt
Admin drags inquiry card
  -> KanbanProvider.moveTask()
  -> InquiriesListPage.handleUpdate()
  -> inquiryApi.updateAdmin()
  -> PUT /inquiries/:inquiryId
  -> updateAdminInquiry controller
  -> updateInquiry service
  -> Inquiry.findByIdAndUpdate()
```

### Important Architectural Decisions

- Components should not directly import Axios.
- API URLs should be defined in service modules, not inside page components.
- Auth headers should be handled by `apiClient`.
- Route protection should be handled by route guard components.
- Reusable form fields should live in `components/ui/form/`.
- Crane-specific helpers should live in `utils/craneHelpers.js`.
- UI state that depends on crane updates can be refreshed through shared frontend events such as `kranhub:cranes-updated`.

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
