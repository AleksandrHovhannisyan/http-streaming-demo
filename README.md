# Streams demo

This repo contains a simple example of how a server can stream its response to a client.

## Why?

The traditional content transfer strategy on the web is known as **buffering**, where a server sends a response in its entirety to the client. This is how the majority of the web has worked, but buffering means that the client has to wait for the full response to be ready before it can begin to do something with it. If the response is very large, then the client may need to wait a few seconds or more, depending on network conditions.

With streaming, the client can "subscribe" to the streamed response and consume the items one at a time as they arrive.

The overall network response time still ends up being roughly the same: With buffering, the client would wait maybe 5 seconds to get 5 items back from an API. With streaming, it would still take the same amount of time to get all five items, but the client can begin to work with the first, second, and third items without waiting for the rest.

## Getting Started

To run the demo:

1. Install dependencies:

```sh
bun install
```

2. Then, start the server:

```sh
bun dev
```

Open the app on http://localhost:3000/.