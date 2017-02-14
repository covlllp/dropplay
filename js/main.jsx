import React from 'react';
import ReactDOM from 'react-dom';

import 'scss/style';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <img src="images/icons/weather-big-snow.png" alt="hello" />,
    document.getElementById('react-content')
  );
});
