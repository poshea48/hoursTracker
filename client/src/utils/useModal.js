import { useState, useCallback } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  transition: opacity 0.3s ease-in-out;
`;

const ModalDisplay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: self;
  z-index: 101;
  padding: 1em 0;
`;

const useModal = (initialValue = false) => {
  const [toggle, setToggle] = useState(initialValue);

  return [toggle, useCallback(() => setToggle(status => !status), [])];
};

// * const [isModalOpen, toggleModal] = useModal(false);
// * const [showOverlay, toggleOverlay] = useState(false);
// * {isModalOpen && <Overlay onClick={closeModal} open={isModalOpen} />}

export default useModal;

export { Overlay, ModalDisplay };
