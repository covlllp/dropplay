import Hello from 'hellojs';
// import Dropbox from 'dropbox';
import React from 'react';
import ReactDOM from 'react-dom';

import 'scss/style.scss';

const clientId = 'atsl47dppp55rqk';
Hello.init({ dropbox: clientId });

function authenticate() {
  Hello('dropbox').login().then((blah) => {
    console.log(blah);
  }, (error) => {
    console.log(error);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <button
      onClick={authenticate}
    >
      Click me
    </button>,
    document.getElementById('react-content')
  );
});
