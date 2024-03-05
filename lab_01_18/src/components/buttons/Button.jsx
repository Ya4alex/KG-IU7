import "./Button.css";

export function Button({ children, isActive, ...props }) {
  return (
    <button {...props} className={`${isActive ? "button active" : "button"} ${props.className}`}>
      {children}
    </button>
  );
}
