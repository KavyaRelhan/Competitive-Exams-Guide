const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser')
const AuthRouter = require('./Routes/AuthRouter')
require('dotenv').config();
require('./Models/db')

const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use('/auth',AuthRouter);

const PORT = process.env.PORT || 8080;

const NEWS_API_KEY = '3605a9a28fbe472aa86fefc775e059d1';
// const TWITTER_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAADR%2FwwEAAAAAtQPnrw6bK1GHaMSbhoCaRF8aqa4%3DfF8raNm9flCY5ZqxR2cum9owdLaJOlDPgVDxcpb9Z0AZn5drSg';

// Endpoint for NewsAPI updates with filtering and sorting
app.get('/api/news', async (req, res) => {
  try {
    const keyword = req.query.keyword || 'JEE OR NEET OR NTA OR "National Testing Agency"'; // Default keywords
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: keyword,
        sortBy: 'publishedAt',
        language: 'en',
        apiKey: NEWS_API_KEY,
        sources: 'the-times-of-india,the-hindu,india-today,hindustan-times,ndtv,economic-times',
      },
    });
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

