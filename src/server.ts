import { Hono } from 'hono';
import { serveStatic } from 'hono/bun'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const app = new Hono();

app.get('/', serveStatic({ path: './src/index.html' }));
app.get('/client.js', serveStatic({ path: './src/client.js' }))

app.get('/items', async (c) => {
  const res = c.res;
  res.headers.set('Content-Type', 'application/json');
  // required for streaming
  res.headers.set('Transfer-Encoding', 'chunked');

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 5; i++) {
        // Firefox buffers if chunk sizes are too small, so for cross-browser demo purposes, make the chunks artificially large
        const item = { id: crypto.randomUUID(), value: Array.from({ length: 1000 }, () => 'x').join('') };
        // Send chunk to client
        controller.enqueue(JSON.stringify(item) + '\n');
        // Simulate delay
        await wait(1000);
      }
      // End of stream
      controller.close();
    },
  });

  return new Response(stream);
});

export default app;
