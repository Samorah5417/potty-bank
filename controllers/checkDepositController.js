const CheckDeposit = require('../models/CheckDepositModel')
const cloudinary = require('cloudinary').v2

const depositCheck = async (req, res) => {
  try {

    const { front_check, back_check } = req.files;

    // Ensure both front_check and back_check files are provided
    if (!front_check || !back_check) {
      return res.status(400).json({
        status: "failed",
        error: "front_check and back_check images are required!",
      });
    }

    // Validate file types (example: allow only JPEG and PNG)
    const allowedMimeTypes = ["image/jpeg", "image/png"];
    if (
      !allowedMimeTypes.includes(front_check.mimetype) ||
      !allowedMimeTypes.includes(back_check.mimetype)
    ) {
      return res.status(400).json({
        status: "failed",
        error: "Only JPEG and PNG images are allowed for front_check and back_check!",
      });
    }
    const front_checkResult = await cloudinary.uploader.upload(
      front_check.tempFilePath,
      {
        use_filename: true,
        folder: "front_check_images",
      }
    );

    const back_checkResult = await cloudinary.uploader.upload(back_check.tempFilePath, {
      use_filename: true,
      folder: "back_check_images",
    });
    const userData = {
      ...req.body,
      front_check: front_checkResult.secure_url,
     back_check: back_checkResult.secure_url,
    
    };

    const check = await CheckDeposit.create(userData);

    return res.status(200).json({
      status: "success",
      message: "Registration successful",
      check,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", error: error.message });
  }
};


module.exports = {
    depositCheck
}