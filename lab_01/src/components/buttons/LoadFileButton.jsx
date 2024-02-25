import "./Button.css";
import React from "react";
import { Button } from "./Button";
import { UploadFileSVG } from "../svg/SVG";

const LoadFileButton = ({ onFileSelected, ...props }) => {
  const openFileDialog = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt";
    fileInput.addEventListener("change", handleFileInputChange);
    fileInput.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    onFileSelected(file);
  };

  return (
    <Button onClick={openFileDialog} className={"file-btn"} {...props}>
      <UploadFileSVG />
    </Button>
  );
};

export default LoadFileButton;
