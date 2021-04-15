const Profile = require('../model/Profile');

module.exports = {
    async index(request, response) {
        
        const profiles = await Profile.get();

        return response.render("profile", { profile: profiles })
    },
    async update(request, response) {
        
        const data = request.body;

        const weeksPerYear = 52

        const weeksPerMonth = ((weeksPerYear - data["vacation-per-year"])/ 12);

        const weekTotalHours = (data["hours-per-day"] * data["days-per-week"]);

        const hoursWorkedInAMonth = weekTotalHours * weeksPerMonth;

        const valueHour = data["value-hour"] = data["monthly-budget"] / hoursWorkedInAMonth

        const profiles = await Profile.get();

        await Profile.update({ 
            ...profiles,
            ...request.body,
            "value-hour": valueHour,
        })

        return response.redirect('/profile');
    }
}