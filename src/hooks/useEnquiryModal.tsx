import { createContext, useContext, useState, type ReactNode } from "react";

interface EnquiryModalContextProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextProps | undefined>(undefined);

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <EnquiryModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error("useEnquiryModal must be used within an EnquiryModalProvider");
  }
  return context;
}
