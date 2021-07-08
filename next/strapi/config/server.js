const host = env("HOST", "0.0.0.0");
const httpMode =
  ["localhost", "127.0.0.1"].indexOf(host) == -1 ? "https://" : "http://";

module.exports = ({ env }) => ({
  host: host,
  port: env.int("PORT", 1337),
  url: httpMode + host + "/strapi",
  admin: {
    admin: {
      url: httpMode + host + "/admin",
    },
    auth: {
      secret: env("ADMIN_JWT_SECRET", "22c3a0b264f9cee7d3b71df56be6bace"),
    },
  },
});
