"use client";

import { MouseEvent, useContext, useRef } from "react";
import { ModalContext } from "@/providers/modal.provider";

export const ModalTicket = () => {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  return (
    <div
      className="absolute bg-gray-900/80 w-full min-h-screen"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg md:text-2xl">
              Detalhes do chamado:
            </h2>
            <button
              className="bg-red-500 p-1 px-2 text-white rounded"
              onClick={handleModalVisible}
            >
              Fechar
            </button>
          </div>

          <div className="flex flex-wrap gap-1  md:text-base text-sm">
            <h4 className="font-bold">Nome: </h4>
            <p>{ticket?.ticket.name}</p>
          </div>

          <div className="flex flex-wrap flex-col gap-1  md:text-base text-sm">
            <h4 className="font-bold">Descrição: </h4>
            <p>{ticket?.ticket.description}</p>
          </div>

          <div className="w-full border-b-[1.5px] my-4"></div>

          <h3 className="font-bold md:text-lg text-base mb-2">
            Detalhes do cliente:
          </h3>

          <div className="flex flex-wrap gap-1  md:text-base text-sm">
            <h4 className="font-bold">Nome: </h4>
            <p>{ticket?.customer?.name}</p>
          </div>
          <div className="flex flex-wrap gap-1 md:text-base text-sm">
            <h4 className="font-bold">Telefone: </h4>
            <p>{ticket?.customer?.phone}</p>
          </div>
          <div className="flex flex-wrap gap-1 md:text-base text-sm">
            <h4 className="font-bold">Email: </h4>
            <p>{ticket?.customer?.email}</p>
          </div>
          <div className="flex flex-wrap gap-1 md:text-base text-sm">
            <h4 className="font-bold">Endereço: </h4>
            <p>{ticket?.customer?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
