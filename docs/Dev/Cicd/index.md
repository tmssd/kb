# CI/CD

## Tools

### CI/CD tools

#### GitHub Actions

Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and share actions to perform any job you'd like, including CI/CD, and combine actions in a completely customized workflow.

!!! info ""

    [GitHub Actions Docs](https://docs.github.com/en/actions){target=_blank}

### Deployment tools

#### Fly.io [:material-web:](https://fly.io/docs/speedrun/){target=_blank}

For many languages and frameworks, you can deploy your app from zero, with the following three steps.

1. [Install `flyctl`](https://fly.io/docs/hands-on/install-flyctl/){target=_blank} - you'll need it.
2. Create an account with `fly auth signup` or login with `fly auth login`.
3. Run `fly launch` - create, configure, and deploy a new application.

#### Railway [:material-web:](https://railway.app/){target=_blank}

Made for any language, for projects big and small. Railway is the cloud that takes the complexity out of shipping software.

#### Heroku(paid)[:material-web:](https://www.heroku.com/){target=_blank}

??? quote "How to"

    ##### Heroku CLI commands

    ```bash
    # create an app in heroku server, with url
    heroku create

    #  deploy the app
    git push heroku master

    # login to new app
    heroku login # being in the projects' root path

    #  open app on browser
    heroku open

    #  print log
    heroku logs --tail

    #  check whether database is installed
    heroku addons

    #  connect and enter to psql cli
    heroku pg:psql

    # get database info, url
    heroku pg:info
    heroku config
    ```

    ##### Frontend

    [Deploying Production Build of React App to Heroku :simple-medium:](https://medium.com/quick-code/deploying-production-build-of-react-app-to-heroku-2548d8bf6936){target=_blank}

    ##### Backend

    [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs){target=_blank}

    [Deploying with Git](https://devcenter.heroku.com/articles/git){target=_blank}

## Tutorials

### Dockerization

#### Dockerizing a react app

!!! info ""

    + [ ] [How to Dockerize a React Application [Beginners Guide]](https://www.knowledgehut.com/blog/web-development/how-to-dockerize-react-app){target=_blank}
    + [ ] [Dockerizing a React app, Jun 19, 2022](https://jsramblings.com/dockerizing-a-react-app/){target=_blank}
    + [ ] [Dockerize your React app, Jul 9, 2021](https://dev.to/karanpratapsingh/dockerize-your-react-app-4j2e){target=_blank}
    + [ ] [Containerize branches from React Application using ReactBranchContainer, Oct 31, 2020](https://dev.to/salhernandez/containerize-branches-from-react-application-using-reactbranchcontainer-4ah5){target=_blank}

#### React in Docker with Nginx, built with ^^multi-stage Docker builds, including testing^^ [:material-web:](https://tiangolo.medium.com/react-in-docker-with-nginx-built-with-multi-stage-docker-builds-including-testing-8cc49d6ec305){target=_blank}

#### HTTPS using Nginx and Let's encrypt in Docker [:material-web:](https://mindsers.blog/post/https-using-nginx-certbot-docker/){target=_blank}

#### Веб-сервер на реальном примере. Docker-compose, nginx, mysql, php-fpm, wordpress [](https://youtu.be/mKdwkV5p1xg) [:material-github:](https://github.com/pavlenko-at/worlditech/tree/main/mKdwkV5p1xg){target=_blank}

В видео настраивается связка Docker-compose, nginx, mysql, php-fpm, wordpress

#### HTTPS + NGINX + DOCKER. Установим бесплатный ssl сертификат от Let's Encrypt [:fontawesome-brands-youtube:](https://youtu.be/OgCXa7e-mO0) [:material-github:](https://github.com/pavlenko-at/worlditech/tree/main/OgCXa7e-mO0){target=_blank}

В видео настраивается связка Docker-compose, nginx, mysql, php-fpm, wordpress, cerbot

### Integration

#### Continuous deployment using Docker, GitHub Actions, and Web-hooks, Mar 1, 2020 [:material-web:](https://levelup.gitconnected.com/automated-deployment-using-docker-github-actions-and-webhooks-54018fc12e32){target=_blank}

#### Using Github Actions to Deploy a React App and Express API Over SSH in 15 seconds [:simple-medium:](https://levelup.gitconnected.com/using-github-actions-to-deploy-a-react-app-and-express-api-over-ssh-in-15-seconds-6c7d9fb6bca3){target=_blank}

### Deployment
#### kb-tpl-docker-compose-pern-app-deploy [:material-github:](https://github.com/tmssd/kb-tpl-docker-compose-pern-app-deploy){target=_blank}

My tutorial mainly based on CI/CD design from "Deploying a Web App with Docker & GitHub Actions | Part 1 [:fontawesome-brands-youtube:](https://www.youtube.com/watch?v=JsOoUrII3EY){target=_blank} | Part 2 [:fontawesome-brands-youtube:](https://www.youtube.com/watch?v=hf8wUUrGCgU){target=_blank}"

^^Utilized:^^ ==[Github Actions](#github-actions)==, [Build and push Docker images :material-github:](https://github.com/marketplace/actions/build-and-push-docker-images){target=_blank}, [Watchtower](https://containrrr.dev/watchtower){target=_blank}

#### WordPress on Docker with Nginx, Traefik, LE SSL, Security, and Speed [:material-web:](https://www.smarthomebeginner.com/wordpress-on-docker-traefik/) [:material-github:](https://github.com/htpcBeginner/docker-traefik){target=_blank}

#### Hosting Multiple Full Stack Web Apps on a single VPS using Nginx and Docker [:material-web:](https://www.shawndsilva.com/blog/systems-administration-and-devops/hosting-multiple-full-stack-web-projects-on-one-vps-using-nginx-and-docker){target=_blank}
