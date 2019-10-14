# sonar-scanner docker action

This action downloads given version of sonar-scanner and adds it to PATH.

## Inputs

### `version`

**Required** sonar-scanner cli version. List of available versions: https://github.com/SonarSource/sonar-scanner-cli/releases. Default `4.2.0.1873`.

## Example usage

```
- name: Run sonarqube
  uses: warchant/sonar-scanner-action@v1
  env:
    # to get access to secrets.SONAR_TOKEN, provide GITHUB_TOKEN
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    version: '4.2.0.1873'
    options: '-Dsonar.login=${{ secrets.SONAR_TOKEN }}
              -Dsonar.organization=1corp
              -Dsonar.host.url=https://sonarcloud.io/
              -Dsonar.projectKey=sonar-scanner-action'
```
