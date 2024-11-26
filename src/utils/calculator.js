export const operators = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => b === 0 ? null : a / b
};

export function evaluateExpression(expression) {
  if (!expression) return '0';
  
  try {
    // Handle division by zero
    if (expression.includes('/0')) {
      return 'Error';
    }
    
    // Safely evaluate the expression
    const result = Function(`'use strict'; return (${expression})`)();
    
    // Handle overflow and invalid results
    if (!isFinite(result) || isNaN(result)) {
      return 'Error';
    }
    
    // Format the result
    return Number(result.toFixed(8)).toString();
  } catch (error) {
    return 'Error';
  }
}

export function formatNumber(number) {
  if (number === 'Error') return number;
  const formatted = parseFloat(number).toLocaleString('en-US', {
    maximumFractionDigits: 8
  });
  return formatted === 'NaN' ? 'Error' : formatted;
}