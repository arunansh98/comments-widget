import ReactDOM from "react-dom";
import TextInput from "./TextInput";

export default function Modal(props) {
  const { children } = props;
  return ReactDOM.createPortal(
    <>
      {/* Modal Overlay */}
      <div
        style={{
          inset: "0",
          position: "fixed",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Use rgba for transparency
          zIndex: 999,
        }}
      />
      {/* Modal Content */}
      <div
        style={{
          backgroundColor: "white",
          position: "fixed",
          border: "1px solid black",
          zIndex: 1000,
          inset: "24%",
        }}
      >
        {children}
      </div>
    </>,
    document.getElementById("modal")
  );
}
