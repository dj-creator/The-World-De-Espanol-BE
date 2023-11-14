const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const userSchema = require("../modoles/User"); 

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dcpd7i0zc",
  api_key: "354234741369889",
  api_secret: "8FUZusYwpF1hYk9do4aZVk1Y50g",
});

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return { url: result.url, public_id: result.public_id };
  } catch (error) {
    throw new Error("Error uploading to Cloudinary");
  }
};

router.route("/updatePFP").post(upload.single("pfp"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Upload the profile picture to Cloudinary
    const cloudinaryResponse = await uploadToCloudinary(req.file);

    await userSchema.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { pfp: cloudinaryResponse.url } },
      { new: true }
    );

    res.json({ success: true, message: "Profile picture updated successfully" });
  } catch (error) {
    console.error(error);
  }
});


// Create user route
router.route("/create-user").post(async (req, res, next) => {
  console.log("create user");
  console.log(req.body);

  await userSchema
    .create(req.body)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      return next(err);
    });
});

// Login route
router.route("/login").post(async (req, res, next) => {
  const { username, password } = req.body;

  await userSchema
    .findOne({ username })
    .then((user) => {
      if (!user || user.password !== password) {
        res.status(401).json({ success: false, message: "Incorrect username or password" });
      } else {
        res.json({ success: true, user });
      }
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
