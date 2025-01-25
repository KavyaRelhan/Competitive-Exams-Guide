const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
// const { OAuth2Client } = require('@react-oauth/google');
const { OAuth2Client } = require('google-auth-library');


const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login
const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token is required", success: false });
        }
        console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        // Find or create user
        let user = await UserModel.findOne({ email });

        if (!user) {
            user = new UserModel({
                name,
                email,
                password: null, // Password is null for Google users
                googleId,
            });
            await user.save();
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Google login successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
        });
    } catch (err) {
        console.error("Detailed error:", err); 
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Signup
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists, please log in", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Signup successful", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(403).json({ message: "Authentication failed. Invalid email or password", success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Add Favorite
const addFavorite = async (req, res) => {
    try {
        const { email, article } = req.body;

        if (!email || !article) {
            return res.status(400).json({ message: "Email and article are required", success: false });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const alreadyExists = user.favorites.some((fav) => fav.url === article.url);
        if (alreadyExists) {
            return res.status(400).json({ message: "Article is already a favorite", success: false });
        }

        user.favorites.push(article);
        await user.save();

        res.status(201).json({ message: "Favorite added successfully", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Get Favorites
const getFavorites = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ favorites: user.favorites, success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Remove Favorite
const removeFavorite = async (req, res) => {
    try {
        const { email, url } = req.body;

        if (!email || !url) {
            return res.status(400).json({ message: "Email and URL are required", success: false });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        user.favorites = user.favorites.filter((fav) => fav.url !== url);
        await user.save();

        res.status(200).json({ message: "Favorite removed successfully", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
    
};
const saveSubscription = async (req, res) => {
    try {
      const { email, subscription } = req.body;
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found', success: false });
      }
  
      user.pushSubscription = subscription;
      await user.save();
  
      res.status(200).json({ message: 'Subscription saved!', success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error', success: false });
    }
  };

module.exports = {
    signup,
    login,
    googleLogin,
    addFavorite,
    getFavorites,
    removeFavorite,
    saveSubscription
};

// Updated authRouter.js
// const { signup, login, googleLogin, addFavorite, getFavorites, removeFavorite } = require('../Controllers/AuthController');
// const ensureAuthenticated = require('../Middlewares/Auth');
// const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

// const router = require('express').Router();

// router.post('/login', loginValidation, login);
// router.post('/signup', signupValidation, signup);
// router.post('/google-login', googleLogin);

// // Favorites routes
// router.post('/favorites', ensureAuthenticated, addFavorite); // Add a favorite
// router.get('/favorites', ensureAuthenticated, getFavorites); // Get favorites
// router.delete('/favorites', ensureAuthenticated, removeFavorite); // Remove a favorite

// module.exports = router;
