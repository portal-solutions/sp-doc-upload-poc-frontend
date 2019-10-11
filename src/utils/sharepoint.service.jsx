/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

/**
 * Delete a file from a SharePoint drive.
 */
const deleteFile = async (authToken, driveId, itemId) => {
  await fetch(`https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    method: 'DELETE'
  });
};

/**
 * Fetch the root folder of a SharePoint drive.
 */
const fetchDriveRoot = async (authToken, driveId) => {
  const response = await fetch(`https://graph.microsoft.com/v1.0/drives/${driveId}/root`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return response.json();
};

/**
 * Fetch a SharePoint site's details.
 */
const fetchSite = async (authToken, hostname, serverRelativePath) => {
  const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${hostname}:/${serverRelativePath}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return response.json();
};

/**
 * Fetch a SharePoint site's list of drives.
 */
const fetchSiteDrives = async (authToken, siteId) => {
  const response = await fetch(`https://graph.microsoft.com/v1.0/sites/${siteId}/drives`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return response.json();
};

/**
 * Upload a file to a SharePoint drive.
 */
const putFile = async (authToken, driveId, driveRootId, filename, data) => {
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${driveRootId}:/${filename}:/content`,
    {
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      method: 'PUT'
    }
  );

  return response.json();
};

export { deleteFile, fetchDriveRoot, fetchSite, fetchSiteDrives, putFile };
