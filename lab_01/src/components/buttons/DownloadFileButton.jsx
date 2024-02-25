import React from "react";
import { Button } from "./Button";
import { saveAs } from "file-saver";
import { DownloadFileSVG } from "../svg/SVG";

const DownloadFileButton = ({ onDownload, ...props }) => {
  const handleDownload = () => {
    const generatedFile = onDownload();
    if (generatedFile) {
      saveAs(generatedFile, generatedFile.name || "file");
    }
  };

  return (
    <Button onClick={handleDownload} className={"file-btn"} {...props}>
      <DownloadFileSVG />
    </Button>
  );
};

export default DownloadFileButton;
