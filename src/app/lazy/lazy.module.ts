import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './lazy.component';

@NgModule({
  declarations: [LazyComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [LazyComponent]
})
export class LazyModule {
  // This line is important
  static entry = LazyComponent;
}
