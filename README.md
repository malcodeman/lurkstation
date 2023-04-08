# [lurkstation](https://lurkstation.com)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/malcodeman/lurkstation/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

lurkstation is content oriented reddit client which aims to show reddit images and videos in most efficient way possible.

![Screenshot](readme/screenshot.png)

## Getting started

First, clone and run the api:

```
git clone https://github.com/malcodeman/micro-reddit.git micro-reddit
cd micro-reddit
yarn install && yarn start
```

Next, you can clone and run the frontend:

```
git clone https://github.com/malcodeman/lurkstation.git
cd lurkstation
yarn install && yarn start
```

.env.development.local:

```
REACT_APP_API_URL = "http://localhost:8080"
```

.env.production.local:

```
REACT_APP_API_URL = "https://malcodeman-micro-reddit.glitch.me"
```

## License

[MIT](./LICENSE)
