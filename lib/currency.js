/**
 * Currency Formatting Utilities
 * 
 * Handles locale-aware price formatting for multiple currencies.
 * Includes hard-coded conversion rates from USD as base currency.
 * 
 * Supported currencies: USD ($), EUR (€), GBP (£), KES (KSh)
 * Defaults to USD if unspecified.
 */

const currencyConfig = {
  USD: { symbol: '$', decimals: 2, locale: 'en-US' },
  EUR: { symbol: '€', decimals: 2, locale: 'de-DE' },
  GBP: { symbol: '£', decimals: 2, locale: 'en-GB' },
  KES: { symbol: 'KSh', decimals: 0, locale: 'en-KE' }
};

const conversionRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  KES: 128.50
};

export function formatPrice(amount, currency = 'USD') {
  const config = currencyConfig[currency] || currencyConfig.USD;
  const rate = conversionRates[currency] || 1;
  
  let currencyCode = 'USD';
  if (currency === 'EUR' || currency === 'GBP' || currency === 'KES') {
    currencyCode = currency;
  }
  
  const convertedAmount = amount * rate;
  
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals
  }).format(convertedAmount);
}

export function getCurrencySymbol(currency = 'USD') {
  const config = currencyConfig[currency] || currencyConfig.USD;
  return config.symbol;
}

export function getCurrencies() {
  return [
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', flag: '🇰🇪' }
  ];
}

export default { formatPrice, getCurrencySymbol, getCurrencies };
