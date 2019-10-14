#!/bin/sh -l

options=$1

echo "Options $1"
echo "Version $2"

# download sonar-scanner
SONAR_CLI_VERSION=$2
mkdir -p /opt/sonar
curl -L -o /tmp/sonar.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_CLI_VERSION}-linux.zip
unzip -o -d /tmp/sonar-scanner /tmp/sonar.zip
mv /tmp/sonar-scanner/sonar-scanner-${SONAR_CLI_VERSION}-linux /opt/sonar/scanner
ln -s -f /opt/sonar/scanner/bin/sonar-scanner /usr/local/bin/sonar-scanner
rm -rf /tmp/sonar*

sonar-scanner $options
