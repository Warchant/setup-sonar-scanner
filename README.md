# setup-sonar-scanner javascript action

This action downloads given version of sonar-scanner and adds it to PATH.

## Inputs

### `version`

**Required** sonar-scanner cli version. List of available versions: https://github.com/SonarSource/sonar-scanner-cli/releases. Default `4.2.0.1873`.

## Example usage

```yaml
- name: Setup sonarqube
  uses: warchant/setup-sonar-scanner@v3
- name: Run sonarqube
  env:
    # to get access to secrets.SONAR_TOKEN, provide GITHUB_TOKEN
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: sonar-scanner
       -Dsonar.login=${{ secrets.SONAR_TOKEN }}
       -Dsonar.organization=1corp
       -Dsonar.host.url=https://sonarcloud.io/
       -Dsonar.projectKey=sonar-scanner-action
```
