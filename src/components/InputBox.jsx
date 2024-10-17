import { useState, useId } from 'react';
import { getFlagUrlByCurrencyCode } from '../utils/flagUtils';
import PropTypes from 'prop-types';
 
const InputBox = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currrencyOptions = [],
  selectCurrency = "",
  amountDiable = false,
  className = "",
}) => {
  const amountInputId = useId();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectOption = (currency) => {
    onCurrencyChange(currency);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className={`bg-white p-3 rounded-lg text-lg flex ${className}`}>
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
          {label}
        </label>

        <input
          type="number"
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5"
          placeholder="Amount"
          disabled={amountDiable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>

      <div className="w-1/2 flex flex-wrap justify-end text-right relative">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>

        <div className="relative w-1/2">
          <div
            onClick={toggleDropdown}
            className="bg-gray-100 py-2 px-3 rounded-lg cursor-pointer flex items-end">
            {getFlagUrlByCurrencyCode(selectCurrency) ? (
              <img
                src={getFlagUrlByCurrencyCode(selectCurrency)}
                alt={`${selectCurrency} flag`}
                className="inline-block w-6 h-6 mr-2"
              />
            ) : (
              <span className="inline-block w-6 h-6 mr-2"></span>
            )}
            <span>{selectCurrency.toUpperCase()}</span>
            <span className="ml-auto">&#x25BC;</span>
          </div>

          {dropdownOpen && (
            <ul className="absolute bg-white border mt-1 py-2 w-full rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {currrencyOptions.map((currency) => {
                const flagUrl = getFlagUrlByCurrencyCode(currency);
                return (
                  <li
                    key={currency}
                    onClick={() => selectOption(currency)}
                    className="py-2 px-3 hover:bg-gray-200 flex items-center space-x-2 cursor-pointer"
                  >
                    {flagUrl ? (
                      <img
                        src={flagUrl}
                        alt={`${currency} flag`}
                        className="inline-block w-6 h-6"
                      />
                    ) : (
                      <span className="inline-block w-6 h-6"></span> // Placeholder if no flag is available
                    )}
                    <span>{currency.toUpperCase()}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func.isRequired,
  currrencyOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectCurrency: PropTypes.string.isRequired,
  amountDiable: PropTypes.bool,
  currencyDisable: PropTypes.bool,
  className: PropTypes.string,
};

InputBox.defaultProps = {
  className: "",
};
export default InputBox;
