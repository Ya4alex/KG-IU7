import { MathMyCircle } from "./CircleObj";

function findTangentPoints(c1: MathMyCircle, c2: MathMyCircle) {
  const dx = c1.x - c2.x;
  const dy = c1.y - c2.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  const angle = Math.atan2(dy, dx);
  const theta = Math.acos((c2.r - c1.r) / distance);
  const cosTangentAngle1 = Math.cos(angle + theta);
  const sinTangentAngle1 = Math.sin(angle + theta);

  const tangentPoint1 = {
    x: c1.x + c1.r * cosTangentAngle1,
    y: c1.y + c1.r * sinTangentAngle1,
  };
  const tangentPoint3 = {
    x: c2.x + c2.r * cosTangentAngle1,
    y: c2.y + c2.r * sinTangentAngle1,
  };

  return [tangentPoint1, tangentPoint3];
}

export function getShape(c1: MathMyCircle, c2: MathMyCircle) {
  const [p1, p2] = findTangentPoints(c1, c2);
  return [c1.x, c1.y, p1.x, p1.y, p2.x, p2.y, c2.x, c2.y];
}
