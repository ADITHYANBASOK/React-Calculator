import { describe, it, expect } from 'vitest';
import { evaluateExpression, formatNumber } from './calculator';

describe('Calculator Utils', () => {
  describe('evaluateExpression', () => {
    it('performs basic arithmetic operations', () => {
      expect(evaluateExpression('2+2')).toBe('4');
      expect(evaluateExpression('3-1')).toBe('2');
      expect(evaluateExpression('4*5')).toBe('20');
      expect(evaluateExpression('10/2')).toBe('5');
    });

    it('handles decimal numbers', () => {
      expect(evaluateExpression('1.5+2.5')).toBe('4');
      expect(evaluateExpression('3.3*3')).toBe('9.9');
    });

    it('handles division by zero', () => {
      expect(evaluateExpression('5/0')).toBe('Error');
    });

    it('handles empty input', () => {
      expect(evaluateExpression('')).toBe('0');
    });
  });

  describe('formatNumber', () => {
    it('formats integers correctly', () => {
      expect(formatNumber('1000')).toBe('1,000');
    });

    it('formats decimal numbers correctly', () => {
      expect(formatNumber('1000.5')).toBe('1,000.5');
    });

    it('handles error cases', () => {
      expect(formatNumber('Error')).toBe('Error');
    });
  });
});