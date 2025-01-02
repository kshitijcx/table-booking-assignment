import DeleteButton from "@/components/DeleteButton";
import axios from "axios";

interface CustomerType {
  _id: string;
  name: string;
  date: string;
  slot: string;
  email: string;
  tables: number;
}

const fetchCustomers = async () => {
  const response = await axios.get("http://localhost:3000/api");
  return response.data;
};

const page = async () => {
  const customerList = await fetchCustomers();
  await fetchCustomers();
  return (
    <div>
      <h1 className="text-xl font-bold text-center mb-4">Customer List</h1>
      <div className="grid sm:grid-cols-3 sm:grid-rows-3 max-sm:flex max-sm:flex-col gap-4">
        {customerList.map((item: CustomerType) => (
          <div key={item._id} className="p-4 border rounded-xl shadow-xl">
            <p>Date: {item.date}</p>
            <p>Time: {item.slot}</p>
            <p>Name: {item.name}</p>
            <p>Tables: {item.tables}</p>
            <p>Email: {item.email}</p>
            <DeleteButton />
          </div>
        ))}
      </div>
    </div>
  );
};
export default page;
