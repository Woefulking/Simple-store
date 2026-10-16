import { useProductDetails } from 'Entities/Product/lib/useProductDetails';
import { useParams } from 'react-router';
import { ErrorMessage } from 'Shared/ui/ErrorMessage/ErrorMessage';
import { Loading } from 'Shared/ui/Loading/Loading';

export const ProductItemPage = () => {
  const { id } = useParams<{ id: string }>();

  const { product, loading, error } = useProductDetails(id);

  if (loading) return <Loading />;

  if (error || !product) return <ErrorMessage />;

  return (
    <div className="p-5 max-w-4xl mx-auto bg-secondary text-primary rounded-2xl shadow-soft mt-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 max-h-96 flex items-center justify-center  p-5 rounded-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <span className="text-sm uppercase tracking-wider text-secondary-text mb-2">
            {product.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-secondary-text mb-6 leading-relaxed">{product.description}</p>
          <div className="text-2xl font-bold text-blue-500 mb-6">{product.price} $</div>
        </div>
      </div>
    </div>
  );
};
