import Job from '../models/jobModel.mjs'

class JobController {
    static mainJobs(req, res) {
        const jobList = Job.loadJobList();
        jobList.forEach(job => {
            job.totalOfItems = job.count * job.price
        })
        res.render('jobs/jobMainPage', {
            jobs: jobList,
        })
    }
    static getJobItem(req, res) {
        const id = req.params.id
        const job = Job.getJobById(id);
        res.render('jobs/jobItem', {
            job,
        }, console.log(job))
    }
    static getForm(req, res) {
        res.render('jobs/jobForm', {})
    }
    static createJob(req, res) {
        const jobData = req.body
        Job.addJobItem(jobData)
        res.redirect('/job')
    }
}

export default JobController