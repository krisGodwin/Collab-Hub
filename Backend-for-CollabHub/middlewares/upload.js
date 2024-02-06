exports.AddContent = async(req,res) => {
    const {title,description,contenttypes} = req.body;
    const image_file = req.file.filename;
    await UploadFile("./images/" + image_file)
    .then(async(publicID,err)=>{
        if(err){
            return res.status(400).json({message : "Could not create the post"});
        }
        const ContentArray = Array.isArray(contenttypes) ? contenttypes : [contenttypes];
        const newPost = new PostsModel({
            title : title,
            description : description,
            image_url : publicID,
            contenttypes : ContentArray,
            contentCreator : req.userData["CC"].id
        });
        await newPost.save()
        .then((saved,err) => {
            if(err){
                return res.status(400).json({message : "Could not save the post"});
            }
            return res.status(200).json({message : "Post created successfully"})
        })
    })
}