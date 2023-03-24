import Image from "next/image";
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const CreateModal = ({ isOpen, closeModal, contentLabel, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "#D9D9D9BF",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          backgroundColor: "#ECE7E3",
        },
      }}
      contentLabel={contentLabel}
    >
      <div className="flex flex-row-reverse">
        <button onClick={closeModal} className="">
          <Image src="/icons/close.svg" alt="Cross" width={24} height={24} />
        </button>
      </div>
      <div className="flex justify-center items-center h-[90%]">
        <div className="w-[50%] h-full p-4 flex items-center justify-center">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
