
const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');

router.post('/', controller.submitReview);
router.get('/:assignmentId', controller.getReviewsByAssignment);
router.get('/reviewer/:reviewerId', controller.getReviewsByReviewer);

module.exports = router;
