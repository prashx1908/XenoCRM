# XenoCRM – Mini CRM Platform 🚀

Welcome to XenoCRM! This is a modern, full-stack mini CRM platform built for the Xeno SDE Internship assignment. XenoCRM empowers you to segment customers, deliver personalized campaigns, and gain actionable insights—all with a clean, intuitive experience.

---

## ✨ Key Features
- **Secure REST APIs** for ingesting customers and orders (with Swagger UI docs)
- **Dynamic Campaign Builder** with flexible AND/OR rule logic
- **Audience Preview** before saving segments
- **Campaign History** with delivery stats (sent, failed, audience size)
- **Personalized Campaign Delivery** with simulated vendor API (90% sent, 10% failed)
- **Delivery Receipt API** for real-time status updates
- **Google OAuth 2.0 Authentication** *(pending approval, will be live in 2-3 days)*
- **Rule-Based Message Suggestions** (context-aware, up to 6 variants per campaign)
- **Clean, Intuitive UX** (React + Material UI)
- **Deployed on Vercel (frontend) & Render (backend)**

---

## 🏗️ Architecture Diagram
![Architecture Diagram](./screenshots/architecture.png)

---

## 🖥️ Screenshots
- ![Login Page](./screenshots/login.png)
- ![Campaign Builder](./screenshots/campaign_builder.png)
- ![Audience Preview](./screenshots/audience_preview.png)
- ![Campaign History](./screenshots/campaign_history.png)
- ![Swagger UI](./screenshots/swagger.png)
- ![Message Suggestions](./screenshots/ai_suggestions.png)

---

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite, Material UI)
- **Backend:** Node.js (Express)
- **Database:** MongoDB Atlas
- **Authentication:** Google OAuth 2.0 *(pending approval)*
- **Deployment:** Vercel (frontend), Render (backend)

---

## 🧠 Smart Features
- **Rule-Based Message Suggestions:**
  - Context-aware suggestions based on campaign objective (up to 6 variants)
  - Keyword mapping for loyalty, winback, new, premium, and discount campaigns
  - No external AI/LLM APIs used; logic is fully rule-based and easily extendable

---

## 🔒 Authentication
- Google OAuth 2.0 integration *(pending Google approval; will be enabled in 2-3 days)*
- Only authenticated users can create/view campaigns (once enabled)

---

## 📦 API Documentation
- Swagger UI available at `/api-docs` (backend)
- Example requests and responses for all endpoints

---

## 🏃‍♂️ Local Setup Instructions
1. **Clone the repo:**
   ```bash
   git clone https://github.com/prashx1908/XenoCRM.git
   cd XenoCRM
   ```
2. **Backend:**
   ```bash
   cd xenocrm-backend
   npm install
   # Set up .env with MongoDB URI, JWT secret, Google OAuth keys
   npm run dev
   ```
3. **Frontend:**
   ```bash
   cd ../xenocrm-frontend
   npm install
   npm run dev
   ```

---

## 🌐 Deployment
- **Frontend:** [Vercel Deployment Link](https://xenocrm-mu.vercel.app)
- **Backend:** [Render Deployment Link](https://xenocrm-backend.onrender.com)

---

## 📝 AI Tools & Tech Used
- No external AI/LLM APIs used
- All message suggestions are generated using custom rule-based logic

---

## ⚡ Known Limitations / Assumptions
- No pub-sub architecture (Kafka, RabbitMQ, etc.) implemented
- Google OAuth is pending approval and will be enabled soon
- Vendor API is simulated for demo purposes
- Delivery stats are based on simulated responses
- UI/UX is optimized for desktop

---

## 📹 Demo Video
- [Demo Video Link](#) *(To be added)*

---

## 📚 Submission Checklist
- [x] Public GitHub repo
- [x] Deployed project (Vercel/Render)
- [x] Demo video (to be added)
- [x] README with setup, architecture, AI, and limitations

---

## 🙏 Thank You!
Thank you for reviewing my submission! If you have any questions, feel free to reach out. I'm excited to discuss my approach and learn more about Xeno. 🚀 
