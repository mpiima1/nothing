/**
 * Product Configuration
 * 
 * Single source of truth for all products.
 * Can be overridden via NEXT_PUBLIC_PRODUCT_VARIANTS env var.
 * 
 * SATIRICALLY SACRED TEXT: Feature descriptions are the joke - do not modify.
 */

const defaultProducts = [
  {
    id: 'premium',
    name: "Premium Nothing",
    price: 9.99,
    description: "Our flagship product. Absolutely nothing, but make it premium.",
    features: ["100% invisible", "Zero calories", "Infinite shelf life", "Hypoallergenic"]
  },
  {
    id: 'deluxe',
    name: "Deluxe Nothing",
    price: 24.99,
    description: "Nothing, but fancier. For the discerning consumer.",
    features: ["Artisanal emptiness", "Hand-crafted void", "Limited edition", "Certificate of authenticity"]
  },
  {
    id: 'ultimate',
    name: "Ultimate Nothing",
    price: 99.99,
    description: "The apex of nothingness. Pure absence in its final form.",
    features: ["Quantum-grade vacuum", "Philosophical implications included", "VIP nothing experience", "Personalized photo shoot"]
  },
  {
    id: 'starter',
    name: "Starter Nothing",
    price: 2.99,
    description: "Perfect for nothing beginners. Dip your toes into the void.",
    features: ["Entry-level emptiness", "Digital certificate", "Instagram-worthy", "Great conversation starter"]
  }
];

// Allow override from environment variable
const productVariants = process.env.NEXT_PUBLIC_PRODUCT_VARIANTS;

let products = defaultProducts;

if (productVariants) {
  // If variants are specified, use those
  const configuredVariants = productVariants.split(',').map(v => v.trim().toLowerCase());
  products = defaultProducts.filter(product => 
    configuredVariants.includes(product.id)
  );
}

export { products };
export default products;
