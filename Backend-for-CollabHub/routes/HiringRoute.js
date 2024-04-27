const router = require("express").Router();
const HiringController = require("../controllers/HiringController.js");
const AuthCheckerHiring = require("../middlewares/ca_hiring.js")
const fileUpload = require("../middlewares/upload.js");

router.post("/register",HiringController.Register);
router.post("/login",HiringController.Login);
router.get("/profile",AuthCheckerHiring,HiringController.Profile);
router.get("/home",AuthCheckerHiring,HiringController.Home);

router.post("/addpost",AuthCheckerHiring,fileUpload.single("image"),HiringController.AddContent);
router.get("/getonepost",HiringController.GetOnePost)
router.get("/getallposts",HiringController.GetAlPosts)
router.post("/updatepost",AuthCheckerHiring,fileUpload.single("image"),HiringController.UpdatePost)
router.get("/getcontent",HiringController.GetContent)
router.post("/:postId",AuthCheckerHiring,HiringController.Counter);
module.exports = router;