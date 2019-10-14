FROM openjdk:11.0.4-jre

LABEL "com.github.actions.name"="sonar-scanner-action"
LABEL "com.github.actions.description"="Run sonar-scanner on your project"
LABEL "com.github.actions.icon"="check"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="https://github.com/Warchant/sonar-scanner-action"
LABEL "homepage"="https://github.com/Warchant/sonar-scanner-action"
LABEL "maintainer"="Bohdan Vanieiev <warchantua@gmail.com>"

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
