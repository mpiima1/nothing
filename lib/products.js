/**
 * Product Configuration
 * 
 * Products use translation keys for names, descriptions, and features.
 * The actual translated text is stored in lib/translations/{lang}.json
 * 
 * SATIRICALLY SACRED: Product feature translations must preserve the joke.
 */

const productVariants = process.env.NEXT_PUBLIC_PRODUCT_VARIANTS;

const defaultProducts = [
  {
    id: 'premium',
    price: 9.99
  },
  {
    id: 'deluxe',
    price: 24.99
  },
  {
    id: 'ultimate',
    price: 99.99
  },
  {
    id: 'starter',
    price: 2.99
  }
];

let products = defaultProducts;

if (productVariants) {
  const configuredVariants = productVariants.split(',').map(v => v.trim().toLowerCase());
  products = defaultProducts.filter(product => 
    configuredVariants.includes(product.id)
  );
}

export { products };
export default products;
