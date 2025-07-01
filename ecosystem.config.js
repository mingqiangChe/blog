module.exports = {
  apps: [
    {
      name: 'next-app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 'max', // 或设为 1
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
