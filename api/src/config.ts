const config = {
  appOptions: {
    logger: true,
    bodyLimit: 209715200,
  },
  serverOptions: {
    port: parseInt(process.env.API_PORT || '8080', 10),
    host: '0.0.0.0',
  }
}

export default config
