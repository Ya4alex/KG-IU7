import { Button } from "./Button";
import { saveAs } from "file-saver";
import { DownloadFileSVG } from "../svg/SVG";
import { FC } from "react";

interface DownloadFileButtonProps {
  onDownload: () => File | null | undefined;
  [key: string]: any; // остальные пропсы
}

const DownloadFileButton: FC<DownloadFileButtonProps> = ({ onDownload, ...props }) => {
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
