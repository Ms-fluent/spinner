import {svgnms} from './util';

export class MsSpinnerDot {
  private _element: SVGCircleElement;
  private _x: number;
  private _y: number;
  public _r: number;

  constructor(x: number, y: number, r: number) {
    const dot: SVGCircleElement = document.createElementNS(svgnms, 'circle');
    dot.classList.add('ms-spinner-dot');
    this._element = dot;
    this.x = x;
    this.y = y;
    this.r = r;
  }

  animateX(from: number, to: number, duration: number = 200): Promise<void> {

    return new Promise<void>(resolve => {
      this._element.animate([
        {'cx': `${from}`},
        {'cx': `${to}`}
      ], {duration, fill: 'both', easing: 'cubic-bezier(0, 0.75, 1, 0.25)'})
        .onfinish = () => {
        resolve();
        this.x = to;
      };
    });
  }


  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
    this._element.setAttribute('cx', `${value}`);
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
    this._element.setAttribute('cy', `${value}`);
  }

  get r(): number {
    return this._r;
  }

  set r(value: number) {
    this._r = value;
    this._element.setAttribute('r', `${value}`);

  }

  get element(): SVGCircleElement {
    return this._element;
  }
}
