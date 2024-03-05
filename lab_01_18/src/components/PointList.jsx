import React from "react";
import "./PointList.css";
import { TrashSVG } from "./svg/SVG.jsx";

function PointItem({ point, index, onChange, onDelete, ...props }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(index, name, value);
    return true;
  };

  const handleDelete = (event) => {
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
          defaultValue={point.strX}
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
          defaultValue={point.strY}
          onChange={handleChange}
        ></input>
      </div>
    </form>
  );
}

export default function PointList({ listPoints }) {
  const handlePointChange = (index, fieldName, newValue) => {
    listPoints.updatePoint(index, { [fieldName]: newValue });
  };
  const handlePointAdd = () => {
    listPoints.addPoint({ x: null, y: null, fill: listPoints.color });
  };
  const handlePointDelete = (index) => {
    listPoints.deletePoint(index);
  };
  return (
    <div className="point-list-container">
      {listPoints.data.map((point, index) => (
        <PointItem
          key={`dotform${point.id}`}
          id={`dotform${point.id}`}
          point={point}
          index={index}
          onChange={handlePointChange}
          onDelete={handlePointDelete}
        ></PointItem>
      ))}
      <button onClick={handlePointAdd}>+</button>
    </div>
  );
}
