console.log('hello world!');

let hasBeenSaved = false;
let changesSinceLastSave = false;

const app = new OneSixSixSeven({
  token: storage.token(),
  settings: storage.getSettings(),
  day: isStillYday() ? yday() : today()
});

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

  if (storage.isUserAuthenticated()) {
    loginModalContainer.classList.add('hide');
    app.getTodaysContentIfExists((content) => {
      if (content) writeBox.innerHTML = content;
      count.innerText = splitter(writeBox.innerText).length;
      if (splitter(writeBox.innerText).length > 1667) hasBeenSaved = true;
    });
  }

  saveButton.addEventListener('click', () =>
    app.updateInDb(JSON.stringify(writeBox.innerHTML), parseInt(count.innerText))
  );

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
        app.saveToDb(JSON.stringify(evt.target.innerHTML), wordList.length, () => {
          hasBeenSaved = true;
        });
      }
    }
  });

  // handles form registration / display
  loginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const isNewUser = evt.target.isnewuser.checked;
    if (isNewUser) {
      app.registerUser({ username, password }, () =>
        loginModalContainer.classList.add('hide')
      );
    } else
      loginUser({ username, password }).then((result) => {
        console.log('this sure is a result of some kind');
        loginModalContainer.classList.add('hide');
      });
    console.log(evt.target.isnewuser.checked);
  });

  // clears things at 4am
  setInterval(
    () =>
      app.configureFourAMFromNow(() => {
        const wordNum = parseInt(count.innerText);
        if (wordNum >= 1667) {
          app.updateInDb(
            JSON.stringify(writeBox.innerHTML),
            () => (writeBox.innerHTML = '')
          );
        } else {
          writeBox.innerHTML = '';
        }
      }),
    10000
  );

  // sets content in local storage every so often
  setInterval(() => {
    app.saveContentInLocalStorage(JSON.stringify(writeBox.innerHTML));
  }, 1000);  
});
