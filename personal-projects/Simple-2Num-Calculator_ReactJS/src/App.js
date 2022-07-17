import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import OperationButton from './components/OperationButton';
import DigitButton from './components/DigitButton';

function App() {
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [operationPicked, setOperationPicked] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const insertNumbers = (digit) => {
    if (!operationPicked) {
      setFirstNumber(prevDigit => (prevDigit + digit).toString());
    } else {
      setSecondNumber(prevDigit => (prevDigit + digit).toString());
    }
  }

  const insertDot = () => {
    if(firstNumber !== null && !operationPicked) {
      setFirstNumber(prevDigit => (prevDigit + ".").toString())
    } else {
      setSecondNumber(prevDigit => (prevDigit + ".").toString())
    }
  }

  const calculateResult = () => {
    if (firstNumber !== null && secondNumber !== null) {
      setShowResult(true);
      switch (operation) {
        case '+':
          setResult(parseFloat(firstNumber) + parseFloat(secondNumber))
          break;
        case '-':
          setResult(parseFloat(firstNumber) - parseFloat(secondNumber))
          break;
        case '*':
          setResult(parseFloat(firstNumber) * parseFloat(secondNumber))
          break;
        case '/':
          setResult(parseFloat(firstNumber) / parseFloat(secondNumber))
          break;
      }
      setOperationPicked(false);
      setOperation(null);
      setFirstNumber(null);
      setSecondNumber(null);
    }
  }

  useEffect(() => {
    if (result !== null) {
      setFirstNumber(result.toString());
      setShowResult(false);
    }
  }, [result]);

  const deleteDigits = () => {
    if (!operationPicked) {
      setFirstNumber(firstNumber.slice(0, -1))
    } else {
      setSecondNumber(secondNumber.slice(0, -1));
    }
  }

  const clearCalc = () => {
    setFirstNumber(null);
    setSecondNumber(null);
    setOperation(null);
    setOperationPicked(false);
    setResult(null);
    setShowResult(false);
  }

  return (
    <div className="calculator">
      <div className='calculator-header' style={{ position: 'relative', color: '#fff' }}>
        <div className='storing-number' style={{ position: 'absolute', top: '0', right: '5px', color: '#fff', fontSize: '15px', opacity: '.9' }}>{operationPicked && !showResult && firstNumber + operation}</div>
        <div className='numbers'>
          {!showResult && <span style={{ position: 'absolute', bottom: '20%', right: '5px', fontSize: '33px' }}>{!operationPicked ? firstNumber : secondNumber}</span>}
          {showResult && <span style={{ position: 'absolute', bottom: '20%', right: '5px', fontSize: '33px' }}>{result}</span>}
        </div>
      </div>
      <div className='calculator-buttons'>

        <div className='buttons-row first-row'>
          <button className='clear-btn' onClick={clearCalc}>AC</button>
          <button className='delete-btn' onClick={deleteDigits}>DEL</button>
          <OperationButton operation={'/'} setOperation={setOperation} setOperationPicked={setOperationPicked} />
        </div>
        <div className='buttons-row digit-row'>
          <DigitButton digit={1} insertNumbers={insertNumbers} />
          <DigitButton digit={2} insertNumbers={insertNumbers} />
          <DigitButton digit={3} insertNumbers={insertNumbers} />
          <OperationButton operation={'*'} setOperation={setOperation} setOperationPicked={setOperationPicked} />
        </div>
        <div className='buttons-row digit-row'>
          <DigitButton digit={4} insertNumbers={insertNumbers} />
          <DigitButton digit={5} insertNumbers={insertNumbers} />
          <DigitButton digit={6} insertNumbers={insertNumbers} />
          <OperationButton operation={'+'} setOperation={setOperation} setOperationPicked={setOperationPicked} />
        </div>
        <div className='buttons-row digit-row'>
          <DigitButton digit={7} insertNumbers={insertNumbers} />
          <DigitButton digit={8} insertNumbers={insertNumbers} />
          <DigitButton digit={9} insertNumbers={insertNumbers} />
          <OperationButton operation={'-'} setOperation={setOperation} setOperationPicked={setOperationPicked} />
        </div>
        <div className='buttons-row last-row'>
          <button className='dot-btn' onClick={insertDot}>.</button>
          <DigitButton digit={0} insertNumbers={insertNumbers} />
          <button className='equal-btn' onClick={() => { calculateResult() }}>=</button>
        </div>

      </div>
    </div>
  );
}

export default App;
