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
import * as config from '../config';

/**
 * Renders the application's version (really, really small).
 */
const ApplicationVersion = ({ className }) => (
  <div className={className} style={{ fontSize: '50%' }}>
    <em>
      <code>
        v{config.application.version} ({config.application.gitCommit}, {config.application.dateModified})
      </code>
    </em>
  </div>
);

ApplicationVersion.defaultProps = {
  className: ''
};

ApplicationVersion.propTypes = {
  className: PropTypes.string
};

export default ApplicationVersion;
