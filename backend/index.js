const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser')
const AuthRouter = require('./Routes/AuthRouter')
require('dotenv').config();
require('./Models/db')
const webPush = require('web-push')
const UserModel = require('./Models/User')

const app = express();
app.use(bodyParser.json())
app.use(cors(
  {
    origin: ["https://competitive-exams-guide-frontend.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }
));
app.use('/auth',AuthRouter);

const PORT = process.env.PORT || 8080;
// Web Push Configuration
const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webPush.setVapidDetails(
  'mailto:your-email@example.com',
  publicVapidKey,
  privateVapidKey
);

// Endpoint to Save Subscription
app.post('/api/subscribe', async (req, res) => {
  try {
    const { subscription, email } = req.body;
    
    // Find the user by email
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }
    
    // Save the subscription to the user's document
    user.pushSubscription = subscription;
    await user.save();
    
    res.status(201).json({ message: 'Subscription saved successfully!', success: true });
  } catch (error) {
    console.error('Subscription saving error:', error);
    res.status(500).json({ message: 'Failed to save subscription', success: false });
  }
});

// Endpoint to Send Notifications
app.post('/api/send-notification', async (req, res) => {
  try {
    const { title, body } = req.body;
    const payload = JSON.stringify({ title, body });

    // Get all users with push subscriptions
    const usersWithSubscriptions = await UserModel.find({ 
      pushSubscription: { $ne: null } 
    });

    const notificationPromises = usersWithSubscriptions
      .filter(user => user.pushSubscription)
      .map(user => 
        webPush.sendNotification(user.pushSubscription, payload)
          .catch(err => console.error('Notification send error:', err))
      );

    await Promise.all(notificationPromises);

    res.status(200).json({ message: 'Notification sent!' });
  } catch (error) {
    console.error('Notification sending error:', error);
    res.status(500).json({ message: 'Failed to send notifications' });
  }
});

const NEWS_API_KEY = '3605a9a28fbe472aa86fefc775e059d1';

let latestNews = []; // Store the latest fetched news articles

app.get('/api/news', async (req, res) => {
  try {
    const keyword = req.query.keyword || 'JEE OR NEET OR NTA OR "National Testing Agency"';
    
    // Get all users with push subscriptions
    const usersWithSubscriptions = await UserModel.find({ 
      pushSubscription: { $ne: null } 
    });

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: keyword,
        sortBy: 'publishedAt',
        language: 'en',
        apiKey: NEWS_API_KEY,
        sources: 'the-times-of-india,the-hindu,india-today,hindustan-times,ndtv,economic-times',
      },
    });

    const fetchedNews = response.data.articles;

    // Compare with the latest news and find new articles
    const newArticles = fetchedNews.filter(
      (article) => !latestNews.some((news) => news.url === article.url)
    );

    if (newArticles.length > 0) {
      latestNews = fetchedNews; // Update the latest news

      // Notify users about new articles
      const payload = JSON.stringify({
        title: 'New Articles Available!',
        body: `We found ${newArticles.length} new article(s) for you.`,
        url: 'https://competitive-exams-guide-frontend.vercel.app/home',
      });
      
      // Send notifications to all users with subscriptions
      const notificationPromises = usersWithSubscriptions
        .filter(user => user.pushSubscription)
        .map(user => 
          webPush.sendNotification(user.pushSubscription, payload)
            .catch((err) => console.error('Notification error:', err))
        );

      await Promise.all(notificationPromises);
    }

    res.json(fetchedNews);
  } catch (error) {
    console.error('News fetching error:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Error fetching news', 
      details: error.response ? error.response.data : error.message 
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
