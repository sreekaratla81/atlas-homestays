# Atlas Homestays Monorepo

This monorepo contains all the technology components for **Atlas Homestays** — a multi-property hospitality platform.

---

## 📁 Structure

- **`apps/`**: Frontend apps (guest site, admin portal, staff mobile app)
- **`backend/`**: API and integrations
- **`sql/`**: Azure SQL schema and migrations
- **`automations/`**: Power Platform scripts (Power Apps, Automate)
- **`reports/`**: Dashboards (Power BI)
- **`docs/`**: System architecture and SOPs

---

## 🏗️ Architecture Overview

### 🌐 Frontend (Admin Panel)
- **Framework:** React (Vite)
- **Deployment:** Cloudflare Pages
- **Authentication:** Auth0 (Single Admin Email)
- **Domain:** [admin.atlashomestays.com](https://admin.atlashomestays.com) (via Cloudflare DNS)

### 🔄 Backend API
- **Technology:** .NET 8 Web API
- **Hosting:** Azure App Service (Windows)
- **CORS:** Configured to allow frontend access
- **Endpoints:** CRUD APIs for Properties, Listings, Guests, Bookings

### 🗄️ Database
- **Type:** Azure SQL Database
- **Tables:**  
  - `properties`  
  - `listings`  
  - `guests`  
  - `bookings`  
  - `incidents`  
  - `messages_log`  
  - `payments`  
  - `users`

### 🔐 Authentication
- **Service:** Auth0
- **Allowed Users:** `atlashomeskphb@gmail.com`
- **Login:** Enforced on frontend

### 🔁 CI/CD
- **Frontend:** Auto-deployed via Cloudflare Pages GitHub integration
- **Backend:** GitHub Actions workflows deploying to Azure App Service  
  _(Manual trigger and secrets configured)_

### 🌍 Domain & DNS
- **Registrar:** GoDaddy
- **DNS & Proxy:** Cloudflare
- **Custom Domains:**
  - `admin.atlashomestays.com` → Cloudflare Pages (React app)
  - `atlas-homes-api.azurewebsites.net` → Azure API endpoint

---