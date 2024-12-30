import Image from "next/image";
import heroImg from "@/assets/hero.svg";

const Home = () => {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-5rem)]">
      <h2 className="font-medium text-2xl mb-2 md:text-3xl text-[#0F172A]">
        Gerencie sua empresa
      </h2>
      <h1 className="font-bold text-blue-500 text-3xl mb-8 md:text-5xl">
        Atendimentos, Clientes
      </h1>
      <Image
        src={heroImg}
        alt="Imagem hero do dev controle"
        width={600}
        className="max-w-sm md:max-w-xl "
        priority={true}
      />
    </main>
  );
};

export default Home;
