import axios from "axios";
const fetchCustomers = async () => {
  const response = await axios.get("http://localhost:3000/api/");
  return response.data;
};

const page = async () => {
  const data = await fetchCustomers();
  return <div>{data}</div>;
};
export default page;
