/**
 * Currency Formatting Utilities
 * 
 * Handles locale-aware price formatting for multiple currencies.
 * 
 * Supported currencies: USD ($), EUR (€), GBP (£), JPY (¥)
 * Defaults to USD if unspecified.
 */

const currencyConfig = {
  USD: { symbol: '$', decimals: 2, locale: 'en-US' },
  EUR: { symbol: '€', decimals: 2, locale: 'de-DE' },
  GBP: { symbol: '£', decimals: 2, locale: 'en-GB' },
  JPY: { symbol: '¥', decimals: 0, locale: 'ja-JP' }
};

export function formatPrice(amount, currency = 'USD') {
  const config = currencyConfig[currency] || currencyConfig.USD;
  
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : currency === 'EUR' ? 'EUR' : currency === 'GBP' ? 'GBP' : 'JPY',
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals
  }).format(amount);
}

export function getCurrencySymbol(currency = 'USD') {
  const config = currencyConfig[currency] || currencyConfig.USD;
  return config.symbol;
}

export function getCurrencies() {
  return [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
  ];
}

export default { formatPrice, getCurrencySymbol, getCurrencies };
