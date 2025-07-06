import app from './app'

const PORT = Number(process.env.PORT) || 3000

app
  .listen({ port: PORT, host: '0.0.0.0' })
  .then(() => {
    console.log(`Server runnung on port ${PORT}`)
  })
  .catch((err) => {
    console.error('Fail to start server:', err)
    process.exit(1)
  })
