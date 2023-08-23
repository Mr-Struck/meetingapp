const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/send-otp/", {
      target: "https://dev-meeting-room-ebeee743b92a.herokuapp.com/user",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/verify-otp/", {
      target: "https://dev-meeting-room-ebeee743b92a.herokuapp.com/user",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/register", {
      target: "https://dev-meeting-room-ebeee743b92a.herokuapp.com/user",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/login", {
      target: "http://192.168.21.96:8000/user",
      changeOrigin: true,
    })
  );
};
