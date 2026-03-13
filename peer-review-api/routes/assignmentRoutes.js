
const express = require('express');
const router = express.Router();
const controller = require('../controllers/assignmentController');

router.post('/', controller.createAssignment);
router.get('/', controller.getAssignments);
router.get('/reviewer/:reviewerId', controller.getAssignmentsByReviewer);
router.get('/:id', controller.getAssignmentById);
router.put('/:id', controller.updateAssignment);
router.delete('/:id', controller.deleteAssignment);

module.exports = router;
