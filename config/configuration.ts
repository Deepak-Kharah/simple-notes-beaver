export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  jwt: {
    secret: process.env.JWT_SECRET || '$0m3T3st!ngStri%g',
    expirationTime: process.env.JWT_EXPIRATION_TIME || '1h',
  },
  security: {
    allowedCorsOrigin: process.env.ALLOWED_CORS_ORIGIN || '*',
  },
  auth: {
    reservedUsernames: ['me', 'admin'],
    saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  },
});
