"use client";

import { createContext, ReactNode, useState } from "react";
import { TicketProps } from "@/types/ticket.type";
import { CustomerProps } from "@/types/customer.type";
import { ModalTicket } from "@/components/modal";

interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  setDetailTicket: (detail: TicketInfo) => void;
}

interface TicketInfo {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  const handleModalVisible = () => {
    setVisible(!visible);
  };

  const setDetailTicket = (detail: TicketInfo) => {
    // console.log("Detail ticket:", detail);
    setTicket(detail);
  };

  return (
    <ModalContext.Provider
      value={{ visible, handleModalVisible, ticket, setDetailTicket }}
    >
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  );
};
