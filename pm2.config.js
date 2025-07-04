module.exports = {
  apps: [
    {
      name: 'cheche-blog',
      script: 'server.js',
      cwd: '/app/deploy/standalone', // 运行时目录，和 Dockerfile WORKDIR 保持一致
      instances: 1,
      exec_mode: 'fork', // 单进程模式，Next.js 通常用这个
      watch: false, // 生产环境关闭文件监听
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
