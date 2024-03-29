const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true,
        }),
    );
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true,
        }),
    );
    app.use(
        '/media',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true,
        }),
    );
    app.use(
        '/comm/socket',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true,
        }),
    );
};
