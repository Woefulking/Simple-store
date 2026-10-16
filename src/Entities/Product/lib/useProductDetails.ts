import { useQuery } from '@tanstack/react-query';
import { type Product } from '../model/ProductTypes';
import axios from 'axios';

export const useProductDetails = (id: string | undefined) => {
  const { data, isLoading, error } = useQuery<Product>({
    queryKey: ['products', id],
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');

      const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
      return response.data;
    },
    enabled: Boolean(id),
  });

  return {
    product: data,
    loading: isLoading,
    error,
  };
};
