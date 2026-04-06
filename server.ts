import express from 'express';
// @ts-ignore
import { createServer as createViteServer } from 'vite';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file before importing anything else
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.set('trust proxy', 1);
  app.use(express.json());
  app.use(cookieParser());

  // API routes FIRST
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/check-url', async (req, res) => {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    try {
      const response = await fetch(url, { method: 'HEAD' });
      res.json({ status: response.status });
    } catch (error) {
      res.json({ status: 0 }); // 0 for unreachable
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
