import { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';

export const useDarkMode = () => useContext(DarkModeContext);