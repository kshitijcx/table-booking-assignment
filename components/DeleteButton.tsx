import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const DeleteButton = () => {
  return (
    <Button className="text-right mt-2">
      <Trash2 />
    </Button>
  );
};
export default DeleteButton;
