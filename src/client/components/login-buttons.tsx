import { faGithub, faGoogle, faTwitter, faWindows } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export const LoginButtons = ({}) => (
  <div className="jinaga-feedback-login-buttons">
    <p>Log in to comment.</p>
    <div className="jinaga-feedback-login-button-array">
      <button><FontAwesomeIcon icon={faWindows} /><span>Microsoft</span></button>
      <button><FontAwesomeIcon icon={faGoogle} /><span>Google</span></button>
      <button><FontAwesomeIcon icon={faTwitter} /><span>Twitter</span></button>
      <button><FontAwesomeIcon icon={faGithub} /><span>GitHub</span></button>
    </div>
  </div>
);