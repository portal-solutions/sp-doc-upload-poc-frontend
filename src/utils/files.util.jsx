/* eslint-disable import/prefer-default-export */

/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

/**
 * Utility function that wraps FileReader.readAsBinaryString(..) in a promise.
 */
const readAsBinaryString = (file) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => reject(new Error('Problem reading input file.'));
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsBinaryString(file);
  });
};

export { readAsBinaryString };
