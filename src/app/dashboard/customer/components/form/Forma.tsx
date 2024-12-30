"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(3, "O campo nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message:
        "O número de telefone deve estar  no padrão (xx) xxxxx-xxxx ou xxxxxxxxxx ou xxxxxxxxxxxxxx",
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export const NewCustomerForm = ({ userId }: { userId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const handleRegisterCustomer = async (data: FormData) => {
    // Submit data to your server
    await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      userId,
    });

    router.replace("/dashboard/customer");
    router.refresh();
  };

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mb-1 text-lg font-medium">Nome completo:</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors.name?.message}
        register={register}
      />
      <section className="flex flex-col sm:flex-row gap-2 mt-2">
        <div className="flex-1 ">
          <label className="mb-1 text-lg font-medium">Telefone:</label>
          <Input
            type="number"
            name="phone"
            placeholder="(XX) XXXXXXXXX"
            error={errors.phone?.message}
            register={register}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">E-mail:</label>
          <Input
            type="text"
            name="email"
            placeholder="Digite o e-mail"
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="mb-1 mt-2 text-lg font-medium">Endereço:</label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço do cliente..."
        error={errors.address?.message}
        register={register}
      />

      <button
        type="submit"
        className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold"
      >
        Cadastrar
      </button>
    </form>
  );
};
