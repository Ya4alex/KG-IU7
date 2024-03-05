import React from "react";
import { Layer, Circle, Text, Line } from "react-konva";
import { useTheme } from "../../contexts/ThemeContext";

function PointDisplay({ point, ...props }) {
  const { plt } = useTheme();
  return (
    <React.Fragment>
      <Circle
        x={point.x}
        y={point.y}
        radius={point.radius / props.myScale}
        fill={plt[point.fill]}
        fillEnabled={true}
      />
      <Text
        x={point.x + 6 / props.myScale}
        y={point.y}
        text={point.toString()}
        fill={plt.text}
        scaleX={1 / props.myScale}
        scaleY={1 / props.myScale}
      />
    </React.Fragment>
  );
}
PointDisplay.defaultProps = { myScale: 1 };

function PointListDisplay({ listPoints, ...props }) {
  return (
    <Layer>
      {listPoints.validData.map((point, index) => (
        <PointDisplay key={`canv_dot${index}_${point.fill}`} point={point} {...props} />
      ))}
    </Layer>
  );
}
PointListDisplay.defaultProps = { myScale: 1 };

function CircleDisplay({ circle, ...props }) {
  const { plt } = useTheme();
  return (
    <React.Fragment>
      <Circle
        x={circle.x}
        y={circle.y}
        radius={circle.r}
        stroke={plt.stroke}
        strokeWidth={circle.stroke / props.myScale}
        fillEnabled={false}
      />
      <Text
        x={circle.x}
        y={circle.y}
        text={circle.toString()}
        fill={plt.text}
        scaleX={1 / props.myScale}
        scaleY={1 / props.myScale}
      />
    </React.Fragment>
  );
}
CircleDisplay.defaultProps = { myScale: 1 };

function CircleListDisplay({ listCircles, ...props }) {
  return (
    <Layer>
      {listCircles.map((circle, index) => (
        <CircleDisplay key={`canv_crl${index}_${circle.fill}`} circle={circle} {...props} />
      ))}
    </Layer>
  );
}
CircleListDisplay.defaultProps = { myScale: 1 };

//
function ShapeDisplay({ points, ...props }) {
  const { plt } = useTheme();
  return (
    <Layer>
      <Line
        points={points}
        strokeWidth={props.myStrokeWidth / props.myScale}
        stroke={plt.shapeStroke}
        closed
        fill={plt.shapeFill}
        {...props}
      />
    </Layer>
  );
}
ShapeDisplay.defaultProps = {
  myScale: 1,
  myStrokeWidth: 1,
  closed: true,
};

export { PointDisplay, PointListDisplay, CircleDisplay, CircleListDisplay, ShapeDisplay };
