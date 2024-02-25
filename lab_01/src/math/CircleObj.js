export class MathMyCircle {
  constructor({ x = null, y = null, r = null }) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  static fromThreePoints(p1, p2, p3) {
    const a = p2.x - p1.x;
    const b = p2.y - p1.y;

    const c = p3.x - p1.x;
    const d = p3.y - p1.y;

    const g = 2 * (a * (p3.y - p2.y) - b * (p3.x - p2.x));
    if (g == 0) return null; // лежат на одной прямой

    const e = a * (p1.x + p2.x) + b * (p1.y + p2.y);
    const f = c * (p1.x + p3.x) + d * (p1.y + p3.y);

    const centerX = (d * e - b * f) / g;
    const centerY = (a * f - c * e) / g;
    const radius = Math.sqrt(Math.pow(p1.x - centerX, 2) + Math.pow(p1.y - centerY, 2));

    return new MathMyCircle({ x: centerX, y: centerY, r: radius });
  }
}

export class MyCircle extends MathMyCircle {
  constructor({ x, y, r, fill = "white" }) {
    super({ x, y, r }); // вызываем конструктор родителя с помощью super()
    this.stroke = 1;
    this.fill = fill;
  }

  isValid() {
    return this.x !== null && this.y !== null && this.r !== null;
  }

  toString() {
    return this.isValid()
      ? `(${this.x.toFixed(1)}, ${this.y.toFixed(1)}, ${this.r.toFixed(1)})`
      : "(null)";
  }
}
