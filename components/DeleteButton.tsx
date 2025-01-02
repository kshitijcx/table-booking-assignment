"use client";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const deleteFxn = async (id: string) => {
    console.log(id);
    await axios.delete("http://localhost:3000/api", { data: {id} });
    router.refresh();
  };

  return (
    <Button className="text-right mt-2" onClick={() => deleteFxn(id)}>
      <Trash2 />
    </Button>
  );
};
export default DeleteButton;
