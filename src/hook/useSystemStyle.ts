import React from 'react';
const theme = {
  dark: '#282c34',
  light: '#e3f2fd',
};
function useSystemStyle(): string {
  const [currentTheme, setCurrentTheme] = React.useState('light');

  React.useEffect(() => {
    let systemTheme = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setCurrentTheme('dark');
        document.documentElement.style.backgroundColor = theme.dark;
      } else {
        setCurrentTheme('light');
        document.documentElement.style.backgroundColor = theme.light;
      }
    };
    if (window.matchMedia('(prefers-color-scheme: dark)').media === 'not all') {
      //system not support make light as default
      setCurrentTheme('light');
      document.documentElement.style.backgroundColor = theme.light;
    } else {
      let mediaQueryList: MediaQueryList = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );
      let system = mediaQueryList.matches ? 'dark' : 'light';
      if (system === 'dark') {
        document.documentElement.style.backgroundColor = theme.dark;
      } else {
        document.documentElement.style.backgroundColor = theme.light;
      }
      setCurrentTheme(system);
      mediaQueryList.addListener(systemTheme);
      // clean up worker
      return () => {
        mediaQueryList.removeListener(systemTheme);
      };
    }
  }, []);
  return currentTheme.toUpperCase();
}
export default useSystemStyle;
