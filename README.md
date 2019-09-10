### Angular splashscreen
Started out with the typical approach of adding the splash screen in index.html, like [here](https://medium.com/@tomastrajan/how-to-style-angular-application-loading-with-angular-cli-like-a-boss-cdd4f5358554). This works great on Chrome and Safari on OSX, but not so well on IOS. On IOS, for whatever reason, the index.html is not rendered until the _entire_ Angular is loaded and parsed. So the splash screen won't show at all and you simply have a white screen until the app suddenly appears.

To work around this issue, I go the following route:
- Have an AppComponent that is as lightweight and fast as possible. This is the splash screen.
- Any child components are lazy loaded programmatically (not through routes).

It's not perfect, but for my case it looks better.

### steps
- generated new project without routing
- generated new module 'ng generate module lazy'
- generated new component 'ng generate component lazy --module lazy'
- added the 'entryComponent' to the LazyComponent definition
- added the new lazy module in angular.json under 'lazyModules'
- setup the AppComponent to lazy load LazyModule
- added SystemJsNgModuleLoader to providers in AppModule
