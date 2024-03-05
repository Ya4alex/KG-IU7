import React from "react";
import { Layer, Circle, Text, Line } from "react-konva";
import { useTheme } from "../../contexts/ThemeContext";
import { MyPointStable } from "../../math/PointObj";
import { MyCircle } from "../../math/CircleObj";
import { PointsHookResult } from "../../hooks/usePoint";

interface PointDisplayProps {
  point: MyPointStable;
  myScale?: number;
}

interface PointListDisplayProps {
  listPoints: PointsHookResult;
  myScale?: number;
}

interface CircleDisplayProps {
  circle: MyCircle;
  myScale?: number;
}

interface CircleListDisplayProps {
  listCircles: MyCircle[];
  myScale?: number;
}

interface ShapeDisplayProps {
  points: number[];
  myScale?: number;
  myStrokeWidth?: number;
  closed?: boolean;
}

const PointDisplay: React.FC<PointDisplayProps> = ({ point, myScale = 1 }) => {
  const { plt } = useTheme();
  return (
    <>
      <Circle
        x={point.x}
        y={point.y}
        radius={point.radius / myScale}
        fill={plt[point.fill]}
        fillEnabled={true}
      />
      <Text
        x={point.x + 6 / myScale}
        y={point.y}
        text={point.toString()}
        fill={plt.text}
        scaleX={1 / myScale}
        scaleY={1 / myScale}
      />
    </>
  );
};

const PointListDisplay: React.FC<PointListDisplayProps> = ({ listPoints, myScale = 1 }) => {
  return (
    <Layer>
      {listPoints.validData.map((point, index) => (
        <PointDisplay key={`canv_dot${index}_${point.fill}`} point={point} myScale={myScale} />
      ))}
    </Layer>
  );
};

const CircleDisplay: React.FC<CircleDisplayProps> = ({ circle, myScale = 1 }) => {
  const { plt } = useTheme();
  return (
    <>
      <Circle
        x={circle.x}
        y={circle.y}
        radius={circle.r}
        stroke={plt.stroke}
        strokeWidth={circle.stroke / myScale}
        fillEnabled={false}
      />
      <Text
        x={circle.x}
        y={circle.y}
        text={circle.toString()}
        fill={plt.text}
        scaleX={1 / myScale}
        scaleY={1 / myScale}
      />
    </>
  );
};

const CircleListDisplay: React.FC<CircleListDisplayProps> = ({ listCircles, myScale = 1 }) => {
  return (
    <Layer>
      {listCircles.map((circle, index) => (
        <CircleDisplay key={`canv_crl${index}_${circle.fill}`} circle={circle} myScale={myScale} />
      ))}
    </Layer>
  );
};

const ShapeDisplay: React.FC<ShapeDisplayProps> = ({ points, myScale = 1, myStrokeWidth = 1, closed = true }) => {
  const { plt } = useTheme();
  return (
    <Layer>
      <Line
        points={points}
        strokeWidth={myStrokeWidth / myScale}
        stroke={plt.shapeStroke}
        closed={closed}
        fill={plt.shapeFill}
      />
    </Layer>
  );
};

export { PointDisplay, PointListDisplay, CircleDisplay, CircleListDisplay, ShapeDisplay };
