import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {wait} from '../util';
import {MsSpinnerDot} from '../spinner-dot';


@Component({
  templateUrl: 'inline-dot.html',
  selector: 'msSpinnerInlineDot',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'ms-spinner-inlineDot',
  }
})
export class MsSpinnerInlineDot implements OnInit, AfterViewInit {
  @Input()
  count: number = 10;

  @Input()
  radius: number = 3;

  @Input()
  width: string = '100%';

  @Input()
  color: string = '#0078d4';

  @Input()
  gap: number = 1;

  @Input()
  duration: number = 2500;

  @ViewChild('container')
  container: ElementRef<SVGElement>;

  private dots: MsSpinnerDot[] = [];

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.container.nativeElement.setAttribute('width', `${this.width}`);
    this.container.nativeElement.setAttribute('height', `${this.diameter}`);

    for (let i = 0; i < this.count; i++) {
      const dot = new MsSpinnerDot(0, this.radius, this.radius);
      dot.element.setAttribute('fill', `${this.color}`);

      this.dots.push(dot);
      this.container.nativeElement.appendChild(dot.element);
    }
    this.animates();

  }

  async animates() {
    for (let i = 0; i < 10; i++) {
      await this.beforeAnimate();
      // await this.afterAnimate();
      await wait(200);
    }
  }

  async beforeAnimate(): Promise<void> {
    const promises: Promise<void>[] = [];
    for (let i = 0; i < this.dots.length; i++) {
      await wait(100);
      const dot = this.dots[i];
      promises[i] = this.beforeAnimateDot(dot, i);
    }
    return new Promise(resolve => Promise.all(promises).then(() => resolve()));
  }

  async beforeAnimateDot(dot: MsSpinnerDot, index: number): Promise<void> {
    // const to = -(this.diameter * index + this.gap * index) + this.getWidth() / 2;
    const to = this.getWidth() + 10;
    await dot.animateX(0, to, this.duration);
  }

  async middleAnimate(): Promise<void> {
    const promises: Promise<void>[] = [];
    for (let i = 0; i < this.dots.length; i++) {

      const dot = this.dots[i];
      const to = dot.x + 100;
      promises[i] = dot.animateX(dot.x, to, 5000);
    }
    return new Promise(resolve => Promise.all(promises).then(() => resolve()));
  }

  async afterAnimate(): Promise<void> {
    const promises: Promise<void>[] = [];
    for (let i = 0; i < this.dots.length; i++) {
      await wait(100);
      const index = i;
      const to = this.getWidth() + this.diameter + 10;
      const dot = this.dots[index];
      promises[index] = dot.animateX(dot.x, to, this.duration);
    }
    return new Promise(resolve => Promise.all(promises).then(() => resolve()));
  }

  animateDot(dot: SVGCircleElement, index: number): Promise<void> {
    return new Promise<void>(resolve => {
      dot.animate([
        {'cx': `${-this.diameter}`},
        {'cx': `${this.getWidth() / 2}`}
      ], {duration: 1000, fill: 'both', easing: 'ease-in-out'})
        .onfinish = () => resolve();
    });
  }


  get diameter(): number {
    return this.radius * 2;
  }

  get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  getWidth() {
    return this.container.nativeElement.getBoundingClientRect().width;
  }
}
