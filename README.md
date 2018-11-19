# [Reddit-client](https://ddit.herokuapp.com/)

[![Build Status](https://travis-ci.org/malcodeman/reddit-client.svg?branch=master)](https://travis-ci.org/malcodeman/reddit-client)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Reddit client is content oriented reddit client which aims to show reddit images and videos in most efficient way possible.

## Table of Contents
- [Usage](#usage)
- [Design decisions](#design-decisions)
- [Credits](#credits)
- [License](#license)

## Usage

.env.development.local file should look like this:
```
REACT_APP_API_URL = "http://localhost:8080"
```
To start the app run:
```
yarn install
yarn start
```
Api is located [here](https://github.com/malcodeman/micro-reddit).

## Design decisions

Why ... ?

* [react-intersection-observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)


## Credits

Huge ❤️ to:

* [Luis Merino for his work on react-intersection-observer](https://github.com/Rendez)


## License

Reddit client is [MIT licensed](./LICENSE).
