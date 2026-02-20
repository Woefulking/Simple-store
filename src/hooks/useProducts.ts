import axios from 'axios';
import { Product } from 'entities/Product/ProductTypes';
import { useEffect, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('Unknown error'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
