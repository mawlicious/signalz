# Signalz

Signals is an event-emitter-like library meant to be used across different node projects without setting up a websocket or a server, with the use of [Firebase](https://firebase.com) and soon can also be used with [MongoDB](https://www.mongodb.com/)

[![npm](https://nodei.co/npm/signalz.png)](https://www.npmjs.com/package/signalz)
<a href="https://www.buymeacoffee.com/roniemartinez" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## Documentation

While this readme does cover most points, its reccomended to check out the [documentation site](https://signalz.js.org/)

## Installation

Simply just run:

```sh
$ npm i signalz
```

## Importing

```js
// Using Node.js `require()`
const Signalz = require("signalz");

// Using ES6 imports
import Signalz from "signalz";
```

## Firebase

Heres how to setup Signalz with the firebase method

### Getting Started

First import firebase-admin and initialize firebase, this is explained further [here](https://firebase.google.com/docs/admin/setup/#initialize-sdk)

```js
const firebase = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");
if (firebase.apps.length === 0) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "YOUR_DB_URL",
  });
}
```

Then initialize Signals itself:

```js
const client = new Signalz.Client("CLIENT_ID", firebase.database());
```

Client ID is explained [here](#explaining-some-terms)

### Sending a Signal

```js
await client.sendSignal("SIGNAL_ID", "TARGET_CLIENT_ID", data);
// Data can be a number, string, boolean, or object.
```

Signal ID and Target Client ID are exmplaned [here](#explaining-some-terms)

### Receiving a Signal

```js
client.on("signal", (signal) => {
  // do stuff
});
```

### Replying to Signal

After doing the code when receiving a signal, its a good practice to reply to that signal with a status of "accept" or "error" to make the other project know the status of the signal, optionally, you can add a message to the reply

```js
client.on("signal", (signal) => {
  // do stuff
  signal.reply("accept", "good!");
  // OR
  signal.reply("error", "invalid yada yada");

  // Message can be number, string, boolean, or object.
});
```

### Awaiting a Reply

```js
const sentSignal = await client.sendSignal(
  "SIGNAL_ID",
  "TARGET_CLIENT_ID",
  data
);
sentSignal.awaitReply(60000).then((data) => {
  console.log(data);
});
```

### Ending a Signal

Its important that you end a signal after you are done with it, it is optional but very recommended as it frees up space from your database.

```js
const sentSignal = await client.sendSignal(
  "SIGNAL_ID",
  "TARGET_CLIENT_ID",
  data
);
sentSignal.awaitReply(60000).then((data) => {
  console.log(data);
});
sentSignal.end();
```

OR

```js
client.on("signal", (signal) => {
  // do stuff
  signal.reply("accept", "good!");
  // OR
  signal.reply("error", "invalid yada yada");
  signal.end();
});
```

## Explaining Some Terms

| Term             | Meaning                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| CLIENT_ID        | This is used so signals can be targetted to only the project(s) with that client id                                          |
| TARGET_CLIENT_ID | You set this in the signal so the signal only goes to the projects with that client id                                       |
| SIGNAL_ID        | This is a custom id that is passed when sending the the signal so the receiving end knows which type of signal its receiving |
