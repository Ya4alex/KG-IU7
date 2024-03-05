import { useState } from "react";
import { MyPoint } from "../math/PointObj";

export default function usePoints(initialColor) {
  const [data, setData] = useState([]);

  const validDataGetter = {
    get validData() {
      return data.filter((point) => point.isValid());
    },
  };

  const addPoint = (props) => {
    const newPoint = new MyPoint(props);
    setData([...data, newPoint]);
  };

  const deletePoint = (index) => {
    const newPoints = [...data];
    newPoints.splice(index, 1);
    setData(newPoints);
  };

  const updatePoint = (index, updatedValues) => {
    if (index >= 0 && index < data.length) {
      data[index].updateCoordinates(updatedValues);
      setData((data) => [...data]);
    }
  };

  const reset = () => {
    setData([]);
  };

  const loadPointsFromFile = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
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
