import { ChangeEvent, FC } from "react";
import "./PointList.css";
import { TrashSVG } from "./svg/SVG.jsx";
import { MyPoint } from "../math/PointObj.js";
import { PointsHookResult } from "../hooks/usePoint.js";

interface PointItemProps {
  point: MyPoint;
  index: number;
  onChange: (index: number, name: string, value: string) => void;
  onDelete: (index: number) => void;
}

const PointItem: FC<PointItemProps> = ({ point, index, onChange, onDelete, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange(index, name, value);
    return true;
  };

  const handleDelete = (event: any) => {
    event.preventDefault(); // Предотвращаем отправку формы
    onDelete(index);
  };
  return (
    <form className={`point-list-item ${point.isValid() ? "" : "invalid"}`} {...props}>
      <button
        onClick={handleDelete}
        className={`point-list-btn-dlt point-list-btn-dlt-${point.fill}`}
      >
        <TrashSVG />
      </button>
      <div className="point-list-input-container">
        <label htmlFor={`dotXinp${point.id}`}>x:</label>
        <input
          id={`dotXinp${point.id}`}
          type="number"
          step={1}
          name="strX"
          defaultValue={point.strX as any}
          onChange={handleChange}
        ></input>
      </div>

      <div className="point-list-input-container">
        <label htmlFor={`dotYinp${point.id}`}>y:</label>
        <input
          id={`dotYinp${point.id}`}
          type="number"
          step={1}
          name="strY"
          defaultValue={point.strY as any}
          onChange={handleChange}
        ></input>
      </div>
    </form>
  );
};

interface PointListProps {
  listPoints: PointsHookResult;
}

const PointList: FC<PointListProps> = ({ listPoints }) => {
  const handlePointChange = (index: number, fieldName: string, newValue: string) => {
    listPoints.updatePoint(index, { [fieldName]: newValue });
  };
  const handlePointAdd = () => {
    listPoints.addPoint({ x: null, y: null, fill: listPoints.color });
  };
  const handlePointDelete = (index: number) => {
    listPoints.deletePoint(index);
  };
  return (
    <div className="point-list-container">
      {listPoints.data.map((point, index) => (
        <PointItem
          key={`dotform${point.id}`}
          point={point}
          index={index}
          onChange={handlePointChange}
          onDelete={handlePointDelete}
        ></PointItem>
      ))}
      <button onClick={handlePointAdd}>+</button>
    </div>
  );
};

export default PointList;
