import { OpenButtonModal } from "@/components/Modal/OpenButtonModal";
import { ModalContent } from "@/components/Modal/ModalContent";
import { ModalProvider } from "@/components/Modal/ModalContext";
import { ModalBody } from "@/components/Modal/ModalBody";
import { ButtonModal } from "@components/Modal/ButtonModal";

export const Modal = {
  Body: ModalBody,
  Content: ModalContent,
  Open: OpenButtonModal,
  Button: ButtonModal,
  Context: ModalProvider,
};
