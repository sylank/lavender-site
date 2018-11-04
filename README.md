Master: [![CircleCI](https://circleci.com/gh/sylank/lavender-site/tree/master.svg?style=svg)](https://circleci.com/gh/sylank/lavender-site/tree/master)
Dev:[![CircleCI](https://circleci.com/gh/sylank/lavender-site/tree/dev.svg?style=svg)](https://circleci.com/gh/sylank/lavender-site/tree/dev)
# Lavender website

Lavender summer house one-page frontend application.

![alt text](misc/opening-page.png)

## About
This repository contains the Lavender Summer House frontend application. It is written in Angular 7 and Pug with Sass.

DEV site: http://dev.levendulabalatonmaria.info.s3-website.eu-central-1.amazonaws.com/

PROD site: http://levendulabalatonmaria.info.s3-website.eu-central-1.amazonaws.com/

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
* Rose graph (to visualize distance and activity)
* Booking service frontend with re-captcha integration

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