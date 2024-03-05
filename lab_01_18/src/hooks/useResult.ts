import { useState } from "react";
import { MyCircle } from "../math/CircleObj";
import { MathMyPoint, MyPoint } from "../math/PointObj";
import { getShape } from "../math/calc";
import MyWorker from "../math/calckWorker?worker";

// const WORKER_PATH = "./src/math/calckWorker.js";
console.log("webworker created");
const worker = new MyWorker();

interface ResultData {
  area: number | null;
  circles: MyCircle[];
  shape: any[]; // Assuming it's some kind of shape data structure
  workerQueue: any[]; // Update this to your worker queue type if possible
  isLoading: boolean;
}

export interface ResultHook {
  data: ResultData;
  calculate: (
    pointsData1: { validData: MyPoint[] },
    pointsData2: { validData: MyPoint[] },
    vip?: boolean
  ) => void;
  setData: React.Dispatch<React.SetStateAction<ResultData>>;
  isValid: () => boolean;
  getSrtStatus: () => string | number;
}

const useResult = (): ResultHook => {
  const [data, setData] = useState<ResultData>({
    area: null,
    circles: [],
    shape: [],
    workerQueue: [],
    isLoading: false,
  });

  worker.onmessage = (event: MessageEvent) => {
    if (data.workerQueue.length) {
      worker.postMessage(data.workerQueue.shift());
      setData((prevData) => ({
        ...prevData,
        workerQueue: data.workerQueue,
      }));
      return;
    }

    const [circlesMath, area] = event.data;
    const circles = circlesMath ? circlesMath.map((x: any) => new MyCircle(x)) : null;
    const shape = circles ? getShape(...(circles as [MyCircle, MyCircle])) : [];

    setData((prevData) => ({
      ...prevData,
      area: area,
      circles: circles,
      shape: shape,
      workerQueue: [],
      isLoading: false,
    }));
  };

  const calculate = (pointsData1: any, pointsData2: any, vip = false) => {
    const pointsV1 = pointsData1.validData;
    const pointsV2 = pointsData2.validData; // it is func

    const points1 = pointsV1.length ? pointsV1.map((x: any) => new MathMyPoint(x)) : [];
    const points2 = pointsV2.length ? pointsV2.map((x: any) => new MathMyPoint(x)) : [];

    let isLoading = data.isLoading;
    let workerQueue: any[] = [];

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

  const getSrtStatus = (): string | number => {
    if (data.isLoading) return "расчёт...";
    if (!isValid()) return "нет результата";
    return data.area as number;
  };

  return {
    data,
    calculate,
    setData,
    isValid,
    getSrtStatus,
  };
};

export default useResult;
