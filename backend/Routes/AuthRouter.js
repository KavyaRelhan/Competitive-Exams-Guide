const { signup ,login ,addFavorite, getFavorites,removeFavorite, googleLogin } = require('../Controllers/AuthController');
const ensureAuthenticated = require('../Middlewares/Auth');
const { signupValidation , loginValidation } = require('../Middlewares/AuthValidation');
const {saveSubscription} = require('../Controllers/AuthController')

const router = require('express').Router();

router.post('/login',loginValidation,login)
router.post('/signup',signupValidation,signup)
router.post('/google-login', googleLogin);
router.post('/save-subscription', saveSubscription);

// Favorites routes
router.post('/favorites', addFavorite);       // Add a favorite
router.get('/favorites',getFavorites);      // Get favorites
router.delete('/favorites', removeFavorite);


module.exports = router