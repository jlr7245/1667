console.log('hello world!');

let hasBeenSaved = false;
let changesSinceLastSave = false;

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

  // handles input on the box
  writeBox.addEventListener('input', (evt) => {
    console.log('AN EVENT HAPPENED')
    changesSinceLastSave = true;
    const wordList = splitter(evt.target.innerText);
    count.innerText = wordList.length;
    if (wordList.length >= 1667) {
      saveButton.removeAttribute('disabled');
      if (!hasBeenSaved) {
        save(JSON.stringify(evt.target.innerHTML));
        saveInterval = setInterval(() => {
          if (changesSinceLastSave) {
            console.log(changesSinceLastSave)
            saveButton.removeAttribute('disabled');
          }
        }, 5000);
      }
    } else if (saveInterval) {
      clearInterval(saveInterval);
      changesSinceLastSave = false;
    }
  });
});
