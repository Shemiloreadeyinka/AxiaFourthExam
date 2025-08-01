
const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv');
dotenv.config();
const fs= require("fs/promises")
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.singleFile = async (req, res) => {

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'uploads',
    });
    await fs.unlink(req.file.path); 
    res.status(200).json({
      message: 'File uploaded successfully',
      url: result.secure_url,
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
}

exports.uploadArray = async (req, res) => {

  try {
    const results = await Promise.all(
      req.files.map(file =>
        cloudinary.uploader.upload(file.path, { folder: 'uploads' })
      )
    );
    await Promise.all(req.files.map(file => fs.unlink(file.path)));
    res.status(200).json({
      message: 'Files uploaded successfully',
      urls: results.map(result => result.secure_url),
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
}
exports.uploadFields = async (req, res) => {
 try {
    const pfpResult = await cloudinary.uploader.upload(req.files.pfp[0].path, { folder: 'uploads' });
    const coverResult = await cloudinary.uploader.upload(req.files.cover[0].path, { folder: 'uploads' });
    const picturesResults = await Promise.all(
      req.files.pictures.map(file =>
        cloudinary.uploader.upload(file.path, { folder: 'uploads' })
      )
    );
    await fs.unlink(req.files.pfp[0].path);
    await fs.unlink(req.files.cover[0].path);
    await Promise.all(req.files.pictures.map(file => fs.unlink(file.path)));
    res.status(200).json({
      message: 'Files uploaded successfully',
      pfpUrl: pfpResult.secure_url,
      coverUrl: coverResult.secure_url,
      picturesUrls: picturesResults.map(result => result.secure_url),
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
}