const { signup ,login ,addFavorite, getFavorites,removeFavorite } = require('../Controllers/AuthController');
const ensureAuthenticated = require('../Middlewares/Auth');
const { signupValidation , loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login',loginValidation,login)
router.post('/signup',signupValidation,signup)

// Favorites routes
router.post('/favorites', ensureAuthenticated,addFavorite);       // Add a favorite
router.get('/favorites',ensureAuthenticated ,getFavorites);      // Get favorites
router.delete('/favorites',ensureAuthenticated, removeFavorite);


module.exports = router