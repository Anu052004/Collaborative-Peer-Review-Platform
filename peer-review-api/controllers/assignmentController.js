
const Assignment = require('../models/Assignment');

exports.createAssignment = async (req,res)=>{
try{
const {assignmentTitle, studentName, studentId, fileURL, submissionDate, reviewers} = req.body;

if(!assignmentTitle) return res.status(400).json({error:"assignmentTitle required"});

if(!reviewers || reviewers.length !== 3) return res.status(400).json({error:"Exactly 3 reviewers required"});

if(reviewers.includes(studentId)) return res.status(400).json({error:"Reviewer cannot be assignment owner"});

const assignment = new Assignment({
assignmentTitle,
studentName,
studentId,
fileURL,
submissionDate,
assignedReviewers: reviewers,
status: "Pending"
});

await assignment.save();

res.status(201).json(assignment);

}catch(err){
res.status(500).json({error:err.message});
}
};

exports.getAssignments = async (req,res)=>{
try{

const {status,page=1,limit=5} = req.query;

const filter = status ? {status} : {};

const assignments = await Assignment.find(filter)
.skip((page-1)*limit)
.limit(parseInt(limit));

res.json(assignments);

}catch(err){
res.status(500).json({error:err.message});
}
};

exports.getAssignmentById = async (req,res)=>{
try{

const assignment = await Assignment.findById(req.params.id);

if(!assignment) return res.status(404).json({error:"Assignment not found"});

res.json(assignment);

}catch(err){
res.status(400).json({error:"Invalid ID"});
}
};

exports.updateAssignment = async (req,res)=>{
try{

const assignment = await Assignment.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json(assignment);

}catch(err){
res.status(400).json({error:err.message});
}
};

exports.deleteAssignment = async (req,res)=>{
try{

await Assignment.findByIdAndDelete(req.params.id);

res.json({message:"Assignment deleted"});

}catch(err){
res.status(400).json({error:err.message});
}
};

exports.getAssignmentsByReviewer = async (req,res)=>{

const reviewerId = req.params.reviewerId;

const assignments = await Assignment.find({
assignedReviewers: reviewerId
});

res.json(assignments);
};
