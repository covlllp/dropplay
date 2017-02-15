// import Dropbox from 'dropbox';
import React from 'react';
import ReactDOM from 'react-dom';

import 'scss/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <a
      href="/auth/dropbox"
    >
      Click me
    </a>,
    document.getElementById('react-content')
  );
});
