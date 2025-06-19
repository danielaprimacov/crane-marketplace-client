import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/cranes">All Cranes</Link>
    </>
  );
}

export default HomePage;
