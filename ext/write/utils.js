const themeLookup = {
  regular: ['#f7edb2', '#001628', '#001628', '#001628'],
  regularDark: ['#001628', '#f7edb2', '#f7edb2', '#ffffff'],
  darkroom: ['black', 'darkred', 'darkred', 'red'],
  migraine: ['#00ff00', '#222', '#222', '#333'],
  migraineDark: ['#222', '#00ff00', '#00ff00', '#00ff33'],
};
const colorVars = [
  '--theme-background',
  '--theme-text',
  '--theme-border',
  '--theme-button-hover',
];

const sizeVar = '--size';
const sizeLookup = {
  small: '18px',
  medium: '22px',
  large: '28px',
};

const fontVar = '--font';
const fontLookup = {
  sans: "'IBM Plex Sans', sans-serif",
  serif: "'IBM Plex Serif', Georgia, Cambria, Cochin, sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

const splitter = (text) => {
  const byNewline = text.trim().split('\n');
  return byNewline.reduce((acc, val) => {
    const splitVal = val.split(' ');
    return acc.concat(splitVal);
  }, []);
};