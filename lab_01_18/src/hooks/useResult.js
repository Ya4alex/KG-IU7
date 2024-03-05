import { useState } from "react";
import { MyCircle } from "../math/CircleObj";
import { MathMyPoint } from "../math/PointObj";
import { getShape } from "../math/calc";
import MyWorker from "../math/calckWorker?worker";

// const WORKER_PATH = "./src/math/calckWorker.js";
console.log("webworker created");
const worker = new MyWorker();

export default function useResult() {
  const [data, setData] = useState({
    area: null,
    circles: [],
    shape: [],
    workerQueue: [],
    isLoading: false,
  });

  worker.onmessage = (event) => {
    if (data.workerQueue.length) {
      worker.postMessage(data.workerQueue.shift());
      setData((prevData) => ({
        ...prevData,
        workerQueue: data.workerQueue,
      }));
      return;
    }

    const [circlesMath, area] = event.data;
    const circles = circlesMath ? circlesMath.map((x) => new MyCircle(x)) : null;
    const shape = circles ? getShape(...circles) : null;

    setData((prevData) => ({
      ...prevData,
      area: area,
      circles: circles,
      shape: shape,
      workerQueue: [],
      isLoading: false,
    }));
  };

  const calculate = (pointsData1, pointsData2, vip = false) => {
    const pointsV1 = pointsData1.validData;
    const pointsV2 = pointsData2.validData; // it is func

    const points1 = pointsV1.length ? pointsV1.map((x) => new MathMyPoint(x)) : [];
    const points2 = pointsV2.length ? pointsV2.map((x) => new MathMyPoint(x)) : [];

    let isLoading = data.isLoading;
    let workerQueue = [];

    if (!isLoading || vip) {
      worker.postMessage({ points1, points2 });
      isLoading = true;
    } else {
      workerQueue = [{ points1, points2 }];
    }

    setData((prevData) => ({
      ...prevData,
      workerQueue: workerQueue,
      isLoading: isLoading,
    }));
  };

  const isValid = () => {
    return data.area !== null && data.area >= 0;
  };

  const getSrtStatus = () => {
    if (data.isLoading) return "расчёт...";
    if (!isValid()) return "нет результата";
    return data.area;
  };

  return {
    data,
    calculate,
    setData,
    isValid,
    getSrtStatus,
  };
}
