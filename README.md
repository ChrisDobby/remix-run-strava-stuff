# Remix Strava Stuff

Welcome to Remix Strava Stuff

This is an application I'm building primarily to learn [Remix](https://remix.run)
It will allow users to login to Strava and do some stuff (as yet unspecified!) with their Strava data

## Prerequisites

- [nodejs](https://nodejs.org)
- [yarn](https://yarnpkg.com)

## Environment Variables

The following environment variables will need to be available - recommend using a .env file

`STRAVA_CLIENT_ID`
`STRAVA_CLIENT_SECRET`
Values for these variables can be obtained from [Strava API settings](https://www.strava.com/settings/api)

## Development

You will need a [Remix](https://remix.run) license key and you can follow the instructions for how to use that from your [Remix dashboard](https://remix.run)

Then, install all dependencies using `yarn`:

```sh
$ yarn install
```

Once everything is installed, start the app in development mode with the
following command:

```sh
$ yarn dev
```

This will run a few processes concurrently that will dynamically rebuild as your
source files change. To see your changes, refresh the browser.

> Note: Hot module reloading is coming soon, which will allow you to see your
> changes without refreshing.

## Production

To run the app in production mode, you'll need to build it first.

```sh
$ yarn build
$ yarn start
```

This will start a single HTTP server process that will serve the app from the
files generated in the build step.
