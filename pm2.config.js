module.exports = {
  apps: [
    {
      name: 'cheche-blog',
      script: 'server.js',
      cwd: '/app/deploy/standalone',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
