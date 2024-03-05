import { useState } from "react";
import { MyPoint, PointProps, MyPointStable } from "../math/PointObj";

interface ValidDataGetter {
  validData: MyPointStable[];
}

export interface PointsHookResult extends ValidDataGetter {
  data: MyPoint[];
  color: string;
  addPoint: (props: PointProps) => void;
  deletePoint: (index: number) => void;
  updatePoint: (index: number, updatedValues: Partial<PointProps>) => void;
  setData: React.Dispatch<React.SetStateAction<MyPoint[]>>;
  reset: () => void;
  loadPointsFromFile: (file: File) => void;
  onDownload: () => File;
}

export default function usePoints(initialColor: string): PointsHookResult {
  const [data, setData] = useState<MyPoint[]>([]);

  const validDataGetter: ValidDataGetter = {
    get validData() {
      return data.filter((point) => point.isValid()) as MyPointStable[];
    },
  };

  const addPoint = (props: PointProps) => {
    const newPoint = new MyPoint(props);
    setData([...data, newPoint]);
  };

  const deletePoint = (index: number) => {
    const newPoints = [...data];
    newPoints.splice(index, 1);
    setData(newPoints);
  };

  const updatePoint = (index: number, updatedValues: Partial<PointProps>) => {
    if (index >= 0 && index < data.length) {
      data[index].updateCoordinates(updatedValues);
      setData([...data]);
    }
  };

  const reset = () => {
    setData([]);
  };

  const loadPointsFromFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = (event.target as FileReader).result as string;
      const lines = contents.split("\n");
      const newData = lines.map((line) => {
        const [x, y] = line.split(" ").map(parseFloat);
        return new MyPoint({ x, y, fill: initialColor });
      });
      setData(newData);
    };
    reader.readAsText(file);
  };

  const onDownload = () => {
    const pointsData = validDataGetter.validData.map((point) => `${point.x} ${point.y}`).join("\n");
    const blob = new Blob([pointsData], { type: "text/plain;charset=utf-8" });
    return new File([blob], `${data.length}_${initialColor}_points.txt`, {
      type: "text/plain;charset=utf-8",
    });
  };

  return {
    data,
    color: initialColor,
    ...validDataGetter,
    addPoint,
    deletePoint,
    updatePoint,
    setData,
    reset,
    loadPointsFromFile,
    onDownload,
  };
}
