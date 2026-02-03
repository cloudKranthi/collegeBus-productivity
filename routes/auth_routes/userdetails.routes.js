const express = require('express');
const router = express.Router(); // Changed 'app' to 'router' to be standard

// Middleware
const verifyJwt = require('../../middleware/auth.middleware');
const rolecheck = require('../../middleware/studentcheck.middeleware');
const upload = require('../../middleware/multer.middleware');



// 4. Use the unique function names in the routes
router.route('/avatar').post(
    verifyJwt, 
    upload.single('avatar'), 
(req, res, next) => {
    // This 'require' only runs when the user hits the /avatar endpoint
    const { uploadimage } = require('../../controllers/updatedetails.controllers.js/uploadimage');
    return uploadimage(req, res, next);
});


router.route('/studentProfile').patch(
    verifyJwt, 
    rolecheck, 
    upload.single('photo'), 
    (req, res, next) => {
    // This 'require' only runs when the user hits the /studentProfile endpoint
    const { parentphoto } = require('../../controllers/updatedetails.controllers.js/uploadparentdetails');
    return parentphoto(req, res, next);
});


module.exports = router;