import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[digi-btn]'
})
export class BtnDirective {
  @Input() public color: string;
  @Input() public ghost: boolean;
  private element = this._eleRef.nativeElement;

  constructor(
    private _renderer: Renderer2,
    private _eleRef: ElementRef
  ) { }

  private setColor(param) {
    let isTheme = this.color == 'theme' ? '#104b60' : param
    if (this.ghost) {
      this._renderer.setStyle(this.element, 'background', 'white')
      this._renderer.setStyle(this.element, 'border', `1.5px solid ${isTheme}`)
      this._renderer.setStyle(this.element, 'color', `${isTheme}`)
    } else {
      if (param === 'theme') {
        this._renderer.setStyle(this.element, 'background', isTheme)
        this._renderer.setStyle(this.element, 'color', '#ffffff')
      } else {
        this._renderer.setStyle(this.element, 'background', param)
      }
    }
  }

  private btnClass() {
    this._renderer.addClass(this.element, 'digi-button')
  }

  ngAfterContentChecked(): void {
    this.setColor(this.color)
  }
  ngAfterViewInit(): void {
    this.btnClass()
  }
}

// <button nz-button digi-btn color="theme">English</button>