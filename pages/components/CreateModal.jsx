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
          width: "100%",
          height: "100%",
          backgroundColor: "#ECE7E3",
          border: "1px solid #DBD5CF",
        },
      }}
      contentLabel={contentLabel}
    >
      <div className="flex flex-row-reverse py-10">
        <button onClick={closeModal} className="">
          <Image src="/icons/close.svg" alt="Cross" width={24} height={24} />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center h-full mb-10">
        <div className="my-5">
          <h2 className="font-bold">{contentLabel}</h2>
        </div>
        <div className="w-[50%] p-4 flex items-center justify-center py-10">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
