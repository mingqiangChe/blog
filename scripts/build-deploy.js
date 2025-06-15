const fs = require('fs-extra');
const path = require('path');

async function buildDeploy() {
  const deployDir = 'deploy';

  try {
    // 清理部署目录
    await fs.remove(deployDir);
    await fs.ensureDir(deployDir);

    console.log('🚀 开始复制部署文件...');

    // 复制必需的文件和文件夹
    const filesToCopy = [
      { src: '.next', dest: path.join(deployDir, '.next') },
      { src: 'public', dest: path.join(deployDir, 'public') },
      { src: 'package.json', dest: path.join(deployDir, 'package.json') },
    ];

    // 可选文件（如果存在则复制）
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

    // 复制必需文件
    for (const file of filesToCopy) {
      if (await fs.pathExists(file.src)) {
        await fs.copy(file.src, file.dest);
        console.log(`✅ 复制: ${file.src} -> ${file.dest}`);
      } else {
        console.log(`⚠️  文件不存在: ${file.src}`);
      }
    }

    // 复制可选文件
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
        start: originalPackage.scripts.start,
      },
      dependencies: originalPackage.dependencies || {},
    };

    await fs.writeJson(path.join(deployDir, 'package.json'), deployPackage, {
      spaces: 2,
    });

    console.log('🎉 部署文件准备完成！');
    console.log(`📁 部署文件位置: ${path.resolve(deployDir)}`);
  } catch (error) {
    console.error('❌ 构建部署文件失败:', error);
    process.exit(1);
  }
}

buildDeploy();
