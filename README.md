# Atlas Homestays Monorepo

This monorepo contains all the technology components for Atlas Homestays — a multi-property hospitality platform.

## Structure

- `apps/`: Frontend apps (guest site, admin portal, staff mobile app)
- `backend/`: API and integrations
- `sql/`: Azure SQL schema and migrations
- `automations/`: Power Platform scripts (Power Apps, Automate)
- `reports/`: Dashboards (Power BI)
- `docs/`: System architecture and SOPs


05th June 2025 Summary
🏠 Atlas Homestays Admin Portal Setup — Summary
🎯 Objective
You wanted to:
Build and deploy an admin portal for Atlas Homestays
Allow only atlashomeskphb@gmail.com to access it
Use Azure App Service for backend and Cloudflare Pages for frontend
Integrate Auth0 for secure login (since Sagent uses it too)

✅ What You’ve Completed
🧱 1. Backend (API on Azure App Service)
Created a .NET 8 Web API with Entity Framework Core
Used Azure SQL Database for data storage
Exposed CRUD endpoints for:
properties, listings, guests, bookings, etc.

Enabled CORS for https://admin.atlashomestays.com

💻 2. Frontend (React Admin Panel)
Created React + Vite app with three pages:
Properties.jsx
Listings.jsx
Bookings.jsx

Implemented full CRUD with inline editing and table layout
Built form submission logic (e.g. guest + booking in one step)

🌐 3. Deployment
Backend: Published API to Azure App Service
Frontend:
Connected GitHub to Cloudflare Pages
Built project with Vite and deployed to:
https://admin.atlashomestays.com
Configured DNS on Cloudflare + updated nameservers on GoDaddy

Linked admin.atlashomestays.com as custom domain

🔐 4. Authentication with Auth0
Set up Auth0 application:
Login URI: https://admin.atlashomestays.com
Callback/logout/web origins configured correctly
Restricted access using:
const allowedAdmins = ["atlashomeskphb@gmail.com"];
Showed login/logout buttons and appropriate routing

Deployed secure version to production

🧪 5. Debugging & Fixes
Fixed:
CORS issues
Azure function errors
Cloudflare DNS propagation delays
Adjusted <Auth0Provider> to wrap app correctly in main.jsx
Removed duplicate <BrowserRouter> to prevent routing bugs

🛠 Tools You’ve Used
Area	Tool
Backend	.NET 8 + EF Core
Database	Azure SQL
Hosting (API)	Azure App Service
Frontend	React + Vite
Hosting (UI)	Cloudflare Pages
Auth	Auth0
Domain DNS	GoDaddy + Cloudflare

📌 Current Status
✅ API hosted at https://atlas-homes-api-<azure>.azurewebsites.net

✅ UI hosted at https://admin.atlashomestays.com

✅ Auth0 login restricted to your email

✅ Admin dashboard live and working for CRUD

⚠️ Only atlashomeskphb@gmail.com is authorized for now

🧩 Next Suggestions (Optional)
Add pagination + search to tables

Add Incident Log or User Audit Log

Track who (Krishna/Ramalingaiah) entered each record

Use GitHub Actions to auto-deploy frontend

Consider a service worker (Cloudflare Worker) for caching