import { Link } from "react-router-dom";

function Crane({ title, description, price, location, status, _id }) {
  return (
    <div>
      <Link to={`/cranes/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>
      <p>{price}€</p>
      <p>{location}</p>
      <p>{status}</p>
    </div>
  );
}

export default Crane;
