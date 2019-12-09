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
import crypto from 'crypto-js';
import path from 'path';
import PropTypes from 'prop-types';
import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import * as files from '../utils/files.util';
import * as sharepointService from '../utils/sharepoint.service';

import 'filepond/dist/filepond.min.css';

registerPlugin(FilePondPluginFileValidateSize);

/**
 * A file upload dropzone.
 */
const FileDropzone = ({ spContext, token }) => (
  <>
    <p>
      <strong>Note:</strong> files will be uploaded to{' '}
      <a href="https://014gc.sharepoint.com/sites/du-eval/DUDocuments" rel="noopener noreferrer" target="_blank">
        /{process.env.REACT_APP_SP_SITE_PATH}/DUDocuments
        <sup className="text-muted ml-1">
          <small>
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </small>
        </sup>
      </a>{' '}
      in SharePoint.
    </p>
    <FilePond
      allowMultiple
      labelIdle="Drag & drop your files or <span class='filepond--label-action' tabindex='0'>click to browse</span>.<br/>(max size: 4mb)"
      labelTapToCancel="click to cancel"
      labelTapToUndo="click ✕ to undo"
      maxFiles="3"
      maxFileSize="4MB"
      server={{
        process: async (fieldName, file, metadata, load, error, progress) => {
          const md5 = crypto.MD5(await files.readAsBinaryString(file));
          const extension = path.extname(file.name);
          const basename = file.name.replace(extension, '');

          const result = await sharepointService.putFile(
            token,
            spContext.driveId,
            spContext.driveRootId,
            `${basename}-${md5}${extension}`,
            file
          );

          progress(true, file.size, file.size);
          load(result.id);
        },

        revert: async (uniqueFileId) => {
          await sharepointService.deleteFile(token, spContext.driveId, uniqueFileId);
        }
      }}
    />
  </>
);

FileDropzone.propTypes = {
  spContext: PropTypes.shape({
    driveId: PropTypes.string,
    driveRootId: PropTypes.string
  }).isRequired,
  token: PropTypes.string.isRequired
};

export default FileDropzone;
