import React from 'react';

// import 'scss/components/logged_out.scss';

const LoggedOutPage = () => (
  <div className="container chalk">
    <div className="page-center text-center">
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
);

export default LoggedOutPage;
