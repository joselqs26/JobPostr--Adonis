'use strict'

const Job = use('App/Models/Job.js')

class JobController {
    async home({ view }) {
        // Fetch job
        const jobs = await Job.all();

        return view.render(
            'index',
            { jobs: jobs.toJSON() }
        )
    }

    async userIndex({ view, auth }) {
        const jobs = await auth.user.jobs().fetch();

        return view.render('jobs', { jobs: jobs.toJSON() })
    }

    async create({ request, response, session, auth }) {
        const job = request.all();

        const posted = await auth.user.jobs().create({
            title: job.title,
            descrition: job.descrition,
            link: job.link
        })

        session.flash({ message: 'Your job has been posted!' })
        return response.redirect('back')

    }

    async delete({ response, session, params }) {
        const job = await Job.find(params.id);

        await job.delete();

        session.flash({ message: 'Your job has been deleted!' })
        return response.redirect('back')
    }

    async edit({ params, view }) {
        const job = await Job.find(params.id);
        return view.render('edit', { job: job.toJSON() });
    }

    async update({ request, response, session, params }) {
        const job = await Job.find(params.id);

        job.title = request.all().title;
        job.descrition = request.all().descrition;
        job.link = request.all().link;

        await job.save();

        session.flash({ message: 'Your job has been updated!' })
        return response.redirect('/post-a-job')

    }
}

module.exports = JobController
