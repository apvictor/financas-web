import { useContext } from 'react';
import { ToggleContext } from '../contexts/ToggleContext';

export function useToggle() {
  return useContext(ToggleContext);
}
