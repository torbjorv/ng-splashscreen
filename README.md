[![CircleCI](https://circleci.com/gh/torbjorv/ng-splashscreen/tree/master.svg?style=svg)](https://circleci.com/gh/torbjorv/workflows/ng-splashscreen)

### Deployments
[Prod](https://torbjorv.github.io/ng-splashscreen) | 
[Dev](https://torbjorv.github.io/ng-splashscreen/versions/latest) | 
[All](https://github.com/torbjorv/ng-splashscreen/blob/gh-pages/versions/versions.md)

## Angular splashscreen

### Goal
I want a pretty splash/loading screen for another app I'm working on. Showing a logo or something and maybe a progress/loading bar.

### Issue
The typical Angular approach (like [here](https://medium.com/@tomastrajan/how-to-style-angular-application-loading-with-angular-cli-like-a-boss-cdd4f5358554)) works great on Chrome and Safari on OSX, but not so well on IOS. On IOS, for whatever reason, index.html is not rendered until the _entire_ Angular app is loaded and parsed, including child components. So the splash screen won't show at all and you simply have a white screen until the app suddenly appears.

If the magic Angular scripts could load async from index.html, I could still probably use the above approach, but this isn't possible with Angular CLI unless I make some fancy post-processing scripts. Feels too fragile. 

### Workaround
- Have an AppComponent that is as lightweight and fast as possible. This will the splash screen.
- Lazy load any child components programmatically (not through routes).

It's not perfect, but for my case it looks better.

### steps
- generated new project without routing
- generated new module 'ng generate module lazy'
- generated new component 'ng generate component lazy --module lazy'
- added the 'entryComponent' to the LazyComponent definition
- added the new lazy module in angular.json under 'lazyModules'
- setup the AppComponent to lazy load LazyModule
- added SystemJsNgModuleLoader to providers in AppModule
