import { OpenButtonModal } from "@/components/Modal/OpenButtonModal";
import { ModalContent } from "@/components/Modal/ModalContent";
import { ModalProvider } from "@/components/Modal/ModalContext";
import { ModalBody } from "@/components/Modal/ModalBody";

export const Modal = {
  Body: ModalBody,
  Content: ModalContent,
  Button: OpenButtonModal,
  Context: ModalProvider,
};
