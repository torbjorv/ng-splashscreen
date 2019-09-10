import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.sass'],
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
export class LazyComponent implements OnInit {

  public progress = 0;

  constructor() { }

  ngOnInit() {
    for (let i = 10; i <= 100; i += 10) {
      setTimeout(() => this.progress = i, 100 + i * 20);
    }
  }
}
