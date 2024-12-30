"use client";

import { useContext } from "react";
import { FiEdit, FiCheckSquare } from "react-icons/fi";
import { TicketProps } from "@/types/ticket.type";
import { CustomerProps } from "@/types/customer.type";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/providers/modal.provider";

import { api } from "@/lib/api";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export const TicketItem = ({ ticket, customer }: TicketItemProps) => {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  const handleChangeStatus = async () => {
    try {
      const response = await api.patch("/api/ticket", { id: ticket.id });
      // console.log(response.data);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    handleModalVisible();
    setDetailTicket({
      customer: customer,
      ticket: ticket,
    });
  };

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300 rounded">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded text-white">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-3" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#5e5e5e" />
          </button>
          <button onClick={handleOpenModal}>
            <FiEdit size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
};
