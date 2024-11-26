import { useState, useEffect, useCallback } from 'react';
import { evaluateExpression, formatNumber } from '../utils/calculator';
import CalculatorButton from './CalculatorButton';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isNewCalculation, setIsNewCalculation] = useState(true);
  const [lastInputType, setLastInputType] = useState(null);

  const handleBackspace = useCallback(() => {
    if (display === 'Error' || isNewCalculation) {
      setDisplay('0');
      setExpression('');
      setIsNewCalculation(true);
      setLastInputType(null);
      return;
    }

    if (lastInputType === 'operator') {
      const newExpression = expression.slice(0, -1);
      setExpression(newExpression);
      const lastNumber = newExpression.split(/[+\-*/]/).pop();
      setDisplay(lastNumber || '0');
      setLastInputType('number');
    } else {
      const newDisplay = display.slice(0, -1) || '0';
      const newExpression = expression.slice(0, -1);
      setDisplay(newDisplay);
      setExpression(newExpression || '0');
      if (newDisplay === '0') {
        const hasOperator = /[+\-*/]/.test(newExpression);
        setLastInputType(hasOperator ? 'operator' : null);
      }
    }
  }, [display, expression, isNewCalculation, lastInputType]);

  const handleCalculate = useCallback(() => {
    if (!expression || display === 'Error') return;

    // Remove trailing operator if present
    const cleanExpression = expression.replace(/[+\-*/]$/, '');
    if (!cleanExpression) return;

    const result = evaluateExpression(cleanExpression);
    setDisplay(result);
    setExpression(result);
    setIsNewCalculation(true);
    setLastInputType('number');
  }, [expression, display]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setIsNewCalculation(true);
    setLastInputType(null);
  }, []);

  const handleInput = useCallback((value) => {
    if (display === 'Error') {
      handleClear();
      return;
    }

    const isOperator = '+-*/'.includes(value);
    const isNumber = '0123456789.'.includes(value);

    if (isNewCalculation) {
      if (isNumber) {
        const newValue = value === '.' ? '0.' : value;
        setDisplay(newValue);
        setExpression(newValue);
        setLastInputType('number');
      } else if (isOperator) {
        setExpression(display + value);
        setLastInputType('operator');
      }
      setIsNewCalculation(false);
    } else {
      if (isNumber) {
        if (lastInputType === 'operator') {
          setDisplay(value === '.' ? '0.' : value);
        } else {
          if (value === '.' && display.includes('.')) return;
          setDisplay(display === '0' && value !== '.' ? value : display + value);
        }
        setExpression(expression + value);
        setLastInputType('number');
      } else if (isOperator) {
        if (lastInputType === 'operator') {
          // Replace the last operator
          setExpression(expression.slice(0, -1) + value);
        } else {
          setExpression(expression + value);
        }
        setLastInputType('operator');
      }
    }
  }, [display, expression, isNewCalculation, lastInputType, handleClear]);

  const handleKeyDown = useCallback((event) => {
    const key = event.key;
    if (key.match(/[0-9.+\-*/]/) || key === 'Enter' || key === 'Backspace' || key === 'Escape' || key === '=') {
      event.preventDefault();
      if (key === 'Enter' || key === '=') {
        handleCalculate();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      } else {
        handleInput(key);
      }
    }
  }, [handleInput, handleCalculate, handleBackspace, handleClear]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-4 bg-gray-900">
        <div className="h-8 text-gray-400 text-right text-sm mb-2 overflow-hidden">
          {expression || '0'}
        </div>
        <div className="h-12 text-white text-right text-3xl font-semibold overflow-hidden">
          {formatNumber(display)}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-1 p-4">
        <CalculatorButton onClick={handleClear} className="col-span-2 bg-red-500 hover:bg-red-600">
          C
        </CalculatorButton>
        <CalculatorButton onClick={handleBackspace} className="bg-gray-700 hover:bg-gray-600">
          ←
        </CalculatorButton>
        <CalculatorButton onClick={() => handleInput('/')} className="bg-yellow-500 hover:bg-yellow-600">
          ÷
        </CalculatorButton>
        
        {['7', '8', '9'].map(num => (
          <CalculatorButton key={num} onClick={() => handleInput(num)}>
            {num}
          </CalculatorButton>
        ))}
        <CalculatorButton onClick={() => handleInput('*')} className="bg-yellow-500 hover:bg-yellow-600">
          ×
        </CalculatorButton>
        
        {['4', '5', '6'].map(num => (
          <CalculatorButton key={num} onClick={() => handleInput(num)}>
            {num}
          </CalculatorButton>
        ))}
        <CalculatorButton onClick={() => handleInput('-')} className="bg-yellow-500 hover:bg-yellow-600">
          −
        </CalculatorButton>
        
        {['1', '2', '3'].map(num => (
          <CalculatorButton key={num} onClick={() => handleInput(num)}>
            {num}
          </CalculatorButton>
        ))}
        <CalculatorButton onClick={() => handleInput('+')} className="bg-yellow-500 hover:bg-yellow-600">
          +
        </CalculatorButton>
        
        <CalculatorButton onClick={() => handleInput('0')} className="col-span-2">
          0
        </CalculatorButton>
        <CalculatorButton onClick={() => handleInput('.')}>
          .
        </CalculatorButton>
        <CalculatorButton onClick={handleCalculate} className="bg-yellow-500 hover:bg-yellow-600">
          =
        </CalculatorButton>
      </div>
    </div>
  );
}