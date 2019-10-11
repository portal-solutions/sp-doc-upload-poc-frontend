/**
 * Copyright (c) Portal Solutions and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @author Greg Baker <gregory.j.baker@hrsdc-rhdcc.gc.ca>
 */

pipeline {
	agent any
	options {
		buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
	}
	stages {
		stage('Build') {
			stages {
				stage('Build npm artifact') {
					steps {
						sh 'npm install'
						sh 'npm run-script build'
						sh 'tar --transform s/build/sp-doc-upload-poc-frontend/ -zcvf sp-doc-upload-poc-frontend.tar.gz build'
						stash name: 'frontend', includes: 'build/**'
					}
					post {
						success {
							archiveArtifacts '**/sp-doc-upload-poc-frontend.tar.gz'
						}
					}
				}
				stage('Build docker image') {
					when {
						branch 'master'
					}
					environment {
						AZURE_CR_CREDS = credentials('portalsolutions-cr')
						VERSION = readJSON(file: 'package.json').get('version')
					}
					steps {
						unstash 'frontend'
						sh 'docker login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW portalsolutions.azurecr.io'

						// build statically versioned image (ex: v1.0.0)
						sh 'docker build -t portalsolutions.azurecr.io/portal-solutions/sp-doc-upload-poc-frontend:$VERSION --build-arg BUILD_DIR=build .'
						sh 'docker push portalsolutions.azurecr.io/portal-solutions/sp-doc-upload-poc-frontend:$VERSION'

						// build dynamically versioned 'latest' image
						sh 'docker tag portalsolutions.azurecr.io/portal-solutions/sp-doc-upload-poc-frontend:$VERSION portalsolutions.azurecr.io/portal-solutions/sp-doc-upload-poc-frontend:latest'
						sh 'docker push portalsolutions.azurecr.io/portal-solutions/sp-doc-upload-poc-frontend:latest'

						// build dynamically versioned 'master' image
						sh 'docker tag portalsolutions.azurecr.io/portal-solutions/sp-doc-upload-poc-frontend:$VERSION portalsolutions.azurecr.io/portal-solutions/sp-doc-upload-poc-frontend:master'
						sh 'docker push portalsolutions.azurecr.io/portal-solutions/sp-doc-upload-poc-frontend:master'

						// build dynamically versioned '{environment-name}' image
						sh 'docker tag portalsolutions.azurecr.io/portal-solutions/sp-doc-upload-poc-frontend:$VERSION portalsolutions.azurecr.io/portal-solutions/sp-doc-upload-poc-frontend:staging'
						sh 'docker push portalsolutions.azurecr.io/portal-solutions/sp-doc-upload-poc-frontend:staging'
					}
				}
			}
		}
		stage('Clean up dangling docker images') {
			environment {
				AZURE_CR_CREDS = credentials('gregory-j-baker')
			}
			steps {
				sh 'docker rmi $(docker images -q -f dangling=true) || true'
				sh 'az login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW'
				sh 'az acr repository show-manifests --name portalsolutions --repository portal-solutions/sp-doc-upload-poc-frontend --query "[?tags[0]==null].digest" -o tsv | xargs -I% az acr repository delete --name portalsolutions --image portal-solutions/sp-doc-upload-poc-frontend@% --yes || true'
			}
		}
	}
}
