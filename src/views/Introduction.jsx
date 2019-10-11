/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

import PropTypes from 'prop-types';
import React from 'react';

const Introduction = ({ tokenExpired }) => (
  <div className="m-0">
    <p>
      Before you can use your SharePoint account with <em className="text-secondary">SharePoint Document Upload</em>,
      you will need to sign into SharePoint and authorize this application.
    </p>

    {tokenExpired && (
      <p className="text-danger">
        <strong>Your SharePoint token has expired, please sign in again.</strong>
      </p>
    )}
  </div>
);

Introduction.defaultProps = {
  tokenExpired: false
};

Introduction.propTypes = {
  tokenExpired: PropTypes.bool
};

export default Introduction;
