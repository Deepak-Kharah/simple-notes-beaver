export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  jwt: {
    secret: process.env.JWT_SECRET || '$0m3T3st!ngStri%g',
    expirationTime: process.env.JWT_EXPIRATION_TIME || '1h',
  },
  security: {
    allowedCorsOrigin: JSON.parse(process.env.ALLOWED_CORS_ORIGIN) || [
      'http://localhost:3000',
    ],
  },
});
