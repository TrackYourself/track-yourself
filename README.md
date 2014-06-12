A web app to help you see how different habits, behaviors and external factors affect you.

## Development

Backend                                         |Front-end                              |Testing  | Development tools
----------------------------------------------------|-----------------------------------|---------|--------
[Mongodb](http://docs.mongodb.org/manual/)        |[Angular](https://docs.angularjs.org/api) |[Mocha](http://visionmedia.github.io/mocha/#table-of-contents) | [Grunt](http://gruntjs.com)
[Mongoose](http://mongoosejs.com/docs/guide.html) | [jQuery](http://api.jquery.com/) | [Chai](http://chaijs.com/api/bdd/) | [Browserify](https://github.com/substack/node-browserify#usage)
[Node.js](http://nodejs.org/api/) | [D3](https://github.com/mbostock/d3/wiki) (data visualization) | [Karma](http://karma-runner.github.io/0.12/index.html) & [karma-browserify](https://github.com/xdissent/karma-browserify) | [Bower](http://bower.io/) & [debowerify](https://www.npmjs.org/package/debowerify)
[Express](http://expressjs.com/4x/api.html) |Sass, [Bourbon](http://bourbon.io/) |

### Tasks, bugs, to-dos
* Asana for tasks that don't involve code (research, etc).
* Github issue tracker for tasks that involve the codebase.
* Assign yourself to anything that you're currently working on.

### Project structure
Based on [meanjs.org folder structure](http://meanjs.org/docs.html#folder-structure)
and [angular docs](https://docs.angularjs.org/guide/module), with some adaptations
(folder naming conventions, project size).

Notes/explanation:
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
* I'm not 100% sure on the best place to handle client-side routes, but it looks from
  [angular docs](https://docs.angularjs.org/tutorial/step_07#the-app-module) like that goes in the
  main module file.
* **Changed**: I originally had folders for each component (controllers, directives, etc) within
  each module, but when I started working on the sleep module that seemed like overkill, so I've
  changed it: a folder for each component that will typically hold more than one file (tests, 
  templates). Other components can be in a file.

```
├── app                               client-side code
│   ├── application.js                define and configure the angular application
│   ├── modules                       angular modules
│   │   ├── core                      core module for app-wide code
│   │   │   ├── core-controllers.js   angular controllers
│   │   │   ├── core-directives.js    angular directives
│   │   │   ├── core-services.js      angular services
│   │   │   ├── templates             angular templates (html with angular attributes/elements)
│   │   │   ├── img                   images
│   │   │   ├── styles                sass
│   │   │   ├── tests                 tests for this module
│   │   │   └── core-module.js        defines and configures the model, including routes
│   │   └── users                     just as an example, we might have another module for handling users
│   │       ├── user-controllers.js
│   │       ├── user-services.js
│   │       ├── templates
│   │       ├── tests
│   │       └── user-module.js
│   │
│   └── bower_components               client-side external packages
│       ├── angular
│       ├── angular-route              gives us $routeProvider service
│       ├── angular-resource           gives us $resourceProvider service
│       └── d3                         if we end up using it
│
├── backend                            server-side code
│   ├── models                         mongoose schemas & models
│   ├── api                            REST api code for communication with front-end
│   ├── templates                      html pages served by express
│   │   ├── 404.html                   custom not found page
│   │   └── 500.html                   custom server error page
│   ├── tests                          tests for server-side code
│   └── router.js                      express router
│
├── views                              server-side handlebars templates. would ideally be inside backend
│
├── config                             application configuration (anything that doesn't need to be in root folder)
│   ├── config.js                      if we have any config we'd use outside of gruntfile (file globs etc)
│   └── karma.conf.js                  karma configuration (we can set up gruntfile so karma know to find conf file here)
│
├── dist                               processed, minified client-side code
│
├── db                                 local mongo database (.gitignored)
│
├── node_modules                       non-client-side deps (mostly dev deps)
│
├── bower.json                         define bower package dependencies
├── .bowerrc                           tell bower to install at app/bower_components
├── .gitignore                         don't version control db, node_modules, bower_components
├── Gruntfile.js
├── .jshintrc                          agreed upon linting rules for project
├── package.json                       npm dependencies
├── Procfile                           if we use heroku, tells it how to launch app
├── README.md
└── server.js                          create node/express server, connect to db
```

