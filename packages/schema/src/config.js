export default {

  /**
   * REST API configuration.
   */
  api: {
    prefix: '', // global REST API prefix
  },

  /**
   * Logging configuration.
   */
  log: {
    level: process.env.LOG_LEVEL || "info",
  },

  /**
   * Storing and processing of files.
   */
  storage: {
    cloud: {
      google: {
        enabled: process.env.GCLOUD_STORAGE_ENABLED === 'true',
        bucketName: process.env.GCLOUD_STORAGE_BUCKET,
        proxyUrl: `https://storage.googleapis.com/${process.env.GCLOUD_STORAGE_BUCKET}`,
      }
    },
    disk: {
      path: process.env.CONTENT_STORE,
    }
  },

  /**
   * Database settings.
   */
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    initDatabase: process.env.DATABASE_INITDB,
    directConnection: process.env.DATABASE_DIRECT_CONNECTION === 'true',
  },
};
