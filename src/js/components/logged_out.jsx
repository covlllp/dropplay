import React from 'react';

const LoggedOutPage = () => (
  <div className="page chalk">
    <div className="container page-center text-center">
      <div className="col-xs-12">
        <h1 className="title">
          DropPlay
        </h1>
        <p>
          Use your Dropbox as a music player, and your Dropbox folders as a music playlist!
        </p>
        <p>
          <img src="images/radio.png" alt="radio" />
        </p>
        <a href="/auth/dropbox" className="btn primary large wide">
          Log in
        </a>
      </div>
    </div>
  </div>
);

export default LoggedOutPage;
