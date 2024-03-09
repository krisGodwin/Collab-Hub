const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require('../utils/cloudinary');
require("dotenv").config();
const ContentCreatorModel = require("../models/ContentCreatorModel.js");
const HiringModel = require("../models/HiringModel.js");
const PostsModel = require("../models/PostModel.js");
const CC=require("../models/CreatorRecommendModel.js")
const UploadFile = require("../middlewares/cloudinary_service.js");
const {UserModel,UserType} = require("../models/UserModel.js");
const { generateToken } = require("../utils/generateToken.js");
//const MessageModel = require("../models/MessageModel.js");
exports.Register = async(req,res) => {
    try {
        const {email,password,contenttype} = req.body;
        let creator = await ContentCreatorModel.findOne({email : email});
        if(creator){
            return res.status(400).json({message : "User Already Present"});
        }
        const creatorNew = new ContentCreatorModel({
            _id : new mongoose.Types.ObjectId(),
            email : email
        });
        const salt = await bcrypt.genSalt(10);
        creatorNew.password = await bcrypt.hash(password,salt);
        const initialContentArray = Array.isArray(contenttype) ? contenttype : [contenttype];
        creatorNew.contenttype = initialContentArray
        creatorNew.userType = UserType.ContentCreator
        await creatorNew.save()
        .then((saved,err) => {
            if(saved){
                return res.status(200).json({id : creatorNew._id, message : "Created Content Creator Successfully"});
            }
            else{
                return res.status(400).json({message : "Could not register"});
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({error : error});
    }
}
exports.Login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const ContentCreatorPresent = await ContentCreatorModel.findOne({email : email});
        const Postexists = await PostsModel.findOne({contentCreator: ContentCreatorPresent._id})
        if(!ContentCreatorPresent){
            return res.status(400).json({message : "Content Creator not Present"});
        }
        const isMatch = await bcrypt.compare(password,ContentCreatorPresent.password);
        if(!isMatch){
            return res.status(400).json({message : "Incorrect password"});
        }
        const payload = {
            CC : {
                id : ContentCreatorPresent._id,
                "contentCreator" : true
            }
        }
        // const token = generateToken(res, ContentCreatorPresent._id)
        
        // res.status(200).json({
        //     _token: token,
        //     _id: ContentCreatorPresent._id,
        //     email: ContentCreatorPresent.email,
        // })
        if(Postexists){
            jwt.sign(payload,process.env.JWT_KEY,{expiresIn : 3600},(err,token)=>{
                if (err) throw err;
                res.status(200).json({_id : ContentCreatorPresent._id,_token : token, _post: true})
            })
        } else {
            jwt.sign(payload,process.env.JWT_KEY,{expiresIn : 3600},(err,token)=>{
                if (err) throw err;
                res.status(200).json({_id : ContentCreatorPresent._id,_token : token, _post: false})
            })
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message : "Could not login"})
    }
}
exports.Profile = async(req,res) => {
    const CreatorData = await ContentCreatorModel.findById(req.userData["CC"].id);
    return res.status(200).json({email : CreatorData["email"],role : req.userData["CC"].role,contents : CreatorData["contenttype"]})
}
exports.AddContent = async(req,res) => {
    console.log(req.cookies.jwt)
    const {title,description,contenttypes,contentCreatorType} = req.body;
    const image_file = req.body.filename;
    const result = await cloudinary.uploader.upload(image_file, {
        folder: "products",
        // width: 300,
        // crop: "scale"
    })
    const id=uuidv4()
    const ContentArray = Array.isArray(contenttypes) ? contenttypes : [contenttypes];
    console.log(ContentArray[0])
        const newPost = new PostsModel({
            id:id,
            title : title,
            description : description,
            image_url : result.url,
            contenttypes : ContentArray,
            contentCreator : req.userData["CC"].id,
            contentCreatorType: contentCreatorType
        });
        await newPost.save() 
        const newCC = new CC({
            Creator_id:id,
            contenttypes : ContentArray[0],
            post_id: newPost._id,
        });
        await newCC.save() 
        return res.status(204).json({})
    
}

exports.SearchPosts = async(req, res) => {
    const searchQuery = req.query.title; // Assuming you're sending the search query as a query parameter named 'title'
    
    try {
        // Perform the search using Mongoose
        const searchResults = await PostsModel.find({ title: { $regex: searchQuery, $options: 'i' } });
        
        res.status(200).json({ searchResults });
    } catch (error) {
        // Handle errors
        console.error('Error searching posts:', error);
        res.status(500).json({ error: 'An error occurred while searching posts' });
    }
}

exports.GetAllPosts = async(req, res) => {
    const posts = await PostsModel.find({ contentCreatorType:"CC" })
    return res.status(200).json({data: posts})
}

exports.GetOnePost = async (req, res) => {
    const { id } = req.query; // Retrieve id from query parameters
    const posts = await PostsModel.find({ _id: id })
        .then((posts, err) => {
            if (err) {
                console.error(err)
                return res.status(400).json({ message: "Could not get the posts" });
            }
            const mappedResult = posts.map(post => ({
                _id: post._id,
                title: post.title,
                description: post.description,
                image_url: post.image_url,
                contenttypes: post.contenttypes
            }));
            return res.status(200).json({ data: mappedResult });
        })
}

exports.fetchRecommendedPosts = async (req, res) => {
    const recommendedIds = req.body.recommendedIds; // Assuming you're getting an array of recommended IDs from req.body

    try {
        // Find posts with IDs in the recommendedIds array
        const recommendedPosts = await PostModel.find({ _id: { $in: recommendedIds } });
        
        // Send the recommended posts as a response
        res.json({ recommendedPosts });
    } catch (error) {
        // Handle errors
        console.error('Error fetching recommended posts:', error);
        res.status(500).json({ error: 'An error occurred while fetching recommended posts' });
    }
};

exports.GetPosts = async(req,res) => {
    PostsModel.find({ contentCreator: req.userData["CC"].id })
    .populate('contentCreator')
    .then((posts,err) => {
        if (err) {
            console.error(err);
            return res.status(400).json({message : "Could not get the posts"});
        }
        const mappedResult = posts.map(post => ({
            _id: post._id,
            title: post.title,
            description: post.description,
            image_url: post.image_url,
            contenttypes: post.contenttypes
        }));
        return res.status(200).json({data : mappedResult})
    });
}
/*exports.GetData = async(req,res) => {
    const page = req.query.page || 1;
    const lastTimestamp = req.query.lastTimestamp || Date.now();
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    try {
        const data = await 
    } catch (error) {
        console.error(error);
        return res.status(500).json({"Could not fetch the data"});
    }
}*/
/*exports.AddDatainMessageModel = async(req,res) => {
    const Hirers = await HiringModel.find({});
    console.log(Hirers)
}*/