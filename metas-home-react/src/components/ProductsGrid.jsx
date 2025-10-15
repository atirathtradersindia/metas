import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from './ProductCard';

const ProductsGrid = ({ products, showBuyQuery }) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-9" id="productsGrid">
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            showBuyQuery={showBuyQuery} 
          />
        ))
      ) : (
        <div className="col-span-3 text-center text-gold text-xl">
          {t('no_products')}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;