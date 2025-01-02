"use client";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/constants/constants";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const deleteFxn = async (id: string) => {
    await axios.delete(`${BASE_URL}/api`, { data: { id } });
    router.refresh();
  };
  if (!BASE_URL) {
    return null;
  }
  return (
    <Button className="text-right mt-2" onClick={() => deleteFxn(id)}>
      <Trash2 />
    </Button>
  );
};
export default DeleteButton;
