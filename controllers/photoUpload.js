const cloudinary = require("cloudinary").v2;
const User = require("../models/UserModel");

const passportUpload = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ error: "Please provide a valid image for upload." });
    }

    const passportImage = req.files.image;

    // Check for MIME type
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedMimeTypes.includes(passportImage.mimetype)) {
      return res
        .status(400)
        .json({ error: "Only JPEG, PNG, and GIF images are allowed." });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(
      passportImage.tempFilePath,
      {
        use_filename: true,
        folder: "bank_passport_image",
      }
    );

    // Update user document to store passport photo URL
    const userId = req.user.userId; // Assuming req.user.userId contains the user's ID
    const user = await User.findByIdAndUpdate(
      userId,
      { passportPhoto: result.secure_url },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Respond with the URL of the uploaded image
    res.status(200).json({ passportPhoto: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const identificationUpload = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ error: "Please provide a valid image for upload." });
    }

    const identificationImage = req.files.image;

    // Check for MIME type
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedMimeTypes.includes(identificationImage.mimetype)) {
      return res
        .status(400)
        .json({ error: "Only JPEG, PNG, and GIF images are allowed." });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(
      identificationImage.tempFilePath,
      {
        use_filename: true,
        folder: "bank_identification_image",
      }
    );

    // Update user document to store identification photo URL
    const userId = req.user.userId; // Assuming req.user.userId contains the user's ID
    const user = await User.findByIdAndUpdate(
      userId,
      { identification_photograph: result.secure_url },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Respond with the URL of the uploaded image
    res.status(200).json({ identification_photograph: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  identificationUpload,
  passportUpload
};



