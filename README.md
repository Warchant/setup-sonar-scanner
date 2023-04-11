# setup-sonar-scanner javascript action

This action downloads given version of sonar-scanner and adds it to PATH.

## Inputs

### `version`

**Required** sonar-scanner cli version. List of available versions: https://github.com/SonarSource/sonar-scanner-cli/releases. Default `4.8.0.2856`.

## Full Example usage

```yaml
on: push
name: SonarQube Workflow
jobs:
  sonarqube:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
      with:
        fetch-depth: 0
    - name: Setup SonarQube
      uses: warchant/setup-sonar-scanner@v5
    - name: SonarQube Scan
      run: sonar-scanner
           -Dsonar.host.url=${{ secrets.SONAR_URL }}
           -Dsonar.login=${{ secrets.SONAR_TOKEN }}
           -Dsonar.organization=${{ secrets.SONAR_ORGANIZATION }}
           -Dsonar.projectKey=${{ secrets.SONAR_PROJECT_KEY }}
           -Dsonar.sources=$GITHUB_WORKSPACE
```