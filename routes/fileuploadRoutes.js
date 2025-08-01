const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const route= express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { singleFile,uploadArray,uploadFields } = require('../controllers/fileuploadController');

const moreFields= upload.fields([
    { name: 'pfp', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
    { name: 'pictures', maxCount: 3 }
])


route.post('/uploadsingle',upload.single("pfp"), singleFile)
route.post('/uploadarray',upload.array( "houses", 3), uploadArray)
route.post('/uploadfields',moreFields, uploadFields)

module.exports = route;