import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product } from 'Entities/Product';

export const useProducts = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
      return response.data;
    },
  });

  return {
    products: data,
    loading: isLoading,
    error,
  };
};
