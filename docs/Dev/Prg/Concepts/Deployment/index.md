# Deployment

## Deployment to Heroku

### Heroku CLI commands

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

### Frontend

[Deploying Production Build of React App to Heroku](https://medium.com/quick-code/deploying-production-build-of-react-app-to-heroku-2548d8bf6936)

### Backend

[Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

[Deploying with Git](https://devcenter.heroku.com/articles/git)
