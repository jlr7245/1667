// css variables
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

// word splitter
const splitter = (text) => {
  const byNewline = text.trim().split('\n');
  return byNewline.reduce((acc, val) => {
    const splitVal = val.split(' ');
    return acc.concat(splitVal);
  }, []);
};

// storage api
const storage = {
  get(key) {
    return window.localStorage.getItem(key);
  },
  set(key, val) {
    window.localStorage.setItem(key, val);
  },
  clear(key) {
    window.localStorage.removeItem(key);
  },
  getSettings() {
    return JSON.parse(window.localStorage.getItem('1667_settings'));
  },
  setSettings(settings) {
    window.localStorage.setItem('1667_settings', JSON.stringify(settings));
  },
  isUserAuthenticated() {
    return !!window.localStorage.getItem('1667_AUTH_TOKEN');
  },
  authenticateUser(token) {
    window.localStorage.setItem('1667_AUTH_TOKEN', token);
  },
  token() {
    return window.localStorage.getItem('1667_AUTH_TOKEN');
  },
};

// date utils
const fourAMFromNow = () => {
  const dateTime = new Date();
  dateTime.setDate(dateTime.getDate() + 1);
  dateTime.setHours(04);
  dateTime.setMinutes(00);
  return dateTime.getTime();
};

const today = () => {
  const dateTime = new Date();
  return dateTime.getDate();
};

const isStillYday = () => {
  const dateTime = new Date();
  if (dateTime.getHours() < 4) {
    return true;
  }
  return false;
}

const yday = () => {
  const dateTime = new Date();
  dateTime.setDate(dateTime.getDate() - 1);
  return dateTime.getDate();
}
