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
import { Card, CardBody, CardHeader } from 'reactstrap';

/**
 * A component that can be used to render debug info.
 */
const Debug = ({ className, maxHeight, object }) => (
  <Card className={className}>
    <CardHeader>Debug info</CardHeader>
    <CardBody tag="pre" className="m-0" style={{ maxHeight }}>
      {/* prettier-ignore */}
      {JSON.stringify(object, null, 1)}
    </CardBody>
  </Card>
);

Debug.defaultProps = {
  className: '',
  maxHeight: '250px'
};

Debug.propTypes = {
  className: PropTypes.string,
  maxHeight: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  object: PropTypes.any.isRequired
};

export default Debug;
