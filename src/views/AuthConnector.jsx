/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

import { faSignInAlt, faSignOutAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { OauthSender } from 'react-oauth-flow';
import { Button } from 'reactstrap';
import { useAuth } from '../components/AuthProvider';
import * as config from '../config';
import sleep from '../utils/sleep.util';

/**
 * A component that allows connect/disconnect with SharePoint.
 */
const AuthConnector = () => {
  const { deauthenticate, token } = useAuth();
  const [loading, setLoading] = useState();

  return (
    <div className="text-right">
      {token == null && (
        <OauthSender
          args={{
            response_type: 'token',
            scope: 'https://graph.microsoft.com/.default'
          }}
          authorizeUrl={config.oauth.authorizeUrl}
          clientId={config.oauth.clientId}
          redirectUri={config.oauth.redirectUri}
          render={({ url }) => (
            <Button
              type="button"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                window.location.href = url;
              }}
            >
              <FontAwesomeIcon icon={(loading && faSpinner) || faSignInAlt} spin={loading} /> Sign in to SharePoint
            </Button>
          )}
        />
      )}

      {token != null && (
        <Button
          type="button"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            await sleep(500); // added for dramatic effect
            deauthenticate();
            setLoading(false);
          }}
        >
          <FontAwesomeIcon icon={(loading && faSpinner) || faSignOutAlt} spin={loading} /> Sign out
        </Button>
      )}
    </div>
  );
};

export default AuthConnector;
