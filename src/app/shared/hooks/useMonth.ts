import { useContext } from 'react';
import { MonthContext } from '../contexts/MonthContext';

export function useMonth() {
  return useContext(MonthContext);
}
