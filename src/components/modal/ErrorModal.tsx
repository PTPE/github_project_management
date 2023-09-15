import { useModal } from "../../contexts/ModalContext";
import Exit from "./Exit";
import Modal from "./Modal";

type ErrorModalType = {
  errorMessage: string;
  onClick?: () => void;
};

export default function ErrorModal(props: ErrorModalType) {
  const { handleCloseErrorModal } = useModal()!;

  return (
    <Modal>
      <div className="min-h-[200px] flex flex-col p-4 ">
        <Exit
          className="self-end"
          onClick={() => {
            handleCloseErrorModal();
            props.onClick && props.onClick();
          }}
        />
        <p> {String(props.errorMessage)}</p>
      </div>
    </Modal>
  );
}
