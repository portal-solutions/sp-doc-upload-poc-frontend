/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

import 'filepond/dist/filepond.min.css';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container } from 'reactstrap';
import { useAuth } from '../components/AuthProvider';
import * as config from '../config';
import * as sharepointService from '../utils/sharepoint.service';
import sleep from '../utils/sleep.util';
import ApplicationVersion from './ApplicationVersion';
import AuthConnector from './AuthConnector';
import Debug from './Debug';
import FileDropzone from './FileDropzone';
import Introduction from './Introduction';
import Spinner from './Spinner';
import ViewSource from './ViewSource';

/**
 * The main page. Welcome to the jungle.
 */
const ImplicitFlow = () => {
  const { deauthenticate, token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [spContext, setSpContext] = useState();
  const [statusMessage, setStatusMessage] = useState('fetching SharePoint site data');
  const [tokenExpired, setTokenExpired] = useState();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await sleep(250); // added for dramatic effect

          const site = await sharepointService.fetchSite(token, config.sharepoint.hostname, config.sharepoint.sitePath);
          setStatusMessage(`site-id: ${site.id}`);

          const drives = await sharepointService.fetchSiteDrives(token, site.id);
          const drive = drives.value.find((drv) => drv.name === config.sharepoint.driveName);
          setStatusMessage(`drive-id: ${drive.id}`);

          const driveRoot = await sharepointService.fetchDriveRoot(token, drive.id);
          setStatusMessage(`drive-root-id: ${driveRoot.id}`);

          await sleep(500); // added for dramatic effect

          setSpContext({ driveId: drive.id, driveRootId: driveRoot.id });
          setTokenExpired(false);
        } catch (err) {
          deauthenticate();
          setTokenExpired(true);
        }
      }

      setLoading(false);
    })();
  }, [deauthenticate, token, tokenExpired]);

  return (
    <Container className="py-1">
      <Col md="10" lg="8" className="mx-auto">
        <ApplicationVersion className="text-right" />

        <Card color="light shadow">
          <CardHeader tag="h1" className="h4 m-0">
            SharePoint Document Upload
          </CardHeader>
          <CardBody>
            {loading && token && <Spinner statusMessage={statusMessage} />}
            {!loading && !token && <Introduction tokenExpired={tokenExpired} />}
            {!loading && token && <FileDropzone spContext={spContext} token={token} />}
            <AuthConnector />
          </CardBody>
        </Card>

        <ViewSource className="small text-muted text-right" />
        {config.application.debug && <Debug className="shadow mt-5" object={{ spContext, token }} />}
      </Col>
    </Container>
  );
};

export default ImplicitFlow;
