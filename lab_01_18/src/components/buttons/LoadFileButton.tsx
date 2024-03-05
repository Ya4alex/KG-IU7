import "./Button.css";
import { Button } from "./Button";
import { UploadFileSVG } from "../svg/SVG";
import { FC } from "react";

interface LoadFileButtonProps {
  onFileSelected: (file: File) => void;
  [key: string]: any; // остальные пропсы
}

const LoadFileButton :FC<LoadFileButtonProps> = ({ onFileSelected, ...props }) => {
  const openFileDialog = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt";
    fileInput.addEventListener("change", handleFileInputChange);
    fileInput.click();
  };

  const handleFileInputChange = (event: any) => {
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
