# Copyright (c) Portal Solutions and its affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.
#
# @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca> 

FROM nginx:stable-alpine
ARG BUILD_DIR
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
ADD ${BUILD_DIR} /usr/share/nginx/html
EXPOSE 80
