Master: [![CircleCI](https://circleci.com/gh/sylank/lavender-site/tree/master.svg?style=svg)](https://circleci.com/gh/sylank/lavender-site/tree/master)
Dev:[![CircleCI](https://circleci.com/gh/sylank/lavender-site/tree/dev.svg?style=svg)](https://circleci.com/gh/sylank/lavender-site/tree/dev)
# Lavender website

Lavender summer house one-page frontend application.

![alt text](misc/opening-page.png)

## About
This repository contains the Lavender Summer House frontend application. It is written in Angular 7 and Pug with Sass.

DEV site: http://dev.levendulabalatonmaria.info/

PROD site: http://levendulabalatonmaria.info/

## Backend repositories
Deploy and infrastructure repository: https://github.com/sylank/lavender-backend-infrastructure

ReservationService repository: https://github.com/sylank/ReservationService

Other projects: https://github.com/sylank

## Pages
* Opening
* Gallery
* Events
* Contacts
* Booking
* Footer and other informations

## Features
* Multi langual support
* Gallery
* Events list with filter options
* Booking service frontend with re-captcha integration

## Image properties
Hero image properties:
* Raw size: 1080 x 720
* Raw quality: 50%, jpg
* Black layer opacity: 50%
* Black layer Gaussian blur: 10
* Final quality: 80%

Image converter (base64): https://websemantics.uk/tools/image-to-data-uri-converter/

## Usage
To run the website on your local computer use this commands below:

To install the dependencies:
```bash
npm install
```

To install the latest Angular-CLI:
```bash
npm install -g @angular/cli
```

To build the project:
```bash
ng build
```

To start the application:
```bash
ng serve
```
