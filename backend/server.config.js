module.exports = {
    apps : [
        {
          name: "messenger_backend",
          script: "./src/server.js",
          env: {
            "NODE_ENV": "production",
          }
        }
    ]
  }