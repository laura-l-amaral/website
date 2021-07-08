module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "http://" + env("HOST", "0.0.0.0") + "/strapi",
  admin: {
    url: "http://" + env("HOST", "0.0.0.0") + "/admin",
    auth: {
      secret: env("ADMIN_JWT_SECRET", "22c3a0b264f9cee7d3b71df56be6bace"),
    },
  },
});
