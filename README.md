# [nicehash-calculator-web](https://nicehash.garbomuffin.com)

Source code for a website that estimates the profitability of buying hashing power on NiceHash.
**If you're looking for estimations, then please visit the website: https://nicehash.garbomuffin.com**

This README is about how to run this code locally and likely irrelavent to anyone who just wants to use the site.

_This README is incomplete. You can make an issue if you need help trying to run this locally._

## Cloning

```bash
$ git clone https://github.com/GarboMuffin/nicehash-calculator-web
```

## Installing and building

```bash
# install the dependencies for the website
npm install
```

## Development setup

[Download the latest data.json and save it as `data.json` in the root of this repository.](https://nicehash.garbomuffin.com/data.json) Although not truly required, it does skip the several minute long process of an automatic update.

In a non-production environment the program will not automatically update the data to avoid getting blocked from the What To Mine API. For most development purposes the age of the data doesn't matter; there just has to be something to render. This can be changed by enabling production mode (see "Production Setup" below) or by setting `module.exports.ALLOW_UPDATES` to `true` in src/config.js.

## Running it

```bash
node index
```

**If you get a `TypeError: util.promisify is not a function` (or similar), make sure you're running Node 8 or higher.**

By default this listens on port 8080. Visit [`http://localhost:8080`](http://localhost:8080) in your browser to visit the site. You can change the this with the `PORT` environment variable or by changing `module.exports.PORT` in src/config.js.

## Production Setup

### Enabling Production Mode

Enable production mode by setting the `NODE_ENV` environment variable to `production` (recommended) or by setting `module.exports.IN_PRODUCTION` to `true` in `src/config.js`. This should also enable automatic data updates unless you made further changes to the configuration.

### Templates

You'll probably want to change some of the templates in `src/views`. Especially GitHub links, donation addresses (layout.pug), licensing, etc.

### Reverse Proxy

You'll probably want to use a reverse proxy of some sort. (nginx, apache, caddy, etc.)
