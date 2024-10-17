import { useState } from 'react'
import useCurrencyInfo from "./hooks/useCurrencyInfo"
import InputBox from './components/InputBox'
const App = () => {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(amount)
    setConvertedAmount(convertedAmount)
  }
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }
  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/1629172/pexels-photo-1629172.jpeg')`
      }}>
      <div className='w-full'>
        <div className='w-full h-[30rem] max-w-3xl mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}>
            <div className='w-full mb-3'>
              <InputBox label="From"
                amount={amount}
                currrencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
                className='h-32'
              />
            </div>
            <div className='relative w-full h-2'>
              <button type='button'
                className='absolute left-1/2 
                -translate-x-1/2 -translate-y-1/2
                border-white rounded-md text-xl font-semibold
                bg-orange-600 text-white px-5 py-3'
                onClick={swap}>
                swap
              </button>
            </div>
            <div className='w-full mt-1 mb-4'>
              <InputBox label="To"
                amount={convertedAmount}
                currrencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDiable
                className='h-32 mb-14'
              />
            </div>
            <button type='submit'
              className='w-full h-24 bg-orange-600 text-white text-2xl rounded-lg'>
              Convert {from.toUpperCase()} To {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div >
    </div >
  )
}

export default App