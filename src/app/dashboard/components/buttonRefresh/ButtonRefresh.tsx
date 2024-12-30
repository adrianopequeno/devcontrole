"use client";

import { FiRefreshCw } from "react-icons/fi";
import { useRouter } from "next/navigation";

export const ButtonRefresh = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };
  return (
    <button
      onClick={handleRefresh}
      className="bg-green-500 text-white px-2 py-2 rounded"
    >
      <FiRefreshCw size={16} color="#FFF" />
    </button>
  );
};
