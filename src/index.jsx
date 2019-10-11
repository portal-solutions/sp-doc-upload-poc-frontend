/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

// IMPORTANT: always keep polyfills as first imports!
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'filepond-polyfill/dist/filepond-polyfill';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

/**
 * Attach our application to the DOM.
 */
ReactDOM.render(<App />, document.getElementById('root'));
