const fs = require('fs-extra');
const path = require('path');

async function buildDeploy() {
  const deployDir = 'deploy';

  try {
    // 清理部署目录
    await fs.remove(deployDir);
    await fs.ensureDir(deployDir);

    console.log('🚀 开始复制部署文件...');

    // 复制 .next/standalone 到 deploy/standalone
    const standaloneSrc = path.join('.next', 'standalone');
    const standaloneDest = path.join(deployDir, 'standalone');
    if (await fs.pathExists(standaloneSrc)) {
      await fs.copy(standaloneSrc, standaloneDest);
      console.log(`✅ 复制: ${standaloneSrc} -> ${standaloneDest}`);
    } else {
      console.log(`❌ 未找到: ${standaloneSrc}`);
    }

    // 复制 .next/static 到 deploy/standalone/.next/static
    const staticSrc = path.join('.next', 'static');
    const staticDest = path.join(deployDir, 'standalone', '.next', 'static');
    if (await fs.pathExists(staticSrc)) {
      await fs.copy(staticSrc, staticDest);
      console.log(`✅ 复制: ${staticSrc} -> ${staticDest}`);
    } else {
      console.log(`❌ 未找到: ${staticSrc}`);
    }

    // 复制 public 到 deploy/standalone/public
    const publicSrc = 'public';
    const publicDest = path.join(deployDir, 'standalone', 'public');
    if (await fs.pathExists(publicSrc)) {
      await fs.copy(publicSrc, publicDest);
      console.log(`✅ 复制: ${publicSrc} -> ${publicDest}`);
    } else {
      console.log(`⚠️ 未找到: ${publicSrc}`);
    }

    // 复制可选配置文件到 deploy 根目录
    const optionalFiles = [
      'next.config.js',
      'next.config.mjs',
      '.env.production',
      '.env.local',
      'middleware.ts',
      'middleware.js',
      'tailwind.config.js',
      'tsconfig.json',
    ];
    for (const file of optionalFiles) {
      if (await fs.pathExists(file)) {
        await fs.copy(file, path.join(deployDir, file));
        console.log(`✅ 复制: ${file}`);
      }
    }

    // 创建简化的 package.json（只包含生产依赖）
    const originalPackage = await fs.readJson('package.json');
    const deployPackage = {
      name: originalPackage.name,
      version: originalPackage.version,
      scripts: {
        start: 'node standalone/server.js',
      },
      dependencies: originalPackage.dependencies || {},
    };
    const packageJsonPath = path.join(deployDir, 'package.json');
    await fs.writeJson(packageJsonPath, deployPackage, { spaces: 2 });

    console.log('🎉 部署文件准备完成！');
    console.log(`📁 部署文件位置: ${path.resolve(deployDir)}`);
  } catch (error) {
    console.error('❌ 构建部署文件失败:', error);
    process.exit(1);
  }
}

buildDeploy();
