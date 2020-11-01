class OneSixSixSeven {
  constructor({ token, settings, day }) {
    this.url = 'http://localhost:3000';
    this.token = token;
    this.settings = settings;
    this.day = day;
  }

  registerUser(user) {
    return fetch(`${this.url}/api/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      }
    }).then(res => res.json())
    .catch(err => {
      console.log(err);
      alert(err.message);
    })
  }

  
}
