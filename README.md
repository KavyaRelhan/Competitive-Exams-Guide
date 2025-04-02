# 📌 Competitive Exam Guide - MERN Stack Web Application

## 🔗 Link to hosted website
https://competitive-exams-guide-frontend.vercel.app/

## 📖 About
The **Competitive Exam Guide** is a MERN stack-based web application that provides users with real-time exam-related news updates. It features an exam directory for structured information on various competitive exams, a favorites section for saving news, push notifications for new articles, and Google authentication.

## 🚀 Features
- **Live News Updates:** Users can view the latest exam-related news fetched via a news API.
- **Favorites Section:** Users can save news articles to their favorites and delete them later if needed.
- **Push Notifications:** Users can enable notifications to receive alerts when new articles are published.
- **Exam Directory:** A well-organized section that categorizes and provides details about different competitive exams.
- **Google Login:** Secure authentication via Google Sign-In.

## 🛠 Tech Stack
- **Frontend:** React.js, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Firebase/Google OAuth
- **Notifications:** Web Push Notifications (Firebase Cloud Messaging or other services)
- **News API:** Integrated to fetch live news updates

## 🔧 How to Start on Localhost

### 📌 Prerequisites
- Node.js (v18+)
- MongoDB Atlas account

### 📥 Installation & Setup
#### 1️⃣ Clone the repository
```sh
git clone https://github.com/KavyaRelhan/Competitive-Exams-Guide.git
cd Competitive-Exams-Guide
```
#### 2️⃣ Install dependencies
```sh
cd my-react-app
npm install
cd ../backend
npm install
```
#### 3️⃣ Set up environment variables
Create a `.env` file and add the following:
```env
PORT=port
MONGO_URI=your_mongo_database_url
JWT_SECRET=your_secret_key
NEWS_API_KEY=your_news_api_key
GOOGLE_CLIENT_ID=your_google_client_id
VAPID_PUBLIC_KEY=your_public_vapid_key
VAPID_PRIVATE_KEY=your_private_vapid_key
```
#### 4️⃣ Start the backend server
```sh
cd backend
npm start
```
#### 5️⃣ Start the frontend
```sh
cd my-react-app
npm start
```

## 📡 API Endpoints

### 🔐 Authentication
- `POST /api/auth/google` - Authenticate user via Google

### 📰 News Management
- `GET /api/news` - Fetch latest news articles
- `POST /api/news/favorite` - Add a news article to favorites
- `DELETE /api/news/favorite/:id` - Remove a news article from favorites

### 📚 Exam Directory
- `GET /api/exams` - Fetch categorized exam details

### 🔔 Push Notifications
- `POST /api/send-notification` - Sends notification to users

## 📂 Project Structure
```
exam-guide/
├── my-react-app/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   ├── package.json
│
├── server/               # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│
├── .gitignore
├── README.md
```

## 📸 UI Screenshots
### 📌 Home Page
![Home Page](https://github.com/KavyaRelhan/Competitive-Exams-Guide/blob/main/HomePage.png)
### 📌 Login Page
![Login/Signup Page](https://github.com/KavyaRelhan/Competitive-Exams-Guide/blob/main/LoginPage.jpeg)

## 🤝 Contribution Guidelines
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m "Added new feature"`)
4. Push to your fork and create a Pull Request

## 📬 Contact
📌 **GitHub**: [KavyaRelhan](https://github.com/KavyaRelhan)
📌 **Email**: boy118141@gmail.com, relhankavya123@gmail.com

---
### ⭐ Don't forget to **star** the repo if you like it! 🚀

