function fromThreePoints(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
): { x: number; y: number; r: number } | null {
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

  return {
    x: centerX,
    y: centerY,
    r: radius,
  };
}

function findTangentPoints(
  c1: { x: number; y: number; r: number },
  c2: { x: number; y: number; r: number }
): [{ x: number; y: number }, { x: number; y: number }] {
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

function calculateArea(
  circle1: { x: number; y: number; r: number },
  circle2: { x: number; y: number; r: number }
): number {
  const [p1, p2] = findTangentPoints(circle1, circle2);
  const h = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  return (h * (circle1.r + circle2.r)) / 2;
}

function* generateCirclesFromTriplets(
  points: { x: number; y: number }[]
): Generator<{ x: number; y: number; r: number }> {
  for (let i = 0; i < points.length - 2; i++) {
    for (let j = i + 1; j < points.length - 1; j++) {
      for (let k = j + 1; k < points.length; k++) {
        const circle = fromThreePoints(points[i], points[j], points[k]);
        if (circle !== null) yield circle;
      }
    }
  }
}

function findMaxAreaForPointSets(
  points1: { x: number; y: number }[],
  points2: { x: number; y: number }[]
): [{ x: number; y: number; r: number }[] | null, number] {
  const circles1: { x: number; y: number; r: number }[] = Array.from(
    generateCirclesFromTriplets(points1)
  );
  const circles2: { x: number; y: number; r: number }[] = Array.from(
    generateCirclesFromTriplets(points2)
  );
  let maxArea = -Infinity;
  let maxCirclePair = null;
  for (let i = 0; i < circles1.length; i++) {
    for (let j = 0; j < circles2.length; j++) {
      const area = calculateArea(circles1[i], circles2[j]);
      if (area > maxArea) {
        maxArea = area;
        maxCirclePair = [circles1[i], circles2[j]];
      }
    }
  }
  return [maxCirclePair, maxArea];
}

self.onmessage = function (event) {
  // Получаем данные из сообщения
  const { points1, points2 } = event.data;

  // Выполняем логику для поиска окружностей и числа

  const result = findMaxAreaForPointSets(points1, points2);

  self.postMessage(result);
};
