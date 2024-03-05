import { MathMyCircle } from "./CircleObj";

function findTangentPoints(c1: MathMyCircle, c2: MathMyCircle) {
  var dx = c1.x - c2.x;
  var dy = c1.y - c2.y;

  var distance = Math.sqrt(dx * dx + dy * dy);

  var angle = Math.atan2(dy, dx);
  var theta = Math.acos((c2.r - c1.r) / distance);
  var cosTangentAngle1 = Math.cos(angle + theta);
  var sinTangentAngle1 = Math.sin(angle + theta);

  var tangentPoint1 = {
    x: c1.x + c1.r * cosTangentAngle1,
    y: c1.y + c1.r * sinTangentAngle1,
  };
  var tangentPoint3 = {
    x: c2.x + c2.r * cosTangentAngle1,
    y: c2.y + c2.r * sinTangentAngle1,
  };

  return [tangentPoint1, tangentPoint3];
}

export function getShape(c1: MathMyCircle, c2: MathMyCircle) {
  const [p1, p2] = findTangentPoints(c1, c2);
  return [c1.x, c1.y, p1.x, p1.y, p2.x, p2.y, c2.x, c2.y];
}
