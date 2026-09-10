export default () => ({
  port: parseInt(process.env.PORT ?? "3001", 10),
  contentSource: process.env.CONTENT_SOURCE ?? "json", // "json" | "prisma" (mañana)
});
