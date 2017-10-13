import { Component, Prop, Element, Method } from '@stencil/core';

@Component({
  tag: 'st-signature',
  styleUrl: 'st-signature.scss'
})
export class Signature {
  @Prop() label: string;
  @Prop() width: number;
  @Prop() height: number;
  @Prop() callback: Function;
  @Element() host: HTMLElement;

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private boundPaint: EventListener;

  constructor() {
    this.boundPaint = this.paint.bind(this);
  }

  @Method()
  getSignatureImage() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
  }

  getMousePos(evt) {
    let rect = this.canvas.getBoundingClientRect(),
      scaleX = this.canvas.width / rect.width,
      scaleY = this.canvas.height / rect.height;

    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY
    };
  }

  pointerDown(evt) {
    let pos = this.getMousePos(evt);
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
    this.canvas.addEventListener('pointermove', this.boundPaint, false);
  }

  pointerUp(evt) {
    this.canvas.removeEventListener("pointermove", this.boundPaint);
    this.paint(evt);
  }

  paint(evt) {
    let pos = this.getMousePos(evt);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  clearSignature() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  accept() {
    if (this.callback && typeof this.callback === 'function') {
      this.callback();
    }
  }

  componentDidLoad() {
    this.canvas = (this.host.querySelector('canvas') as HTMLCanvasElement);
    this.canvas.addEventListener('pointerdown', this.pointerDown.bind(this), false);
    this.canvas.addEventListener('pointerup', this.pointerUp.bind(this), false);
    this.ctx = this.canvas.getContext('2d');
  }

  render() {
    return (
      <div class="signature-area">
        {this.label ? <div class="signature-label">{this.label}</div> : undefined }
        <div>
          <canvas style={{border: "solid 2px black",
            height: this.height ? this.height + 'px' : '300px',
            width: this.width ? this.width + 'px' : '300px' }}>
          </canvas>
        </div>
        <div>
          <button class="signature-clear" onClick={this.clearSignature.bind(this)}>Clear</button>
          <button class="signature-accept" onClick={this.accept.bind(this)}>Accept</button>
        </div>
      </div>
    );
  }
}
