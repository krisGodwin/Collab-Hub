const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const HiringModel = require("../models/HiringModel.js");
const PostModel = require("../models/PostModel.js");
const ClickModel = require("../models/ClickModel.js")
const {UserModel,UserType} = require("../models/UserModel.js")
exports.Register = async(req,res) => {
    try {
        const {email,password} = req.body;
        let Hiring = await HiringModel.findOne({email : email});
        if(Hiring){
            return res.status(400).json({message : "User Already Present"});
        }
        const HiringNew = new HiringModel({
            _id : new mongoose.Types.ObjectId(),
            email : email
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
            return res.status(400).json({message : "Content Creator not Present"});
        }
        const isMatch = await bcrypt.compare(password,HirerPresent.password);
        if(!isMatch){
            return res.status(400).json({message : "Incorrect password"});
        }
        const payload = {
            HH : {
                id : HirerPresent._id,
                "hirer" : true
            }
        }
        jwt.sign(payload,process.env.JWT_KEY,{expiresIn : 3600},(err,token)=>{
            if (err) throw err;
            res.status(200).json({_id : HirerPresent._id,token : token})
        })
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