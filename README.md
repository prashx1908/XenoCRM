# XenoCRM – Mini CRM Platform

## 🚀 Overview
XenoCRM is a modern, full-stack mini CRM platform that enables customer segmentation, personalized campaign delivery, and intelligent insights. Built as part of the Xeno SDE Internship assignment, it demonstrates real-world CRM challenges using scalable, creative, and AI-powered solutions.

---

## ✨ Features
- **Secure Data Ingestion APIs** for customers and orders (with Swagger UI docs)
- **Pub-Sub Architecture** using Kafka (bonus)
- **Dynamic Campaign Builder** with flexible AND/OR rule logic
- **Audience Preview** before saving segments
- **Campaign History** with delivery stats (sent, failed, audience size)
- **Personalized Campaign Delivery** with simulated vendor API (90% sent, 10% failed)
- **Delivery Receipt API** for real-time status updates
- **Google OAuth 2.0 Authentication** (only logged-in users can create/view campaigns)
- **AI-Powered Message Suggestions** (context-aware, up to 6 variants per campaign)
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
- ![AI Message Suggestions](./screenshots/ai_suggestions.png)

---

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite, Material UI)
- **Backend:** Node.js (Express)
- **Database:** MongoDB Atlas
- **Authentication:** Google OAuth 2.0
- **Pub-Sub:** Kafka (bonus)
- **AI:** Custom logic for message suggestions (OpenAI/LLM ready)
- **Deployment:** Vercel (frontend), Render (backend)

---

## 🧠 AI Features
- **AI-Driven Message Suggestions:**
  - Context-aware suggestions based on campaign objective (up to 6 variants)
  - Keyword mapping for loyalty, winback, new, premium, and discount campaigns
  - Easily extendable to use OpenAI or other LLM APIs for more advanced suggestions

---

## 🔒 Authentication
- Google OAuth 2.0 integration
- Only authenticated users can create/view campaigns

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
4. **Kafka (optional):**
   - Start Kafka and Zookeeper locally or use a managed service
   - Update backend config as needed

---

## 🌐 Deployment
- **Frontend:** [Vercel Deployment Link](https://xenocrm-mu.vercel.app)
- **Backend:** [Render Deployment Link](https://xenocrm-backend.onrender.com)

---

## 📝 AI Tools & Tech Used
- Custom keyword-based logic for message suggestions
- (Optional) OpenAI API for advanced message generation
- (Optional) LLMs for natural language to rule conversion

---

## ⚡ Known Limitations / Assumptions
- Kafka pub-sub is optional and can be disabled for local/dev
- AI features are keyword-based by default; LLM integration is ready but not enabled by default
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

## 🙏 Thanks for the Opportunity!
If you have any questions, feel free to reach out. Looking forward to discussing my approach and learning more about Xeno!
