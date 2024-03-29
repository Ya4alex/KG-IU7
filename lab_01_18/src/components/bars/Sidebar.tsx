import "./Toolbar.css";
import PointList from "../PointList.tsx";
import { Button } from "../buttons/Button.tsx";
import { TrashSVG } from "../svg/SVG.tsx";
import LoadPointsFileButton from "../buttons/LoadFileButton.tsx";
import DownloadFileButton from "../buttons/DownloadFileButton.tsx";
import { DarkModeToggle } from "../buttons/DarkModeToggle";
import { PointsHookResult } from "../../hooks/usePoint.js";
import { ResultHook } from "../../hooks/useResult.js";

interface SidebarProps {
  bluePoints: PointsHookResult;
  redPoints: PointsHookResult;
  result: ResultHook;
}

const Sidebar: React.FC<SidebarProps> = ({ bluePoints, redPoints, result }) => {
  return (
    <div id="side-bar" className="bar">
      <section className="top-section">
        <Button onClick={() => result.calculate(bluePoints, redPoints, true)} className="exec-btn">
          =
        </Button>
        <input id="result-input" type="text" readOnly={true} value={result.getSrtStatus()} />
        <DarkModeToggle />
      </section>

      <section>
        <button
          onClick={bluePoints.reset}
          className={`point-list-btn-dlt`}
          disabled={!bluePoints.data.length}
        >
          <TrashSVG />
        </button>
        <LoadPointsFileButton onFileSelected={bluePoints.loadPointsFromFile}></LoadPointsFileButton>
        <DownloadFileButton
          onDownload={bluePoints.onDownload}
          disabled={!bluePoints.validData.length}
        />
        <h2>Множество 1</h2>
      </section>
      <PointList listPoints={bluePoints}></PointList>

      <section>
        <Button
          onClick={redPoints.reset}
          className={`point-list-btn-dlt`}
          disabled={!redPoints.data.length}
        >
          <TrashSVG />
        </Button>
        <LoadPointsFileButton onFileSelected={redPoints.loadPointsFromFile}></LoadPointsFileButton>
        <DownloadFileButton
          onDownload={redPoints.onDownload}
          disabled={!redPoints.validData.length}
        />
        <h2>Множество 2</h2>
      </section>
      <PointList listPoints={redPoints}></PointList>
    </div>
  );
};

export default Sidebar;
