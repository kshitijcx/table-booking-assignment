import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col px-10 py-8 gap-6 items-center border rounded-xl shadow-xl">
      <div className="flex items-center gap-5">
        <Utensils size={50} />
        <h1 className="text-2xl font-bold">Restaurant Table Booking</h1>
      </div>
      <div className="space-x-5">
        <Button>
          <Link href="/view">View/Delete Bookings</Link>
        </Button>
        <Link href="/create">
          <Button>Create Booking</Button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
