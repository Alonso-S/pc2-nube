import { Link } from "react-router-dom";
import ProductList from "../components/Products/ProductList";

const Products = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <h1>Productos</h1>
                <Link to="/clients">
                    <button>Volver a Clientes</button>
                </Link>
            </div>
            <ProductList />
        </div>
    );
};

export default Products;
