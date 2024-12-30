"use client";

import { useState } from "react";
import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FiSearch, FiX } from "react-icons/fi";
import { FormTicket } from "./components/formTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email do client para localizar")
    .min(1, "O email é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

const OpenTicket = () => {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleClearCustomer = () => {
    setCustomer(null);
    setValue("email", "");
  };

  const handleSearchCustomer = async (data: FormData) => {
    try {
      const response = await api.get("/api/customer", {
        params: { email: data.email },
      });

      if (response.data === null) {
        setError("email", {
          type: "custom",
          message: "Ops, Cliente não encontrado!",
        });
        return;
      }

      setCustomer({
        id: response.data.id,
        name: response.data.name,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h2 className="font-bold text-3xl text-center mt-24">Abrir chamado</h2>

      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <>
            <div className="bg-slate-200 py-6 px-2 rounded border-2 flex items-center justify-between">
              <p className="text-lg">
                <strong className="text-base">Cliente selecionado:</strong>{" "}
                {customer.name}
              </p>
              <button
                type="submit"
                className="h-11 px-2 flex items-center justify-center rounded"
                onClick={handleClearCustomer}
              >
                <FiX size={24} color="#df3434" />
              </button>
            </div>
            <FormTicket customer={customer} />
          </>
        ) : (
          <form
            className="bg-slate-200 py-6 px-2 rounded border-2"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="flex flex-col gap-3">
              <Input
                name="email"
                placeholder="Digite o email do client para localizar"
                type="text"
                error={errors.email?.message}
                register={register}
              />

              <button className="bg-blue-500 flex flex-row gap-3 items-center justify-center text-white font-bold py-2 rounded">
                Procurar cliente <FiSearch size={24} color="#FFF" />
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default OpenTicket;
