const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require("../Models/User");

const signup = async (req,res)=>{
    try{
        const {name , email , password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({message: 'User already exists , u can login',success:false});

        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successful",
                success:true
            })
    }catch(err){
        res.status(500)
            .json({
                message: "Internal server error",
                success: false 
            })
        }
}

const login = async (req,res)=>{
    try{
        const {email , password} = req.body;
        const user = await UserModel.findOne({email});
        const errormsg = "Auth failed . wrong email or password"
        if(!user){
            return res.status(403)
                .json({message: errormsg,
                    success:false});
        }
        const isPasseq = await bcrypt.compare(password,user.password)
        if(!isPasseq){
            return res.status(403)
                .json({message: errormsg , success:false});
        }

        const jwtToken = jwt.sign(
            {email: user.email , _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        res.status(200)
            .json({
                message: "Login successful",
                success:true,
                jwtToken,
                email,
                name: user.name
            })
        
            
    }catch(err){
        res.status(500)
            .json({
                message: "Internal server error",
                success: false 
            })
        }
}

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

        // Check if the article is already a favorite
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

        // Filter out the favorite to be removed
        user.favorites = user.favorites.filter((fav) => fav.url !== url);
        await user.save();

        res.status(200).json({ message: "Favorite removed successfully", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


module.exports = {
    signup,
    login,
    addFavorite,
    getFavorites,
    removeFavorite
}

