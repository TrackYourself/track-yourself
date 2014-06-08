A web app to help you see how different habits, behaviors and external factors affect you.

## Development

Backend                                         |Front-end                              |Testing  | Development tools
----------------------------------------------------|-----------------------------------|---------|--------
[Mongodb](http://docs.mongodb.org/manual/)        |[Angular](https://docs.angularjs.org/api) |[Mocha](http://visionmedia.github.io/mocha/#table-of-contents) | [Grunt](http://gruntjs.com)
[Mongoose](http://mongoosejs.com/docs/guide.html) | [jQuery](http://api.jquery.com/) | [Chai](http://chaijs.com/api/bdd/) | [Browserify](https://github.com/substack/node-browserify#usage)
[Node.js](http://nodejs.org/api/) | [D3](https://github.com/mbostock/d3/wiki) (data visualization) | [Karma](http://karma-runner.github.io/0.12/index.html) & [karma-browserify](https://github.com/xdissent/karma-browserify) | [Bower](http://bower.io/) & [debowerify](https://www.npmjs.org/package/debowerify)
[Express](http://expressjs.com/4x/api.html) |SCSS?  |

### Tasks, bugs, to-dos
* Asana for tasks that don't involve code (research, etc).
* Github issue tracker for tasks that involve the codebase.
* Assign yourself to anything that you're currently working on.

### Proposed project structure
Based on [meanjs.org folder structure](http://meanjs.org/docs.html#folder-structure)
and [angular docs](https://docs.angularjs.org/guide/module), with some adaptations
(folder naming conventions, project size).

Notes/explanation
* For this app we will have more server-side code than we've had before, so I thought it would make sense
  to put that in a folder like we discussed in class at one point. (Which is also what meanjs recommends)
* 'app' no longer makes a ton of sense for a folder name (I think 'public' might make more sense to indicate
  that it's for front end code), I just used it since it's what we're used to.
* Angular and meanjs.org both recommend completely modularizing pieces of your app
  * Each module can potentially have it's own styling, images, etc. as well as angular components
  * The 'core' module holds things that apply to everything (base styles, etc)
  * They put a tests folder inside each module, which I actually kind of like (rather than having a test
    directory in root with a bunch of subdirectories).  It should be easy to set up test runners using a
    pattern, and makes it obvious how much testing you have set up for each module.
* Meanjs has a very complicated config setup that seems like overkill for our scope, and also automates
  angular module loading, which I think would be useful if you already know angular, but might be more
  confusing for us.  So I left that out, but I liked a couple things from it:
    * If needed, having a config.js file where we define paths in our folder that we can reuse in other files
      (karma conf, gruntfile, maybe others)
    * Putting config files in a folder rather than root, where possible
* For each module, we'd only need a subset of the possible folders (e.g. we may not create custom
  directives at all, let alone in every module).  I listed all the possible folders under 'core' just
  as an example.  The angular docs link at top explains what the different module components are
* I'm not 100% sure on the best place to handle client-side routes, but it looks from
  [angular docs](https://docs.angularjs.org/tutorial/step_07#the-app-module) like that goes in the
  main module file.

```
├── app                             client-side code
│   ├── application.js              define and configure the application (which is a module that wraps the others)
│   ├── modules                     angular modules
│   │   ├── core                    application-wide code(not module-specific)
│   │   │   ├── controllers         angular controllers
│   │   │   ├── directives          angular directives
│   │   │   ├── services            angular services
│   │   │   ├── templates           angular templates (html with angular attributes/elements)
│   │   │   ├── img                 images
│   │   │   ├── styles              css/scss/sass
│   │   │   ├── tests               tests for this module
│   │   │   └── core-module.js      defines and configures the model, including routes
│   │   └── users                   just as an example, we might have another module for handling users
│   │       ├── controllers
│   │       ├── services
│   │       ├── templates
│   │       ├── tests
│   │       └── user-module.js
│   │
│   └── bower_components             client-side external packages
│       ├── angular
│       ├── angular-route            gives us $routeProvider service
│       └── d3                       if we end up using it
│
├── backend                          server-side code
│   ├── models                       mongoose schemas & models
│   ├── api                          REST api code for communication with front-end
│   ├── templates                    html pages served by express
│   │   ├── 404.html                 custom not found page
│   │   └── 500.html                 custom server error page
│   ├── tests                        tests for server-side code
│   └── router.js                    express router
│
├── config                           application configuration (anything that doesn't need to be in root folder)
│   ├── config.js                    if we have any config we'd use outside of gruntfile (file globs etc)
│   └── karma.conf.js                karma configuration (we can set up gruntfile so karma know to find conf file here)
│
├── dist                             processed, minified client-side code
│
├── db                               local mongo database (.gitignored)
│
├── node_modules                     non-client-side deps (mostly dev deps)
│
├── bower.json                       define bower package dependencies
├── .bowerrc                         tell bower to install at app/bower_components
├── .gitignore                       don't version control db, node_modules, bower_components
├── Gruntfile.js
├── .jshintrc                        agreed upon linting rules for project
├── package.json                     npm dependencies
├── Procfile                         if we use heroku, tells it how to launch app
├── README.md
└── server.js                        create node/express server, connect to db
```

