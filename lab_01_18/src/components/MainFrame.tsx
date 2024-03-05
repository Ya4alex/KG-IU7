import "./MainFrame.css";

import { useEffect, useRef, useState } from "react";
import { Stage } from "react-konva";

import { PointListDisplay, CircleListDisplay, ShapeDisplay } from "./canvas/CanvasObjs";
import { PointsHookResult } from "../hooks/usePoint";
import { ResultHook } from "../hooks/useResult";
import { KonvaEventObject } from "konva/lib/Node";

interface MainFrameProps {
  bluePoints: PointsHookResult;
  redPoints: PointsHookResult;
  result: ResultHook;
}

function MainFrame({ bluePoints, redPoints, result }: MainFrameProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);

  // обработка изменения размера
  useEffect(() => {
    const checkSize = () => {
      if (divRef.current) {
        if (
          divRef.current.offsetWidth != dimensions.width ||
          divRef.current.offsetHeight != dimensions.height
        ) {
          setDimensions({
            width: divRef.current.offsetWidth,
            height: divRef.current.offsetHeight,
          });
        }
      }
    };
    window.addEventListener("resize", checkSize);
    checkSize();
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // обработка контекстного меню
  const handleStageContextMenu = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage() as any;
    const position = stage.getRelativePointerPosition();
    const x = position.x;
    const y = position.y;

    redPoints.addPoint({ x, y, fill: "red" });
    e.evt.preventDefault(); // отключение выпадения контекстного меню
  };

  // обработка кликв правой кнопки мыши
  const handleStageMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.button === 0) {
      const stage = e.target.getStage() as any;
      const position = stage.getRelativePointerPosition();
      const x = position.x;
      const y = position.y;

      bluePoints.addPoint({ x, y, fill: "blue" });
    }
  };

  // обработка колёсика
  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.target.getStage() as any;
    const pointer = stage.getPointerPosition();
    const oldScale = scale;
    const newScale = e.evt.deltaY > 0 ? oldScale / 1.1 : oldScale * 1.1;
    setScale(newScale);
    stage.scale({ x: newScale, y: newScale });

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  // TODO
  useEffect(() => {
    result.calculate(bluePoints, redPoints);
  }, [bluePoints.data, redPoints.data]);

  return (
    <div id="mainframe-container" ref={divRef}>
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onContextMenu={handleStageContextMenu}
        onClick={handleStageMouseDown}
        onWheel={handleWheel}
        scaleX={scale}
        scaleY={scale}
        draggable
      >
        {result.isValid() && (
          <>
            <CircleListDisplay listCircles={result.data.circles} myScale={scale} />
            <ShapeDisplay points={result.data.shape} myScale={scale} />
          </>
        )}
        <PointListDisplay listPoints={bluePoints} myScale={scale} />
        <PointListDisplay listPoints={redPoints} myScale={scale} />
      </Stage>
    </div>
  );
}

export default MainFrame;
