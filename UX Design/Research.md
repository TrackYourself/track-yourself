#UX Design
----------
## User Stories
As written by Anna Luisa, Cheslea and Josh during project overview and scope.

Outcome for Users:

* Tell if a particular habit/behavior is effective
* Tell what is contributing to a symptom/problem
* Have concrete information to help you prioritize what habits to work on
* Feel better

Example User Stories:

* I want to change a habit and want to see if it affects my energy level
* I feel fatigued and don’t know why - I want to track various possible factors and see what correlation there is between these factors and my fatigue.

## 
==================

##Design Process  
Done by Liz
###Competitive Apps Overview  
Research by Liz during design phase before creating style tiles and wireframes.

Track Yourself app is aiming at what appears to be a gap in other existing apps. There are multiple fitness apps focusing on food, exercise and sleep but missing mood components. There are symptom tracking apps focused on diagnosing illness and not on health choices. There were not apps that tracked exercise, water, sleep, mode and energy in the manner we have designed.

####Design Pattern Observations from Competitors' Apps

* blues, greens, accent oranges or reds, black/dark grey type on white backgrounds
* black sans-serif and slab serif fonts
* flat look
* mainly mobile apps - Mobile First!
* either all in line or 2/3rds main content with 1/3rd aside and/or navigational content
* top nav
* upper-left corner icon/logo links back to homepage
* login/logout upper right corner
* footer links in the bottom towards different sections, contact us, copyright
* trend towards flatter look, squarer buttons, especially when using square bar graphs
* entry via text areas, sliders, check boxes, radial buttons and calendar date selection

###Starting Design  
####Choosing Colors
Based on research, a color scheme of blues and aqua with orange and red accents colors chosen. Adobe's [Kular website](https://kuler.adobe.com/create/color-wheel/) used as resource for looking at possible color themes and choosing final options.

####Wireframes
Began with a mobile-first approach using a simple design of dark header and footer with single column content underneath. For landing page and user dashboard, created two column feel for main content for desktop which, via @media and min-width media queries, became single column on portrait tablet views and all mobile view orientations. Used Adobe Illustrator to draw greyscale wireframes for both desktop and mobile views.

####User Flow
Based on group meetings and project scope document, wrote user flow using .dot notation. See Track_Yourself_User_Flow.dot or Track_Yourself_User_Flow.pdf for user flow diagram.

####Logo
Logo is inspired by D3 graphs that will be used on the site. Square font chosen to closely match rectangular bar graphs. Logo went through 4 iterations before being finalized with feedback from team during the design process.

###Front-End Code Choices
Initial HTML templates written using Jade and extends. Templates were converted into HTML before adding angular (ng-) tags and javascript hooks.  
Styles written in Sass that was compiled into CSS by grunt-sass.