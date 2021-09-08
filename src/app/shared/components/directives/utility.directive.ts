import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[utility]'
})
export class UtilityDirective {
  @Input() public bg: string;
  @Input() public br: string;
  @Input() public minHeight: string;
  @Input() public w: string;
  @Input() public h: string;
  @Input() public border: string;
  private element = this._eleRef.nativeElement;
  // utility bg="red" br="" h="" w=""
  // border-radius: 4px;min-height: 41px; 
  constructor(
    private _renderer: Renderer2,
    private _eleRef: ElementRef
  ) { }

  applyStyle() {
    if (this.bg || this.br || this.minHeight || this.w) {
      if (this.bg) {
        this._renderer.setStyle(this.element, 'background', this.bg)
      } if (this.br) {
        this._renderer.setStyle(this.element, 'border-radius', this.br)
      } if (this.minHeight) {
        this._renderer.setStyle(this.element, 'min-height', this.minHeight)
      } if (this.w) {
        this._renderer.setStyle(this.element, 'width', this.w)
      } if (this.h) {
        this._renderer.setStyle(this.element, 'height', this.h)
      } if (this.border) {
        this._renderer.setStyle(this.element, 'border', this.border)
      }
    } else {
      console.error(`please use directive with utility (bg="" br="" min_h="" w="")`);
    }
  }

  ngOnInit(): void {
    this.applyStyle();
  }
}
