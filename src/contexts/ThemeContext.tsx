import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  toggleDarkMode: () => void;
  compactView: boolean;
  setCompactView: (compact: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Initialize from localStorage or default to false
  const [darkMode, setDarkModeState] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? stored === 'true' : false;
  });
  const [compactView, setCompactViewState] = useState(() => {
    const stored = localStorage.getItem('compactView');
    return stored ? stored === 'true' : false;
  });

  // Sync to localStorage when changed
  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
    localStorage.setItem('darkMode', value.toString());
  };
  const setCompactView = (value: boolean) => {
    setCompactViewState(value);
    localStorage.setItem('compactView', value.toString());
  };
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode, compactView, setCompactView }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

