/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from './AuthProvider';

/**
 * The OAuth callback component that receives the OAuth token.
 */
const OAuthCallback = ({ location }) => {
  const { authenticate } = useAuth();

  useEffect(() => {
    authenticate(qs.parse(location.hash).access_token);
  }, [authenticate, location.hash]);

  return <Redirect push to="/" />;
};

OAuthCallback.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string
  }).isRequired
};

export default OAuthCallback;
