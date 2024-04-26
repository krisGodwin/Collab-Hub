const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const HiringModel = require("../models/HiringModel.js");
const PostModel = require("../models/PostModel.js");
const ClickModel = require("../models/ClickModel.js")
const cloudinary = require('../utils/cloudinary');
const UploadFile = require("../middlewares/cloudinary_service.js");
const { v4: uuidv4 } = require('uuid');
const {UserModel,UserType} = require("../models/UserModel.js");
const axios = require('axios');
const Hiring = require("../models/HiringModel.js");
const Rating = require("../models/RatingModel.js")
exports.Register = async(req,res) => {
    try {
        const {name,email,password,Hirer} = req.body;
        let Hiring = await HiringModel.findOne({email : email});
        if(Hiring){
            return res.status(400).json({message : "User Already Present"});
        }
        const HiringNew = new HiringModel({
            _id : new mongoose.Types.ObjectId(),
            name: name,
            email : email,
            contentCreatorType:Hirer
        });
        const salt = await bcrypt.genSalt(10);
        HiringNew.password = await bcrypt.hash(password,salt);
        HiringNew.userType = UserType.Hiring
        await HiringNew.save()
        .then((saved,err) => {
            if(saved){
                return res.status(200).json({message : "Created Hirer Successfully"});
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
        const HirerPresent = await HiringModel.findOne({email : email});
        if(!HirerPresent){
            return res.status(400).json({message : "Sponsor not Present"});
        } 
        const isMatch = await bcrypt.compare(password,HirerPresent.password);
        if(!isMatch){
            return res.status(400).json({message : "Incorrect password"});
        }
        const Postexists = await PostModel.findOne({contentCreator: HirerPresent._id})
        const payload = {
            HH : {
                id : HirerPresent._id,
                "hirer" : true
            }
        }
        if(Postexists){
            jwt.sign(payload,process.env.JWT_KEY,{expiresIn : 3600},(err,token)=>{
                if (err) throw err;
                res.status(200).json({_id : HirerPresent._id,_token : token, _post: true,name: HirerPresent.name})
            })
        } else {
            jwt.sign(payload,process.env.JWT_KEY,{expiresIn : 3600},(err,token)=>{
                if (err) throw err;
                res.status(200).json({_id : HirerPresent._id,_token : token, _post: false, name: HirerPresent.name})
            })
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message : "Could not login"})
    }
}
exports.Profile = async(req,res) => {
    const HirerData = await HiringModel.findById(req.userData["HH"].id);
    return res.status(200).json({email : HirerData["email"],role : req.userData["HH"].role})
}
exports.Home = async(req,res) => {
    try {
        const {id} = req.userData["HH"];
        const HiringPresent = await HiringModel.findById(id);
        if(!HiringPresent){
            return res.status(400).json({message : "User does not exist"});
        }
        const pageSize = 5;
        const pageNumber = req.query.page || 1;
        const startIndex = (pageNumber - 1)* pageSize;
        const endIndex = startIndex + pageSize;
        const posts = await PostModel.find({}).populate('contentCreator').sort({ createdDate: -1 });
        const postsToSend = posts.slice(startIndex,endIndex);
        return res.status(200).json({data : postsToSend,total : postsToSend.length})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message : "Server Error"})
    }
    
}
exports.GetContent = async(req, res) => {
    const { user_id } = req.query
    const posts = await PostModel.find({ contentCreator : user_id})
    return res.status(200).json({data: posts})
}

exports.UpdatePost = async(req, res) => {
    const {title,description,contenttypes,ytlink,instlink,totalvideos,totalsubscriber,totalviews,contentCreatorType} = req.body;
    const image_file = req.body.filename;
    await PostModel.deleteMany({ contentCreator: req.userData['HH'].id });
    const result = await cloudinary.uploader.upload(image_file, {
        folder: "products",
        // width: 300,
        // crop: "scale"
    })
    const id=uuidv4()

    const ContentArray = Array.isArray(contenttypes) ? contenttypes : [contenttypes];
    console.log(ContentArray[0])
        const newPost = new PostModel({
            id:id,
            title : title,
            description : description,
            youtube_link: ytlink,
            instagram_link: instlink,
            image_url : result.url,
            contenttypes : ContentArray,
            contentCreator : req.userData["HH"].id,
            contentCreatorType: contentCreatorType
        });
        await newPost.save() 
        return res.status(204).json({})
    
}
exports.AddContent = async(req,res) => {
    console.log(req.cookies.jwt)
    const {title,description,ytlink,instlink,contenttypes, contentCreatorType} = req.body;
    const image_file = req.body.filename;
    const result = await cloudinary.uploader.upload(image_file, {
        folder: "products",
        // width: 300,
        // crop: "scale"
    })
    const id=uuidv4()
    console.log(req.userData["HH"].id)
    const ContentArray = Array.isArray(contenttypes) ? contenttypes : [contenttypes];
        const newPost = new PostModel({
            id:id,
            title : title,
            description : description,
            youtube_link: ytlink,
            instagram_link: instlink,
            image_url : result.url,
            contenttypes : ContentArray,
            contentCreator : req.userData["HH"].id,
            contentCreatorType: contentCreatorType
        });
        await newPost.save() 
        return res.status(204).json({})
}

exports.GetAlPosts = async(req, res) => {
    const { user_id } = req.query; 
    const hirer=await Hiring.find({_id:user_id})
    console.log(hirer[0].isFirstTime)
    if(hirer[0].isFirstTime){
        const posts = await PostModel.find({contentCreatorType:"CC" })
        return res.status(200).json({data: posts})

    } 
    else{ 
        const posts = await hirer[0].populate('recommendations')
        // console.log(posts.recommendations)
        return res.status(200).json({data: posts.recommendations})
    }
}
exports.GetOnePost = async (req, res) => {
    const { id, user_id } = req.query; // Retrieve id from query parameters
    const posts = await PostModel.find({ _id: id })
        .then(async (posts, err) => {
            if (err) {
                console.error(err)
                return res.status(400).json({ message: "Could not get the posts" });
            }
            //console.log(id,user_id)

// Recommendations
            const user=await HiringModel.findOne({_id:user_id})
            //console.log(user.name)
            //console.log(posts[0].id)
            if (user || user.isFirstTime) {
                const response = await axios.post("http://localhost:5000/prediction", {
                  id:parseFloat (posts[0].id),
                });
              const idsArray = response.data.ids.map(id => id.toString());
              // Using $in to find records with matching IDs
              const rec1 = await PostModel.find({ id: { $in: idsArray } });
                user.isFirstTime = false;
             // Push the _ids of rec1 to the recommendations field
                user.recommendations = rec1.map(post => post._id);
                
                // Save the updated user document
                await user.save()
                const user_posts = await PostModel.find({ contentCreator: user_id })
            //console.log(user_posts[0].contenttypes[0])
            const existingRating = await Rating.findOne({ sponsor_id: id, creator_id: user_id });
            if (existingRating) {
                existingRating.click_count++; // Increment click count
                await existingRating.save(); // Save the updated rating
            } else {
            const rating = new Rating({
                sponsor_id: id, 
                creator_id: user_id,
                sponsor_type:user_posts[0].contenttypes[0],
                creator_type:posts[0].contenttypes[0],
                Fix_rating:parseInt((0.2*posts[0].Total_Views)+(0.4*posts[0].Subscriber_Count)+(0.2*posts[0].No_of_videos)),
                click_count: 1
                });
            await rating.save();
            }
            }
            const mappedResult = posts.map(post => ({
                _id: post._id,
                title: post.title,
                userid: post.contentCreator,
                description: post.description,
                youtube_link: post.youtube_link,
                instagram_link: post.instagra_link,
                image_url: post.image_url,
                contenttypes: post.contenttypes
            }));
            return res.status(200).json({ data: mappedResult });
        })
}
exports.Counter = async(req,res) => {
    try {
        const {id} = req.userData["HH"].id;
        let clickCount = await ClickModel.findOne({ hirer: id })
        const post = await PostModel.findById(req.params.postId);
        const categories = post.contenttypes;
        const newClickCount = new ClickModel({
            Hirer : id,
            count : 0
        })
        console.log(newClickCount)
        /*if (!clickCount) {
        let clickCountNew = new ClickModel({
            counts: categories.map(category => ({ category, count: 1 })),
            hirer : id,
        });
        
        } else {
        categories.forEach(category => {
            const categoryIndex = clickCount.counts.findIndex(item => item.category === category);
            if (categoryIndex !== -1) {
            clickCount.counts[categoryIndex].count += 1;
            } else {
            clickCount.counts.push({ category, count: 1 });
            }
        });
        }
        await clickCount.save();
        res.json({ success: true, message: 'Click count updated successfully.' });*/

    } catch (error) {
        console.error(error);
        return res.status(500).json({message : "Server Error"});
    }
}