const Job = require('../model/jobModel');
const ErrorResponse = require('../utils/errorResponse');

//create jobs category
exports.createJob = async (req, res, next) => {
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}


exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

//update job by id
exports.updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body,{new:true}).populate('jobType','jobTypeName').populate('user','firstName lastName');
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

exports.showJobs = async (req, res, next) => {
    // enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.find({}).estimatedDocumentCount();

    try {
        const jobs = await Job.find()
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages:Math.ceil(count/pageSize) ,  
            count
        })
    } catch (error) {
        next(error);
    }
}