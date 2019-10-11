/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ImplicitFlow from '../views/ImplicitFlow';
import AuthProvider from './AuthProvider';
import OauthCallback from './OAuthCallback';

/**
 * The application. All good things start here.
 */
const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={ImplicitFlow} />
        <Route exact path="/oauth/callback" component={OauthCallback} />
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
