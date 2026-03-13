
const Review = require('../models/Review');
const Assignment = require('../models/Assignment');

exports.submitReview = async (req,res)=>{

try{

const {assignmentId, reviewerId, rubricScore, feedback} = req.body;

const assignment = await Assignment.findById(assignmentId);

if(!assignment) return res.status(404).json({error:"Assignment not found"});

if(!assignment.assignedReviewers.includes(reviewerId))
return res.status(403).json({error:"Not assigned reviewer"});

const existing = await Review.findOne({assignmentId, reviewerId});

if(existing) return res.status(400).json({error:"Duplicate review"});

const review = new Review({
assignmentId,
reviewerId,
rubricScore,
feedback
});

await review.save();

const reviewCount = await Review.countDocuments({assignmentId});

if(reviewCount === 3){
assignment.status = "Completed";
}else{
assignment.status = "Under Review";
}

await assignment.save();

const avg = await Review.aggregate([
{$match:{assignmentId: assignment._id}},
{$group:{_id:"$assignmentId", avgScore:{$avg:"$rubricScore"}}}
]);

res.json({review, averageScore: avg[0]?.avgScore || rubricScore});

}catch(err){
res.status(500).json({error:err.message});
}

};

exports.getReviewsByAssignment = async (req,res)=>{

const reviews = await Review.find({
assignmentId: req.params.assignmentId
});

res.json(reviews);

};

exports.getReviewsByReviewer = async (req,res)=>{

const reviews = await Review.find({
reviewerId: req.params.reviewerId
});

res.json(reviews);

};
