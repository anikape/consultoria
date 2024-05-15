import { OpenButtonModal } from "./OpenButtonModal";
import { ModalContent } from "./ModalContent";
import { ModalProvider } from "./ModalContext";
import { ModalBody } from "./ModalBody";

export const Modal = {
  Body: ModalBody,
  Content: ModalContent,
  Button: OpenButtonModal,
  Context: ModalProvider,
};
