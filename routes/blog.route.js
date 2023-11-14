const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
let blogSchema = require("../modoles/Blog");

router.route("/create-blog").post(async (req, res, next) => {
  await blogSchema
    .create({
      title: req.body.blogTitle,
      content: req.body.blogContent,
      author: req.body.authorName,
      summary: req.body.blogSummary,
      img: req.body.blogImage
    })
    .then((blog) => {
      res.json({ blog });
    })
    .catch((err) => {
      return next(err);
    });
});

router.route("/get-blogs").get(async (req, res, next) => {
  await blogSchema
    .find()
    .then((blog) => {
      res.json({ blog });
    })
    .catch((err) => {
      return next(err);
    });
});

router.route("/:id").get(async (req, res, next) => {
  await blogSchema
    // .findOne({ _id: req.params.id})
    .findById(req.params.id)
    .then((blog) => {
      res.json({ blog });
    })
    .catch((err) => {
      return next(err);
    });
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dcpd7i0zc",
  api_key: "354234741369889",
  api_secret: "8FUZusYwpF1hYk9do4aZVk1Y50g",
});

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);

    // console.log(result);

    return { url: result.url, public_id: result.public_id };
  } catch (error) {
    throw new Error("Error uploading to Cloudinary");
  }
};

router.route("/updateIMG").post(upload.single("pic"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // console.log(req.body)

    // Upload the profile picture to Cloudinary
    const cloudinaryResponse = await uploadToCloudinary(req.file);

    // await blogSchema.findOneAndUpdate(
    //   { _id: req.body._id },
    //   { $set: { img: cloudinaryResponse.url } },
    //   { new: true }
    // );

    res.json({ success: true, img: cloudinaryResponse.url });
  } catch (error) {
    console.log(error)
    console.error(error);
  }
});


module.exports = router;
