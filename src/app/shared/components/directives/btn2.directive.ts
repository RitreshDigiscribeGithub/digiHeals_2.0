import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[digi-button-inline]'
})
export class Btn2Directive {
  @Input() public color: string;
  private element = this._eleRef.nativeElement;

  constructor(
    private _renderer: Renderer2,
    private _eleRef: ElementRef
  ) { }

  private setColor(param) {
    if (param === 'theme') {
      this._renderer.setStyle(this.element, 'background', '#104b60')
    } else {
      this._renderer.setStyle(this.element, 'background', param)
    }
  }

  private btnClass() {
    this._renderer.addClass(this.element, 'digi-button-inline')
  }
  ngAfterContentChecked(): void {
    this.setColor(this.color)
  }
  ngAfterViewInit(): void {

    this.btnClass()
  }

}
