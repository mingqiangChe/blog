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
        NEXT_PUBLIC_SUPABASE_URL: 'https://fusrmsbzfmnicfsbyjzd.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1c3Jtc2J6Zm1uaWNmc2J5anpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTgwNDgsImV4cCI6MjA2ODIzNDA0OH0.xtmEdoPwsT_O8WqNnpvg-eHNst33O-ncc3B4rJ8MqUA',
        SUPABASE_SERVICE_ROLE_KEY:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1c3Jtc2J6Zm1uaWNmc2J5anpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjY1ODA0OCwiZXhwIjoyMDY4MjM0MDQ4fQ.GivYH9R0W7sElFgt-9TL1_KQ7TAhaDbRMr9Xj-2nuFg',
      },
    },
  ],
};
