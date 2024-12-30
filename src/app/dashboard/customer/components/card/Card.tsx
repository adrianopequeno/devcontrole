"use client";

import { api } from "@/lib/api";
import { CustomerProps } from "@/types/customer.type";
import { useRouter } from "next/navigation";

export const CardCustomer = ({ customer }: { customer: CustomerProps }) => {
  const router = useRouter();
  const { name, email, phone } = customer;

  const handleDeleteCustomer = async () => {
    try {
      const response = await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });

      console.log(response.data);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 hover:scale-105 duration-300">
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-[#0F172A]">
            <span className="font-semibold">Nome: </span> {name}
          </h2>
          <p className="text-sm text-[#4B5563]">
            <span className="font-semibold">Email: </span>
            {email}
          </p>
          <p className="text-sm text-[#4B5563]">
            <span className="font-semibold">Telefone: </span>
            {phone}
          </p>
        </div>
        <div>
          <button
            className="bg-[#ef4444] px-4 rounded text-white text-xs mt-2 self-start"
            onClick={handleDeleteCustomer}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};
