const fs = require('fs');
const path = require('path');
const chalk = require('chalk'); // 终端颜色美化

// ====== 主题定义 ======
const themes = {
  minimalist: {
    name: '简约现代',
    colors: ['#3498db', '#2ecc71', '#9b59b6', '#f1c40f', '#e74c3c'],
    icons: ['✦', '◉', '◈', '⬖', '◗', '▣', '⟐', '⟡', '⟢', '◎'],
    messages: [
      '感谢阅读至此',
      '本文已结束，感谢您的阅读',
      '希望这篇文章对您有所帮助',
      '期待与您的下次相见',
      '知识无涯，学习不止'
    ]
  },
  
  elegant: {
    name: '优雅经典',
    colors: ['#2c3e50', '#8e44ad', '#16a085', '#d35400', '#2980b9'],
    icons: ['❦', '✾', '❧', '✿', '❀', '✥', '✤', '✻', '❃', '✽'],
    messages: [
      '文章到此结束，感谢您的耐心阅读',
      '感谢您阅读本文，期待为您带来更多精彩内容',
      '本文已经结束，希望对您有所启发',
      '愿这篇文章为您的学习之旅增添一抹亮色',
      '知识的殿堂由一砖一瓦构筑，感谢您与我同行'
    ]
  },
  
  geometric: {
    name: '几何图形',
    colors: ['#1abc9c', '#3498db', '#9b59b6', '#f1c40f', '#e74c3c'],
    icons: ['◆', '◇', '■', '□', '▲', '△', '●', '○', '◐', '◑'],
    messages: [
      '文章到此结束，感谢阅读',
      '感谢您的阅读，希望能够帮助到您',
      '本文内容已完结，期待您的反馈',
      '知识无止境，学习无尽头',
      '感谢您花时间阅读本文，希望对您有所帮助'
    ]
  },
  
  gradient: {
    name: '渐变风格',
    colors: ['linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
             'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', 
             'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', 
             'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
             'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)'],
    icons: ['✧', '❈', '❉', '✯', '✰', '✵', '✴', '✶', '✷', '✸'],
    messages: [
      '文章到此结束，感谢您的阅读',
      '感谢您读完本文，期待下次相见',
      '本文已经完结，希望对您有所启发',
      '知识如海，学无止境',
      '文章虽已结束，思考不会停止'
    ]
  },
  
  tech: {
    name: '科技未来',
    colors: ['#4158D0', '#00c6ff', '#0072ff', '#11998e', '#38ef7d'],
    icons: ['⌘', '⌬', '⎔', '⌅', '⌆', '⎈', '⌃', '⌄', '⌂', '⌁'],
    messages: [
      '感谢阅读，编码不止',
      '代码千万行，感谢您的阅读',
      '技术无涯，感谢同行',
      '编程之路漫漫，感谢您驻足阅读',
      '技术迭代不止，学习永不停歇'
    ]
  }
};

// 生成结尾内容
function generateEnding(themeName = null) {
  // 选择主题
  let theme;
  if (themeName && themes[themeName]) {
    theme = themes[themeName];
  } else {
    const themeKeys = Object.keys(themes);
    const randomThemeKey = themeKeys[Math.floor(Math.random() * themeKeys.length)];
    theme = themes[randomThemeKey];
  }
  
  // 随机选择颜色、图标和消息
  const color = theme.colors[Math.floor(Math.random() * theme.colors.length)];
  const icon = theme.icons[Math.floor(Math.random() * theme.icons.length)];
  const message = theme.messages[Math.floor(Math.random() * theme.messages.length)];
  
  // 为图标选择随机样式
  const fontSize = 16 + Math.floor(Math.random() * 8); // 16-24px
  const spacing = 3 + Math.floor(Math.random() * 5);   // 3-8px
  
  // 生成分隔符
  const separatorLength = 3 + Math.floor(Math.random() * 3); // 3-5个图标
  const separator = Array(separatorLength).fill(icon).join(' ');
  
  // 创建美观的HTML结尾
  const html = `
<!-- ARTICLE_BEAUTIFIER_START -->
<br/>
<div style="position: relative; margin: 2em 0; padding: 1.5em 1em; border-radius: 8px; overflow: hidden; ${
  color.includes('gradient') ? 
  `background: ${color};` : 
  `background-color: ${color}15; border-left: 4px solid ${color};`
}">
  ${
    color.includes('gradient') ?
    `<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #fff; opacity: 0.75; z-index: 1;"></div>` :
    ``
  }
  <div style="position: relative; text-align: center; z-index: 2;">
    <div style="font-size: ${fontSize}px; letter-spacing: ${spacing}px; margin-bottom: 10px; color: #222; font-weight: bold;">
      ${separator}
    </div>
    <div style="font-size: 1.1em; font-weight: 500; margin-bottom: 8px; color: #222;">
      ${message}
    </div>
  </div>
</div>
<!-- ARTICLE_BEAUTIFIER_END -->
`;

  return {
    content: html,
    theme: theme.name
  };
}

// 生成随机签名
function generateSignature() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `<!-- ArticleEndBeautifier: ${result} -->`;
}

// 获取时间戳
function getTimestamp() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

// 递归遍历文件夹
async function processFiles(dirPath, options) {
  try {
    const files = fs.readdirSync(dirPath);
    let stats = {
      processed: 0,
      skipped: 0,
      errors: 0,
      themeStats: {}
    };
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // 递归处理子目录
        const subStats = await processFiles(filePath, options);
        stats.processed += subStats.processed;
        stats.skipped += subStats.skipped;
        stats.errors += subStats.errors;
        
        // 合并主题统计
        for (const theme in subStats.themeStats) {
          stats.themeStats[theme] = (stats.themeStats[theme] || 0) + subStats.themeStats[theme];
        }
      } else if (shouldProcessFile(filePath, options)) {
        try {
          let fileContent = fs.readFileSync(filePath, 'utf8');
          const signature = generateSignature();
          
          // 检查是否已有结尾标记
          if (!fileContent.includes('ArticleEndBeautifier:') && 
              !fileContent.includes('<div style="position: relative; margin: 2em 0; padding: 1.5em 1em; border-radius: 8px;')) {
            // 生成新的结尾内容
            const { content, theme } = generateEnding(options.theme);
            
            // 添加结尾和签名
            if (!options.dryRun) {
              fs.appendFileSync(filePath, content + '\n' + signature);
            }
            
            // 更新统计
            stats.processed++;
            stats.themeStats[theme] = (stats.themeStats[theme] || 0) + 1;
            
            if (!options.quiet) {
              console.log(chalk.green(`✅ [${theme}] 添加完成：${filePath}${options.dryRun ? ' (预览模式)' : ''}`));
            }
          } else if (options.forceUpdate) {
            // 强制更新已有结尾
            const endingStartPos = Math.max(
              fileContent.lastIndexOf('<br/>\n<div style="position: relative; margin: 2em 0;'),
              fileContent.lastIndexOf('<br/>\n<hr />')
            );
            
            if (endingStartPos !== -1) {
              // 移除旧的结尾内容
              fileContent = fileContent.substring(0, endingStartPos);
              
              // 添加新的结尾内容
              const { content, theme } = generateEnding(options.theme);
              
              if (!options.dryRun) {
                fs.writeFileSync(filePath, fileContent + content + '\n' + signature);
              }
              
              // 更新统计
              stats.processed++;
              stats.themeStats[theme] = (stats.themeStats[theme] || 0) + 1;
              
              if (!options.quiet) {
                console.log(chalk.blue(`🔄 [${theme}] 更新完成：${filePath}${options.dryRun ? ' (预览模式)' : ''}`));
              }
            } else {
              stats.skipped++;
              if (options.verbose) {
                console.log(chalk.yellow(`⏩ 无法找到更新点：${filePath}`));
              }
            }
          } else {
            stats.skipped++;
            if (options.verbose) {
              console.log(chalk.yellow(`⏩ 已有结尾，跳过：${filePath}`));
            }
          }
        } catch (error) {
          stats.errors++;
          if (!options.quiet) {
            console.error(chalk.red(`❌ 处理文件失败：${filePath}`));
            if (options.verbose) {
              console.error(error);
            }
          }
        }
      }
    }
    
    return stats;
  } catch (error) {
    console.error(chalk.red(`❌ 目录访问失败：${dirPath}`));
    if (options.verbose) {
      console.error(error);
    }
    return { processed: 0, skipped: 0, errors: 1, themeStats: {} };
  }
}

// 判断文件是否应该处理
function shouldProcessFile(filePath, options) {
  const basename = path.basename(filePath);
  const ext = path.extname(filePath);
  
  // 基本过滤：扩展名为.md，且不以index开头
  if (ext !== '.md' || basename.startsWith('index')) {
    return false;
  }
  
  // 检查排除模式
  if (options.exclude && options.exclude.some(pattern => {
    return new RegExp(pattern).test(filePath);
  })) {
    return false;
  }
  
  // 检查包含模式
  if (options.include && options.include.length > 0) {
    return options.include.some(pattern => {
      return new RegExp(pattern).test(filePath);
    });
  }
  
  return true;
}

// 打印帮助信息
function printHelp() {
  console.log(chalk.cyan('=== 精美文章结尾生成器 V4.0 ==='));
  console.log(chalk.white('\n用法: node beautify.js [选项] [目标文件夹]'));
  console.log(chalk.white('\n选项:'));
  console.log(chalk.white('  --help, -h       显示帮助信息'));
  console.log(chalk.white('  --dry-run, -d    预览模式，不实际修改文件'));
  console.log(chalk.white('  --force, -f      强制更新已有结尾'));
  console.log(chalk.white('  --theme=<主题>   指定使用的主题(minimalist, elegant, geometric, gradient, tech)'));
  console.log(chalk.white('  --verbose, -v    显示详细输出'));
  console.log(chalk.white('  --quiet, -q      安静模式，仅显示错误'));
  console.log(chalk.white('  --exclude=<模式> 排除匹配的文件(支持正则表达式)'));
  console.log(chalk.white('  --include=<模式> 仅包含匹配的文件(支持正则表达式)'));
  console.log(chalk.white('\n主题说明:'));
  console.log(chalk.white('  - minimalist: 简约现代风格，干净清爽'));
  console.log(chalk.white('  - elegant: 优雅经典风格，典雅大方'));
  console.log(chalk.white('  - geometric: 几何图形风格，现代感强'));
  console.log(chalk.white('  - gradient: 渐变色彩风格，色彩丰富'));
  console.log(chalk.white('  - tech: 科技未来风格，适合技术文章'));
  console.log(chalk.white('\n示例:'));
  console.log(chalk.white('  node beautify.js                # 处理默认目录(./docs)'));
  console.log(chalk.white('  node beautify.js ./src/posts    # 处理指定目录'));
  console.log(chalk.white('  node beautify.js --theme=gradient  # 使用渐变风格主题'));
  console.log(chalk.white('  node beautify.js --dry-run -v   # 预览模式并显示详细信息'));
  console.log(chalk.white('\n'));
}

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    targetFolder: './docs',
    dryRun: false,
    forceUpdate: false,
    theme: null,
    verbose: false,
    quiet: false,
    exclude: [],
    include: [],
    help: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--dry-run' || arg === '-d') {
      options.dryRun = true;
    } else if (arg === '--force' || arg === '-f') {
      options.forceUpdate = true;
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    } else if (arg === '--quiet' || arg === '-q') {
      options.quiet = true;
    } else if (arg.startsWith('--theme=')) {
      options.theme = arg.split('=')[1];
    } else if (arg.startsWith('--exclude=')) {
      options.exclude.push(arg.split('=')[1]);
    } else if (arg.startsWith('--include=')) {
      options.include.push(arg.split('=')[1]);
    } else if (!arg.startsWith('--')) {
      options.targetFolder = arg;
    }
  }
  
  return options;
}

// 生成主题预览
function showThemePreview(themeName = null) {
  const previewThemes = themeName ? [themeName] : Object.keys(themes);
  
  console.log(chalk.cyan('=== 主题预览 ===\n'));
  
  for (const theme of previewThemes) {
    if (!themes[theme]) {
      console.log(chalk.red(`❌ 未知主题: ${theme}`));
      continue;
    }
    
    console.log(chalk.green(`▶ ${themes[theme].name} 主题示例:`));
    
    for (let i = 0; i < 2; i++) {
      const { content } = generateEnding(theme);
      console.log('\n预览:');
      console.log(content.split('\n').map(line => `  ${line}`).join('\n'));
      console.log('\n' + '-'.repeat(50) + '\n');
    }
  }
}

// 主函数
async function main() {
  try {
    // 解析命令行参数
    const options = parseArgs();
    
    // 显示帮助信息后退出
    if (options.help) {
      printHelp();
      return;
    }
    
    // 显示欢迎信息
    if (!options.quiet) {
      console.log(chalk.cyan(`=== 精美文章结尾生成器 V4.0 [${getTimestamp()}] ===`));
      console.log(chalk.yellow(`📁 目标文件夹: ${options.targetFolder}`));
      console.log(chalk.yellow(`🔧 运行模式: ${options.dryRun ? '预览' : (options.forceUpdate ? '强制更新' : '正常')}`));
      if (options.theme) {
        if (themes[options.theme]) {
          console.log(chalk.yellow(`🎨 指定主题: ${themes[options.theme].name}`));
        } else {
          console.log(chalk.red(`❌ 未知主题: ${options.theme}，将使用随机主题`));
          options.theme = null;
        }
      }
    }
    
    // 预览模式：展示主题样式
    if (options.dryRun && !options.quiet) {
      showThemePreview(options.theme);
      
      // 如果只是预览主题，不处理文件，则退出
      if (process.argv.includes('--preview-only')) {
        return;
      }
      
      console.log(chalk.magenta('🔍 预览模式：不会实际修改文件'));
    }
    
    if (!options.quiet) {
      console.log(chalk.cyan('\n开始处理文件...'));
    }
    
    const startTime = Date.now();
    const stats = await processFiles(options.targetFolder, options);
    const endTime = Date.now();
    
    if (!options.quiet) {
      console.log(chalk.green(`\n✨ 处理完成！`));
      console.log(chalk.yellow(`📊 统计信息:`));
      console.log(chalk.yellow(`   - 处理文件数: ${stats.processed}`));
      console.log(chalk.yellow(`   - 跳过文件数: ${stats.skipped}`));
      console.log(chalk.yellow(`   - 错误数: ${stats.errors}`));
      console.log(chalk.yellow(`   - 耗时: ${((endTime - startTime) / 1000).toFixed(2)}秒`));
      
      // 显示主题统计
      if (stats.processed > 0) {
        console.log(chalk.yellow(`\n📊 主题分布:`));
        for (const theme in stats.themeStats) {
          const percentage = ((stats.themeStats[theme] / stats.processed) * 100).toFixed(1);
          console.log(chalk.yellow(`   - ${theme}: ${stats.themeStats[theme]} (${percentage}%)`));
        }
      }
    }
  } catch (error) {
    console.error(chalk.red(`\n❌ 运行失败:`));
    console.error(error);
  }
}

// 检查chalk模块是否存在，不存在则提示安装
try {
  require.resolve('chalk');
  main();
} catch (e) {
  console.error('需要安装chalk模块以获得更好的显示效果:');
  console.error('npm install chalk@4.1.2');
  console.error('安装后再次运行此脚本');
}