import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from './components/productDetail';
import { getProductDetails } from './services/getProductDetail,';

// const products = [
//   {
//     id: 1,
//     name: 'Product 1',
//     category: 'Category A',
//     price: 500000,
//     image: 'url-to-image-1.jpg',
//     description: 'Product',
//   },
//   {
//     id: 2,
//     name: 'Product 2',
//     category: 'Category B',
//     price: 999000,
//     image: 'url-to-image-2.jpg',
//   },
//   {
//     id: 3,
//     name: 'Product 3',
//     category: 'Category A',
//     price: 600000,
//     image: 'url-to-image-3.jpg',
//   },
//   {
//     id: 4,
//     name: 'Product 3',
//     category: 'Category A',
//     price: 754000,
//     image: 'url-to-image-3.jpg',
//   },
// ];

const ProductDetailPage = () => {
  //   const { productId } = useParams();
  //   const productt = products.find((p) => p.id === parseInt(productId, 10));
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    getProductDetails(id, setProduct);
  }, []);
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
