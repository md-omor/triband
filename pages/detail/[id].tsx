import axios from "axios";

const Detail = () => {
  return <div>id</div>;
};

export const getServerSideProps = async ({ params: { id } }) => {
  const { data } = await axios.get(`https://localhost:3000/apipost/${id}`);
};

export default Detail;
