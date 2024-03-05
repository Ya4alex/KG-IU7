interface PointCoordinates {
  x: number | null;
  y: number | null;
}

export interface PointProps {
  x?: number | null;
  y?: number | null;
  fill?: string;
  strX?: string | null;
  strY?: string | null;
}

export class MathMyPoint {
  x: number | null;
  y: number | null;

  constructor({ x = null, y = null }: PointCoordinates) {
    this.x = x;
    this.y = y;
  }
}

export class MyPoint extends MathMyPoint {
  radius: number;
  fill: string;
  strX: string | null;
  strY: string | null;
  id: string;

  constructor({ x = null, y = null, fill = "white", strX = null, strY = null }: PointProps = {}) {
    super({ x, y });
    this.radius = 3;
    this.fill = fill;

    this.strX = strX !== null || x === null ? strX : this.x !== null ? this.x.toString() : null;
    this.strY = strY !== null || y === null ? strY : this.y !== null ? this.y.toString() : null;

    this.id = crypto.randomUUID();
  }

  updateCoordinates({ strX = null, strY = null }: PointProps = {}) {
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

  isValid(): boolean {
    return this.x !== null && this.y !== null;
  }

  toString(): string {
    return this.x !== null && this.y !== null
      ? `(${this.x.toFixed(1)}, ${this.y.toFixed(1)})`
      : "(null)";
  }
}

export interface MyPointStable extends MyPoint {
  x: number;
  y: number;
}