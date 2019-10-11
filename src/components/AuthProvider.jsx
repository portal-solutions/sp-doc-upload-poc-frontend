/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

/**
 * Auth context; used to store auth stuff.
 */
const AuthContext = createContext();

/**
 * Convenience function to use the auth context.
 */
const useAuth = () => useContext(AuthContext);

/**
 * React component that will expose auth stuff to children.
 */
const AuthProvider = ({ children }) => {
  const [state, setState] = useState(localStorage.getItem('sp-auth-token'));

  /**
   * Put the AuthProvider in 'authenticated' mode. Token will be stored in
   * localstorage so authentication persists across page refreshes.
   */
  const authenticate = async (token) => {
    localStorage.setItem('sp-auth-token', token);
    setState(token);
  };

  /**
   * Put the AuthProvider in 'deauthenticated' mode. Token will be removed
   * from localstorage, requiring user to re-authenticate to do anything.
   */
  const deauthenticate = async () => {
    localStorage.removeItem('sp-auth-token');
    setState(null);
  };

  return <AuthContext.Provider value={{ token: state, authenticate, deauthenticate }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
export { useAuth };
