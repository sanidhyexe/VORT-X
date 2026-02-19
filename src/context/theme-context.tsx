
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';

/**
 * @type {'dark' | 'light'} Theme
 * @description Defines the possible theme values for the application.
 */
type Theme = 'dark' | 'light';

/**
 * @interface ThemeContextType
 * @description The shape of the context provided by ThemeProvider.
 * @property {Theme} theme - The current active theme.
 * @property {(theme: Theme) => void} setTheme - Function to set a new theme.
 */
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provides theme-related state (dark/light mode) and a function to update it.
 * It also persists the selected theme to localStorage.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components that will consume the context.
 * @returns {JSX.Element} The provider component.
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);
    
    /**
     * Sets the application theme and persists it to localStorage.
     * @param {Theme} newTheme - The new theme to apply ('dark' or 'light').
     */
    const handleSetTheme = useCallback((newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }, []);

    const value = useMemo(() => ({ theme, setTheme: handleSetTheme }), [theme, handleSetTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * A custom hook to easily access the ThemeContext.
 * @throws {Error} If used outside of a ThemeProvider.
 * @returns {ThemeContextType} The theme context.
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
