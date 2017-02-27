import React from 'react';

const TitleBar = () => (
  <div className="title-bar">
    <div className="title-bar__left" />
    <div className="title-bar__right">
      <a className="btn" href="/logout">
        Log out
      </a>
    </div>
  </div>
);

export default TitleBar;
