import { Comments, Blogs, Images, Admin, Sitemap, Robot } from './routes/';

//https://github.com/scotch-io/node-todo/tree/master/app
module.exports = function (app) {

    //REST API - COMMENTS
    app.use('/comments', Comments);

    //REST API - BLOGS
    app.use('/blogs', Blogs);

    //REST API - IMAGES
    app.use('/images', Images);

    //REST API - ADMIN
    app.use('/admin', Admin);

    //REST API - SITEMAP
    app.use('/sitemap', Sitemap);

    //REST API - ROBOT
    app.use('/robots.txt', Robot);


   //Angular Application
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};