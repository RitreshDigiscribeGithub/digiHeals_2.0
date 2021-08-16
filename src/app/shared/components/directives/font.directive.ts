import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fs]'
})
export class FontDirective {
  @Input() public fs: string;
  @Input() public fw: string;
  @Input() public color: string;

  constructor(
    private _renderer: Renderer2,
    private _eleRef: ElementRef
  ) { }

  private element = this._eleRef.nativeElement;

  private addFs(value) {
    this._renderer.setStyle(this.element, 'font-size', value)
  }

  private addFw(value) {
    this._renderer.setStyle(this.element, 'font-family', `inter-${value}`)
  }

  private addColor(value) {
    this._renderer.setStyle(this.element, 'color', value)
  }

  private setFontSize(param) {
    if (param) {
      this.addFs(param)
    }
  }
  private setFontWeight(param) {
    if (param) {
      switch (param) {
        case 'xl-light':
          this.addFw(param)
          break;
        case 'light':
          this.addFw(param)
          break;
        case 'reg':
          this.addFw(param)
          break;
        case 'thin':
          this.addFw(param)
          break;
        case 'md':
          this.addFw(param)
          break;
        case 'bold':
          this.addFw(param)
          break;
        case 'semi-bold':
          this.addFw(param)
          break;
        case 'xl-bold':
          this.addFw(param)
          break;
        default:
          console.error('invalid font weight value , please use any one : xl-light,light,reg,thin,md,bold,semi-bold,xl-bold');

          break;
      }
    }
  }
  ngAfterViewInit(): void {
    this.setFontSize(this.fs);
    this.setFontWeight(this.fw);

  }
  ngAfterContentChecked(): void {
    this.addColor(this.color);
  }
}
