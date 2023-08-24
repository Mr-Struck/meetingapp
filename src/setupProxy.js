const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/send-otp/", {
      target: "http://192.168.21.96:8000/user",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/verify-otp/", {
      target: "http://192.168.21.96:8000/user",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/register", {
      target: "http://192.168.21.96:8000/user",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/login", {
      target: "http://192.168.21.96:8000/user",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/forgot_password", {
      target: "http://192.168.21.96:8000/user",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/aravalli/", {
      target: "http://192.168.21.96:8000",
      changeOrigin: true,
    })
  );
};
