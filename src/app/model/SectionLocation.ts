export class SectionLocation {
  private top: number;
  private height: number;

  constructor(sTop, sHeight) {
    this.top = sTop;
    this.height = sHeight;
  }

  public getTop(): number {
    return this.top;
  }

  public getHeight(): number {
    return this.height;
  }
}
