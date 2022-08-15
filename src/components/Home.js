import { useLocation } from "react-router-dom";
export default function Home() {
  const location = useLocation();
  console.log(location);
  const { image } = location.state;
  return (
    <>
      <img src={image} />
    </>
  );
}
