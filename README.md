# 📌 Competitive Exam Guide - MERN Stack Web Application

## 📖 About
The **Competitive Exam Guide** is a MERN stack-based web application that provides users with real-time exam-related news updates. It features an exam directory for structured information on various competitive exams, a favorites section for saving news, push notifications for new articles, and Google authentication.

## 🚀 Features
- **Live News Updates:** Users can view the latest exam-related news fetched via a news API.
- **Favorites Section:** Users can save news articles to their favorites and delete them later if needed.
- **Push Notifications:** Users can enable notifications to receive alerts when new articles are published.
- **Exam Directory:** A well-organized section that categorizes and provides details about different competitive exams.
- **Google Login:** Secure authentication via Google Sign-In.

## 🛠 Tech Stack
- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Firebase/Google OAuth
- **Notifications:** Web Push Notifications (Firebase Cloud Messaging or other services)
- **News API:** Integrated to fetch live news updates

## 🔧 How to Start on Localhost

### 📌 Prerequisites
- Node.js (v18+)
- MongoDB installed locally or a MongoDB Atlas account
- Firebase Project (if using Firebase for authentication and notifications)

### 📥 Installation & Setup
#### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-username/exam-guide.git
cd exam-guide
```
#### 2️⃣ Install dependencies
```sh
cd client
npm install
cd ../server
npm install
```
#### 3️⃣ Set up environment variables
Create a `.env` file and add the following:
```env
MONGO_URI=your_mongo_database_url
JWT_SECRET=your_secret_key
NEWS_API_KEY=your_news_api_key
FIREBASE_API_KEY=your_firebase_api_key
```
#### 4️⃣ Start the backend server
```sh
cd server
npm start
```
#### 5️⃣ Start the frontend
```sh
cd client
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
![Home Page](screenshots/home.png)

## 🤝 Contribution Guidelines
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m "Added new feature"`)
4. Push to your fork and create a Pull Request

## 📬 Contact
📌 **GitHub**: [KavyaRelhan](https://github.com/KavyaRelhan)
📌 **Email**: boy118141@gmail.com

---
### ⭐ Don't forget to **star** the repo if you like it! 🚀

