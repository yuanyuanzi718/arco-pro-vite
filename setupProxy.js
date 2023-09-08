import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api.example.com',
      changeOrigin: true,
    })
  );
}
