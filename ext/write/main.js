console.log('hello world!');

let hasBeenSaved = false;
let changesSinceLastSave = false;

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

document.addEventListener('DOMContentLoaded', () => {
  const writeBox = document.querySelector('.writebox');
  const count = document.querySelector('.count');
  const saveButton = document.querySelector('#save');
  const gear = document.querySelector('.fa-gear');
  const settings = document.querySelector('.settings');
  const themeButtons = document.querySelectorAll('.btn-group button');
  const loginForm = document.querySelector('.login-or-register');
  const loginModalContainer = document.querySelector('.login');
  const root = document.documentElement;
  let saveInterval;

  saveButton.addEventListener('click', (evt) =>
    save(JSON.stringify(evt.target.innerHTML))
  );

  // saves the text to db
  const save = (text) => {
    hasBeenSaved = true;
    console.log('the text has been saved');
    saveButton.setAttribute('disabled', 'true');
    changesSinceLastSave = false;
  };

  // loads existing text in db
  const load = (forDay) => {
    console.log('the text has been loaded');
  };

  // adjusts the theme of the thing
  const adjustTheme = (alter, value) => {
    if (alter === 'theme') {
      colorVars.forEach((color, idx) => {
        root.style.setProperty(color, themeLookup[value][idx]);
      });
    } else if (alter === 'size') {
      console.log(sizeVar, sizeLookup[value]);
      root.style.setProperty(sizeVar, sizeLookup[value]);
    } else if (alter === 'font') {
      root.style.setProperty(fontVar, fontLookup[value]);
    }
  };
  themeButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const { alter, value } = evt.target.dataset;
      console.log(alter, value);
      adjustTheme(alter, value);
    });
  });

  // handles showing / hiding the settings
  gear.addEventListener('click', () => {
    settings.classList.toggle('hide');
  });

  // handles input on the box
  writeBox.addEventListener('input', (evt) => {
    changesSinceLastSave = true;
    const wordList = splitter(evt.target.innerText);
    count.innerText = wordList.length;
    if (wordList.length >= 1667) {
      saveButton.removeAttribute('disabled');
      if (!hasBeenSaved) {
        save(JSON.stringify(evt.target.innerHTML));
        saveInterval = setInterval(() => {
          if (changesSinceLastSave) {
            console.log(changesSinceLastSave);
            saveButton.removeAttribute('disabled');
          }
        }, 5000);
      }
    } else if (saveInterval) {
      clearInterval(saveInterval);
      changesSinceLastSave = false;
    }
  });

  // handles form registration / display
  loginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const isNewUser = evt.target.isnewuser.checked;
    if (isNewUser) {
      registerUser({ username, password }).then((result) => {
        console.log('welcome to the result');
        loginModalContainer.classList.add('hide');
      });
    } else
      loginUser({ username, password }).then((result) => {
        console.log('this sure is a result of some kind');
        loginModalContainer.classList.add('hide');
      });
    console.log(evt.target.isnewuser.checked);
  });
});
