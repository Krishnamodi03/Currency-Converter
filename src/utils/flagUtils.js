import countryByCurrency from '../data/countryByCurrency.json';
import countryCodes from '../data/countryCodes.json';

// Map of preferred countries for specific currencies (customize as needed)
const preferredCountryByCurrency = {
  USD: 'United States',
  EUR: 'Germany',             
  AUD: 'Australia',           
  GBP: 'United Kingdom',      
  CAD: 'Canada',              
  CHF: 'Switzerland',         
  XCD: 'Antigua and Barbuda', 
  XAF: 'Cameroon',            
  XOF: 'Senegal',             
  NZD: 'New Zealand',         
  ZAR: 'South Africa',        
  EUR: 'Germany',             
  USD: 'United States',       
};

// This is a utility function that helps get the Alpha-2 country code
// from the country name in the FlagCDN data.
const getCountryCodeFromCountryName = (countryName) => {
  if (!countryName) return null;

  const entry = Object.entries(countryCodes).find(
    ([, country]) => country.toLowerCase() === countryName.toLowerCase()
  );
  return entry ? entry[0] : null;
};

// Utility function to get flag URL based on currency code
export const getFlagUrlByCurrencyCode = (currencyCode) => {
  if (!currencyCode) return null; // If currencyCode is not provided, return null

  // Find all countries associated with the currency
  const countriesWithCurrency = countryByCurrency.filter(
    (item) => item.currency_code?.toUpperCase() === currencyCode.toUpperCase()
  );

  if (countriesWithCurrency.length === 0) {
    return null; // Return null if no countries are found for the currency
  }

  // Check if we have a preferred country for this currency
  const preferredCountry = preferredCountryByCurrency[currencyCode.toUpperCase()];

  let selectedCountry = null;

  if (preferredCountry) {
    // Try to find the preferred country in the list
    selectedCountry = countriesWithCurrency.find(
      (item) => item.country.toLowerCase() === preferredCountry.toLowerCase()
    );
  }

  // If no preferred country, or if it's not found, default to the first available country
  if (!selectedCountry) {
    selectedCountry = countriesWithCurrency[0];
  }

  const countryCode = getCountryCodeFromCountryName(selectedCountry.country);

  if (!countryCode) {
    return null; // Return null if no country code is found
  }

  // Return the flag URL from FlagCDN using the country code
  return `https://flagcdn.com/48x36/${countryCode}.png`; // You can adjust the size of the flag
};
