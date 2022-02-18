# setup-sonar-scanner javascript action

This action downloads given version of sonar-scanner and adds it to PATH.

## Inputs

### `version`

**Required** sonar-scanner cli version. List of available versions: https://github.com/SonarSource/sonar-scanner-cli/releases. Default `4.6.2.2472`.

## Full Example usage

```yaml
on: push
name: SonarQube
jobs:
  sonarQubeTrigger:
    name: SonarQube Trigger
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: Setup sonarqube
      uses: warchant/setup-sonar-scanner@v3
    - name: Run sonarqube
      run: sonar-scanner
           -Dsonar.organization=1corp 
           -Dsonar.projectKey=Claro-Club-Mobile 
           -Dsonar.sources=$GITHUB_WORKSPACE 
           -Dsonar.host.url=${{ secrets.SONAR_URL }} 
           -Dsonar.login=${{ secrets.SONAR_TOKEN }}
```