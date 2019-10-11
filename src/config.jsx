/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

import preval from 'preval.macro';

const dateModified = preval('module.exports = new Date().toISOString()');

const gitCommit = preval(`
  module.exports = require("child_process")
    .execSync("git rev-parse HEAD")
    .toString().substring(0, 8)
`);

const application = {
  dateModified,
  debug: process.env.REACT_APP_DEBUG,
  gitCommit,
  version: process.env.REACT_APP_VERSION
};

/**
 * Microsoft OAuth configuration.
 */
const oauth = {
  authorizeUrl: `https://login.microsoftonline.com/${process.env.REACT_APP_OAUTH_TENANT_ID}/oauth2/v2.0/authorize`,
  tokenUrl: `https://login.microsoftonline.com/${process.env.REACT_APP_OAUTH_TENANT_ID}/oauth2/v2.0/token`,
  clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
  redirectUri: process.env.REACT_APP_OAUTH_REDIRECT_URI
};

/**
 * Site-specific SharePoint configuration.
 */
const sharepoint = {
  driveName: process.env.REACT_APP_SP_DRIVE_NAME,
  hostname: process.env.REACT_APP_SP_HOST_NAME,
  sitePath: process.env.REACT_APP_SP_SITE_PATH
};

export { application, oauth, sharepoint };
