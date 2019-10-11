/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const Spinner = ({ statusMessage }) => (
  <div className="text-center">
    <p className="text-secondary text-truncate">{statusMessage}</p>
    <FontAwesomeIcon icon={faSpinner} size="3x" className="text-secondary mb-3" pulse />
  </div>
);

Spinner.propTypes = {
  statusMessage: PropTypes.string.isRequired
};

export default Spinner;
