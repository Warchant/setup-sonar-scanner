# setup-sonar-scanner javascript action

This action downloads given version of sonar-scanner and adds it to PATH.

## Inputs

### `version`

**Optional** sonar-scanner cli version. List of available versions: https://github.com/SonarSource/sonar-scanner-cli/releases. Default `5.0.1.3006`.

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
    # Setup java 17 to be default (sonar-scanner requirement as of 5.x)
    - uses: actions/setup-java@v3
      with:
        distribution: 'temurin' # See 'Supported distributions' for available options
        java-version: '17'
    # Setup sonar-scanner
    - name: Setup SonarQube
      uses: warchant/setup-sonar-scanner@v7
    # Run sonar-scanner
    - name: SonarQube Scan
      run: sonar-scanner
           -Dsonar.host.url=${{ secrets.SONAR_URL }}
           -Dsonar.login=${{ secrets.SONAR_TOKEN }}
           -Dsonar.organization=${{ secrets.SONAR_ORGANIZATION }}
           -Dsonar.projectKey=${{ secrets.SONAR_PROJECT_KEY }}
           -Dsonar.sources=$GITHUB_WORKSPACE
```
