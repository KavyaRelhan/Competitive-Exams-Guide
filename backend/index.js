// const express = require('express');
// const app = express()
// const bodyParser = require('body-parser')
// const cors= require('cors');
// const AuthRouter = require('./Routes/AuthRouter')
// const ProductRouter = require('./Routes/ProductRouter')
// const axios = require('axios');
// require('dotenv').config();
// require('./Models/db')


// const PORT = process.env.PORT || 8080;
// const NEWS_API_KEY = 'd49ee84edc004ce18b6a896825ecdf62'
// const TWITTER_BEARERTOKEN = 'AAAAAAAAAAAAAAAAAAAAAD2BwwEAAAAAFj9speVBJ5b2aIsQqNysjE33YXc%3DrUPwsxg591dIIjLwwWC7WYfOSbuG8apACOpE9UMLhtAF9QfPTD';

// app.use(bodyParser.json())
// app.use(cors())
// app.use('/auth',AuthRouter);
// app.use('/products',ProductRouter);


// // NewsAPI route
// // app.get('/api/news', async (req, res) => {
// //     try {
// //       const response = await axios.get(
// //         `https://newsapi.org/v2/everything?q=JEE%20OR%20NEET&sortBy=publishedAt&apiKey=d49ee84edc004ce18b6a896825ecdf62`
// //       );
// //       res.json(response.data.articles);
// //     } catch (error) {
// //       res.status(500).json({ error: 'Error fetching news' });
// //     }
// //   });

// // Endpoint for NewsAPI updates with Indian sources
// app.get('/api/news', async (req, res) => {
//     try {
//       const response = await axios.get(
//         'https://newsapi.org/v2/everything', 
//         {
//           params: {
//             q: 'JEE OR NEET',
//             sortBy: 'publishedAt',
//             language: 'en', // Optional: Filters articles in English
//             apiKey: NEWS_API_KEY,
//             sources: 'the-times-of-india,the-hindu', // Specify Indian sources here
//           }
//         }
//       );
//       res.json(response.data.articles);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching news' });
//     }
//   });
  
//   // Twitter API route
//   app.get('/api/twitter', async (req, res) => {
//     try {
//       const response = await axios.get(
//         `https://api.twitter.com/2/tweets/search/recent?query=JEE%20OR%20NEET`,
//         {
//           headers: { Authorization: `Bearer ${TWITTER_BEARERTOKEN}` },
//         }
//       );

//       res.json(response.data.data);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching tweets' });
//     }
//   });

// app.listen(PORT,()=>{
//     console.log(`Sever is listening on port ${PORT}`)
// })

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const NEWS_API_KEY = '3605a9a28fbe472aa86fefc775e059d1';
const TWITTER_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAADR%2FwwEAAAAAtQPnrw6bK1GHaMSbhoCaRF8aqa4%3DfF8raNm9flCY5ZqxR2cum9owdLaJOlDPgVDxcpb9Z0AZn5drSg';

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

// Endpoint for Twitter updates with filtering and sorting
// app.get('/api/twitter', async (req, res) => {
//   const { q } = req.query; // Extract query param

//   try {
//     const response = await axios.get(
//       https://api.twitter.com/2/tweets/search/recent,
//       {
//         params: {
//           query: q || 'JEE OR NEET',
//           "tweet.fields": 'created_at,public_metrics',
//         },
//         headers: {
//           Authorization: Bearer ${TWITTER_BEARER_TOKEN},
//         },
//       }
//     );
//     // Sort by engagement (likes + retweets)
//     const sortedTweets = response.data.data.sort((a, b) => {
//       const aEngagement = a.public_metrics.like_count + a.public_metrics.retweet_count;
//       const bEngagement = b.public_metrics.like_count + b.public_metrics.retweet_count;
//       return bEngagement - aEngagement;
//     });
//     res.json(sortedTweets);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching tweets' });
//   }
// });

app.listen(5000, () => console.log('Server running on port 5000'));