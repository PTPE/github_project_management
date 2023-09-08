import { createPortal } from "react-dom";
export default function Modal({ children }: { children: React.ReactNode }) {
  return createPortal(
    <ModalPortal children={children} />,
    document.getElementById("modal")!
  );
}

function ModalPortal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed w-screen h-screen bg-black bg-opacity-50 z-10 flex items-center justify-center">
      <div className="bg-white  w-1/3 rounded-xl">{children}</div>
    </div>
  );
}
