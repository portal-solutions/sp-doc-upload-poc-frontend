/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const ViewSource = ({ className }) => (
  <div className={className}>
    View source on{' '}
    <a href="https://github.com/portal-solutions/sp-doc-upload-poc-frontend" rel="noopener noreferrer" target="_blank">
      GitHub
      <sup className="text-muted ml-1">
        <small>
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </small>
      </sup>
    </a>
  </div>
);

ViewSource.defaultProps = {
  className: ''
};

ViewSource.propTypes = {
  className: PropTypes.string
};

export default ViewSource;
