module.exports = {
  apps: [
    {
      name: 'demo-node',
      script: 'index.js',
      exec_mode: 'cluster',
      instances: 1,
      // Absolute path to bootstrap outside the app dir
      node_args: ['--require', '/opt/otel/tracing.cjs'],
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        OTEL_SERVICE_NAME: 'demo-node-dev',
        OTEL_TRACES_EXPORTER: 'otlp',
        OTEL_EXPORTER_OTLP_ENDPOINT: 'http://otel-collector:4318',
        OTEL_EXPORTER_OTLP_PROTOCOL: 'http/protobuf',
        OTEL_LOG_LEVEL: 'info'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        OTEL_SERVICE_NAME: 'demo-node',
        OTEL_TRACES_EXPORTER: 'otlp',
        OTEL_EXPORTER_OTLP_ENDPOINT: 'http://otel-collector:4318',
        OTEL_EXPORTER_OTLP_PROTOCOL: 'http/protobuf',
        OTEL_LOG_LEVEL: 'info'
      },
      out_file: undefined,
      error_file: undefined,
      merge_logs: true
    }
  ]
};
