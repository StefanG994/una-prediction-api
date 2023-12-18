import { env } from "process";

export default () => ({
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  database: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 8080
  },
  gmailUser: process.env.GMAIL_USER,
  gmailPass: process.env.GMAIL_PASS,
  portal: {
    url: process.env.PORTAL_URL
  },
  password: {
    resetPath: process.env.RESET_PASSWORD_PATH
  },
  pagination: {
    perPage: parseInt(process.env.PAGINATION_PER_PAGE || "20")
  }
});
