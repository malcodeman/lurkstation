# [Reddit-client](https://ddit.herokuapp.com/)

[![Build Status](https://travis-ci.org/malcodeman/reddit-client.svg?branch=master)](https://travis-ci.org/malcodeman/reddit-client)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/malcodeman/micro-reddit/blob/master/LICENSE)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Reddit client is content oriented reddit client which aims to show reddit images and videos in most efficient way possible.

![Screenshot](docs/images/screenshot.jpg)

## Getting started

First, clone and run the api:

```
git clone https://github.com/malcodeman/micro-reddit.git micro-reddit
cd micro-reddit
yarn install && yarn start
```

Next, you can clone and run the frontend:

```
git clone https://github.com/malcodeman/reddit-client.git reddit-client
cd reddit-client
yarn install && yarn start
```

.env.development.local:

```
REACT_APP_API_URL = "http://localhost:8080"
```

## Design decisions

Why ... ?

- [react-intersection-observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## Credits

Huge ❤️ to:

- [Luis Merino](https://github.com/Rendez) for his work on react-intersection-observer

## License

[MIT](./LICENSE)
