import { useModal } from "../../contexts/ModalContext";

type ExitType = {
  className?: string;
};

export default function Exit(props: ExitType) {
  const { handleCloseModal } = useModal();

  return (
    <div
      className={`relative cursor-pointer w-5 h-5 ${props.className} flex items-center justify-center`}
      onClick={handleCloseModal}
    >
      <div className="w-full h-[2px] absolute rotate-[45deg] bg-black"></div>
      <div className="w-full h-[2px] absolute rotate-[-45deg] bg-black"></div>
    </div>
  );
}
