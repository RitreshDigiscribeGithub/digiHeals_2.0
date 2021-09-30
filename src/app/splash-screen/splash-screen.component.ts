import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.less'],
})
export class SplashScreenComponent implements OnInit {
  showSplash: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.increase();
  }

  count: number = 10;
  increase() {
    setInterval(() => {
      this.count = this.count + 10;
      if (this.count > 100) {
        this.count = 100;
        this.showSplash = false;
      }
    }, 300);
  }
}
