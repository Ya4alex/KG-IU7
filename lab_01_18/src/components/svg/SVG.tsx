import "./SVG.css";

export function TrashSVG() {
  return (
    <svg
      className="trah-box-svg"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="216"
        y1="60"
        x2="40"
        y2="60"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="104"
        y1="104"
        x2="104"
        y2="168"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="152"
        y1="104"
        x2="152"
        y2="168"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M200,60V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V60"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M168,60V36a16,16,0,0,0-16-16H104A16,16,0,0,0,88,36V60"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function UploadFileSVG() {
  return (
    <svg
      className="file-svg path"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M203 224V160M224 181 203 160 182 181M139 32H87C76 32 70 32 65 34 61 36 58 40 56 44 53 48 53 54 53 66V190C53 202 53 208 56 212 58 216 61 220 65 222 70 224 76 224 87 224H160M139 32 203 96M139 32V79C139 85 139 88 140 90 141 92 142 94 144 95 147 96 150 96 156 96H203M203 96V117"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DownloadFileSVG() {
  return (
    <svg
      className="file-svg path"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M203 160V224M203 224 181 203M203 224 224 203M139 32H87C76 32 70 32 65 34 61 36 58 40 56 44 53 48 53 54 53 66V190C53 202 53 208 56 212 58 216 61 220 65 222 70 224 76 224 87 224H149M139 32 203 96M139 32V79C139 85 139 88 140 90 141 92 142 94 144 95 147 96 150 96 156 96H203M203 96V117"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
