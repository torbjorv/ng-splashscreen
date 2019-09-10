import { Component, SystemJsNgModuleLoader, Injector, ViewContainerRef, NgModuleFactory, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('fadeIn', [
      state('void, false', style({
        opacity : 0
      })),
      state('true', style({
        opacity: 1,
      })),
      transition('* => true', [
        animate('1s')
      ]),
    ])
  ]
})
export class AppComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: false })
  private _container: ViewContainerRef;

  public lazyChild: any;
  public loaded = true;

  constructor(
    // This class is deprecated on Angular 8, not sure how to solve this in the future
    // tslint:disable-next-line: deprecation
    private _loader: SystemJsNgModuleLoader,
    private _injector: Injector) { }

  ngOnInit() {
    setTimeout(() => this.load('src/app/lazy/lazy.module#LazyModule'), 1);
  }

  private load(moduleId: string): void {
    this._loader.load(moduleId).then((moduleFactory: NgModuleFactory<any>) => {
      const moduleRef = moduleFactory.create(this._injector);
      const entryComponent = (moduleFactory.moduleType as any).entry;
      const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);

      // Will be added as a _sibling_ of the container
      const componentRef = this._container.createComponent(compFactory);
      this.lazyChild = componentRef.instance;
    });
  }
}
