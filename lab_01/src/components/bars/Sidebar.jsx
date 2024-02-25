import "./Toolbar.css";
import PointList from "../PointList.jsx";
import { Button } from "../buttons/Button.jsx";
import { TrashSVG } from "../svg/SVG.jsx";
import LoadPointsFileButton from "../buttons/LoadFileButton.jsx";
import DownloadFileButton from "../buttons/DownloadFileButton.jsx";
import { DarkModeToggle } from "../buttons/DarkModeToggle";

export default function Sidebar({ bluePoints, redPoints, result }) {
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
}
