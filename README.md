# ZENCRM – Mini CRM Platform 🚀

Welcome to ZENCRM! This is a modern, full-stack mini CRM platform built for the Xeno SDE Internship assignment. ZENCRM empowers you to segment customers, deliver personalized campaigns, and gain actionable insights—all with a clean, intuitive experience.

---

## ✨ Key Features
- **Secure REST APIs** for ingesting customers and orders (with Swagger UI docs)
- **Dynamic Campaign Builder** with flexible AND/OR rule logic
- **Audience Preview** before saving segments
- **Campaign History** with delivery stats (sent, failed, audience size)
- **Personalized Campaign Delivery** with simulated vendor API 
- **Delivery Receipt API** for real-time status updates
- **Google OAuth 2.0 Authentication**
- **Rule-Based Message Suggestions** (context-aware, up to 6 variants per campaign)
- **Clean, Intuitive UX** (React + Material UI)
- **Deployed on Vercel (frontend) & Render (backend)**

---

## 🏗️ Architecture Diagram
![Architecture Diagram](./screenshot/architecture.png)

---

## 🖥️ Screenshots & Walkthrough

1. **Login Page**
   - ![Login Page](./screenshot/1.png)
2. **Home Page**
   - ![Home Page 1](./screenshot/2.png)
   - ![Home Page 2](./screenshot/3.png)
3. **Create Campaign**
   - ![Create Campaign](./screenshot/4.png)
4. **AI Message Suggestion for Inactive Customer**
   - ![AI Message Suggestion (Inactive)](./screenshot/5.png)
5. **AI Message Suggestion for Loyal Customer**
   - ![AI Message Suggestion (Loyal)](./screenshot/6.png)
6. **Rule Building for Campaign**
   - ![Rule Building](./screenshot/8.png)
7. **Audience Preview (Based on Rule)**
   - ![Audience Preview](./screenshot/7.png)
8. **Campaign Preview**
   - ![Campaign Preview](./screenshot/9.png)
9. **Sending Message**
   - ![Sending Message](./screenshot/10.png)
10. **Campaign History with Stats and Details**
    - ![Campaign History 1](./screenshot/11.png)
    - ![Campaign History 2](./screenshot/12.png)
11. **Customer Analytics Dashboard**
    - ![Customer Analytics 1](./screenshot/13.png)
    - ![Customer Analytics 2](./screenshot/14.png)

---

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite, Material UI)
- **Backend:** Node.js (Express)
- **Database:** MongoDB Atlas
- **Authentication:** Google OAuth 2.0 
- **Deployment:** Vercel (frontend), Render (backend)

---

## 🧠 Smart Features
- **Rule-Based Message Suggestions:**
  - Context-aware suggestions based on campaign objective (up to 6 variants)
  - Keyword mapping for loyalty, winback, new, premium, and discount campaigns
  - No external AI/LLM APIs used; logic is fully rule-based and easily extendable

---

## 🔒 Authentication
- Google OAuth 2.0 integration 

---

## 📦 API Documentation
- Swagger UI available at `/api-docs` (backend)
- Example requests and responses for all endpoints

---

## 🏃‍♂️ Local Setup Instructions
1. **Clone the repo:**
   ```bash
   git clone https://github.com/prashx1908/ZENCRM.git
   cd ZENCRM
   ```
2. **Backend:**
   ```bash
   cd ZENCRM-backend
   npm install
   # Set up .env with MongoDB URI, JWT secret, Google OAuth keys
   npm run dev
   ```
3. **Frontend:**
   ```bash
   cd ../ZENCRM-frontend
   npm install
   npm run dev
   ```

---

## 🌐 Deployment
- **Frontend:** [Vercel Deployment Link](https://ZENCRM-mu.vercel.app)
- **Backend:** [Render Deployment Link](https://ZENCRM-backend.onrender.com)

---

## 📝 AI Tools & Tech Used
- All message suggestions are generated using custom rule-based logic

---

## ⚡ Known Limitations / Assumptions
- No pub-sub architecture (Kafka, RabbitMQ, etc.) implemented
- Vendor API is simulated for demo purposes
- UI/UX is optimized for desktop
- No external AI/LLM APIs used

---

## 🙏 Thank You!
Thank you for reviewing my submission! If you have any questions, feel free to reach out. I'm excited to discuss my approach and learn more about Xeno. 🚀
