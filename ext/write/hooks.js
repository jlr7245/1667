class OneSixSixSeven {
  constructor({ token, settings, day }) {
    this.url = 'http://localhost:3000';
    this.token = token;
    this.settings = settings;
    this.day = day;
  }

  registerUser(user, cb) {
    return fetch(`${this.url}/api/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        storage.authenticateUser(res.data.user.auth_token);
        this.token = res.data.user.auth_token;
        cb();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }

  configureFourAMFromNow(clear) {
    const saved4FN = storage.get('1667_target4am');
    if (!saved4FN) {
      storage.set('1667_target4am', fourAMFromNow());
    } else if (saved4FN < Date.now()) {
      clear().then(() => {
        storage.set('1667_target4am', fourAMFromNow());
        storage.clear('1667_content');
        this.day = today();
      });
    }
  }

  getTodaysContentIfExists(cb) {
    const content = storage.get('1667_content');
    if (content) {
      cb(JSON.parse(content));
    } else {
      this.getFromDb().then((dbContent) => {
        if (dbContent) cb(JSON.parse(dbContent.data.writing.content));
        else cb(false);
      });
    }
  }

  saveContentInLocalStorage(text) {
    storage.set('1667_content', text);
  }

  saveToDb(content, wordcount, cb = () => {}) {
    fetch(`${this.url}/api/writing`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        wordcount,
        for_day: this.day,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        cb();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }

  updateInDb(content, wordcount, cb = () => {}) {
    fetch(`${this.url}/api/writing/${this.day}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        wordcount,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        cb();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }

  getFromDb() {
    return fetch(`${this.url}/api/writing/${this.day}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }
}
