# admin-panel-app-vue3-interface

The admin-panel-app-vue3 interface is an example of single page application. It was created by Vuejs v.3 and Bootstrap v.5 libraries. It is the frontend part of the fullstack app

- [fullstack app](https://head-person-panel.herokuapp.com/signup)

## Quick start

# Step 1 Clone the repo

```bash
git@github.com:konstantindergachev/admin-panel-app-vue3-interface.git
```

# Step 2 Install the dependencies

```bash
npm install or yarn install
```

# Step 3 Save your api domain name into VUE_APP_API_URL variable, .env

```sh
VUE_APP_API_URL=<api-url>
```

# Step 4 Use your own favicon.ico if you need it

```bash
/public/favicon.ico
```

# Step 5 Start the client part of the fullstack app in the development mode

```bash
 npm run serve or yarn serve
```

# Step 6 Prepare the static files for deploying them on the cloud app platform, for example - Heroku, with the back-end part of the app

```bash
npm run build or yarn build

# Important remark, "npm run www" command will not work on the Windows system. You need to rewrite this command for auto-copy static files to the backend dir.

"www": "rm -rf ../backend/build && mkdir ../backend/build && cd dist && cp -rf . ../../backend/build"
```

## The backend part of this app is here: [admin-panel-app-nestjs-api](https://github.com/konstantindergachev/admin-panel-app-nestjs-api)

Author:
Konstantin Dergachev [portfolio](http://dergachevkonstantin.surge.sh/).
