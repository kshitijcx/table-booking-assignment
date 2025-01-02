import DeleteButton from "@/components/DeleteButton";
import { BASE_URL } from "@/constants/constants";
import axios from "axios";

interface CustomerType {
  id: string;
  name: string;
  date: string;
  slot: string;
  email: string;
  tables: number;
}

const fetchCustomers = async () => {
  const response = await axios.get(`${BASE_URL}/api`);
  return response.data;
};

const page = async () => {
  if (!BASE_URL) {
    return null;
  }
  const customerList = await fetchCustomers();
  return (
    <div>
      <h1 className="text-xl font-bold text-center mb-4">Customer List</h1>
      <div className="grid sm:grid-cols-3 sm:grid-rows-3 max-sm:flex max-sm:flex-col gap-4">
        {customerList.map((item: CustomerType) => (
          <div key={item.id} className="p-4 border rounded-xl shadow-xl">
            <p>Date: {item.date}</p>
            <p>Time: {item.slot}</p>
            <p>Name: {item.name}</p>
            <p>Tables: {item.tables}</p>
            <p>Email: {item.email}</p>
            <DeleteButton id={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default page;
