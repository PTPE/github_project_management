import { createContext, useContext, useState } from "react";

type ContextValueType = {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

const ModalContext = createContext<ContextValueType>({
  isModalOpen: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {},
});

function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleOpenModal() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const contextValue = {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { ModalContextProvider, useModal };
