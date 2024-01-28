const router = require("express").Router();
const ContentCreatorController = require("../controllers/ContentCreatorController.js")
const AuthCheckerContent = require("../middlewares/ca_content.js");
const fileUpload = require("../middlewares/upload.js");
router.post("/register",ContentCreatorController.Register);
router.post("/login",ContentCreatorController.Login);
router.get("/profile",AuthCheckerContent,ContentCreatorController.Profile);
router.post("/addpost",AuthCheckerContent,fileUpload.single("image"),ContentCreatorController.AddContent);
router.get("/getposts",AuthCheckerContent,ContentCreatorController.GetPosts);
//router.post("/message",ContentCreatorController.AddDatainMessageModel);
module.exports = router;