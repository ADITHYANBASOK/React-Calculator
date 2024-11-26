import { clsx } from 'clsx';

export default function CalculatorButton({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'h-14 text-xl font-semibold rounded-lg transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        'bg-gray-700 hover:bg-gray-600 text-white',
        className
      )}
    >
      {children}
    </button>
  );
}