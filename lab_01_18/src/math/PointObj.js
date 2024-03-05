export class MathMyPoint {
  constructor({ x = null, y = null }) {
    this.x = x;
    this.y = y;
  }
}

export class MyPoint extends MathMyPoint {
  constructor({ x = null, y = null, fill = "white", strX = null, strY = null }) {
    super({ x, y }); // вызываем конструктор родителя с помощью super()
    this.radius = 3;
    this.fill = fill;

    this.strX = strX !== null || x === null ? strX : this.x.toString();
    this.strY = strY !== null || y === null ? strY : this.y.toString();

    this.id = crypto.randomUUID();
  }

  updateCoordinates({ strX = null, strY = null }) {
    if (strX !== null) {
      this.strX = strX;
      const newX = parseFloat(strX);
      this.x = isNaN(newX) ? null : newX;
    }

    if (strY !== null) {
      this.strY = strY;
      const newY = parseFloat(strY);
      this.y = isNaN(newY) ? null : newY;
    }
  }

  isValid() {
    return this.x !== null && this.y !== null;
  }

  toString() {
    return this.isValid() ? `(${this.x.toFixed(1)}, ${this.y.toFixed(1)})` : "(null)";
  }
}

