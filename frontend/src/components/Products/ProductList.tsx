import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import type { Product } from "../../types";
import styles from "./Products.module.css";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Error al cargar productos",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(
                (product) =>
                    product.nombre.toLowerCase().includes(
                        searchTerm.toLowerCase(),
                    ) ||
                    product.descripcion.toLowerCase().includes(
                        searchTerm.toLowerCase(),
                    ),
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    if (loading) {
        return <div className={styles.loading}>Cargando productos...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Productos</h2>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {filteredProducts.length === 0
                ? (
                    <div className={styles.empty}>
                        No se encontraron productos.
                    </div>
                )
                : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.nombre}</td>
                                    <td>{product.descripcion}</td>
                                    <td className={styles.price}>
                                        ${product.precio.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </div>
    );
};

export default ProductList;
