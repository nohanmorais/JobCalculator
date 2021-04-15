const Job = require('../model/Job');
const JobUtilts = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
    async index(request, response) {
        const jobs = await Job.get();
        const profiles = await Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length,
        }

        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) => {
                
            const remaining = JobUtilts.remainingDay(job);
            const status = remaining <= 0 ? 'done' : 'progress';

            statusCount[status] += 1;

            jobTotalHours = status === 'progress' ? 
            jobTotalHours + Number(job["daily-hours"]) : jobTotalHours;

            return {
                ...job,
                remaining: remaining,
                status: status,
                budget: JobUtilts.calculateBudget(job, profiles["value-hour"]),
            };
        })



        const freeHours = profiles["hours-per-day"] - jobTotalHours;
    
        return response.render( "index", { updatedJobs, profile: profiles, statusCount: statusCount, freeHours: freeHours })
    }

}
