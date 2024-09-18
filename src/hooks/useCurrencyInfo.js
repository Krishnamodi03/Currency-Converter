import { useState } from "react";
import { useEffect } from "react";

function useCurrencyInfo(currency){
    const [data, setData] = useState({});
    useEffect(()=>{
        const fetchCurrencyInfo = async () => {
            const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`)
            const data = await response.json();
            setData(data[currency]);
        }
        fetchCurrencyInfo();
    },[currency])

    return data;
}

export default useCurrencyInfo