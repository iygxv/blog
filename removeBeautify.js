const fs = require('fs');
const path = require('path');
const chalk = require('chalk'); // 终端颜色美化

// 定义可能的结尾标记模式
const endingPatterns = [
  // 新样式 - 带标记的版本
  {
    name: '新样式(带标记)',
    start: '<!-- ARTICLE_BEAUTIFIER_START -->',
    end: '<!-- ARTICLE_BEAUTIFIER_END -->',
    checker: (content) => content.includes('<!-- ARTICLE_BEAUTIFIER_START -->')
  },
  // 新样式 - 不带标记的版本
  {
    name: '新样式(无标记)',
    start: '<br/>\n<div style="position: relative; margin: 2em 0; padding: 1.5em 1em; border-radius: 8px;',
    end: '</div>\n</div>',
    checker: (content) => content.includes('<div style="position: relative; margin: 2em 0; padding: 1.5em 1em; border-radius: 8px;')
  }
];

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    targetFolder: './docs',
    dryRun: false,
    verbose: false,
    quiet: false,
    exclude: [],
    include: [],
    help: false,
    all: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--dry-run' || arg === '-d') {
      options.dryRun = true;
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    } else if (arg === '--quiet' || arg === '-q') {
      options.quiet = true;
    } else if (arg === '--all' || arg === '-a') {
      options.all = true;
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

// 打印帮助信息
function printHelp() {
  console.log(chalk.cyan('=== 文章结尾移除工具 V2.0 ==='));
  console.log(chalk.white('\n用法: node removeBeautify.js [选项] [目标文件夹]'));
  console.log(chalk.white('\n选项:'));
  console.log(chalk.white('  --help, -h       显示帮助信息'));
  console.log(chalk.white('  --dry-run, -d    预览模式，不实际修改文件'));
  console.log(chalk.white('  --verbose, -v    显示详细输出'));
  console.log(chalk.white('  --quiet, -q      安静模式，仅显示错误'));
  console.log(chalk.white('  --all, -a        移除所有风格的结尾'));
  console.log(chalk.white('  --exclude=<模式> 排除匹配的文件(支持正则表达式)'));
  console.log(chalk.white('  --include=<模式> 仅包含匹配的文件(支持正则表达式)'));
  console.log(chalk.white('\n示例:'));
  console.log(chalk.white('  node removeBeautify.js                # 处理默认目录(./docs)'));
  console.log(chalk.white('  node removeBeautify.js ./src/posts    # 处理指定目录'));
  console.log(chalk.white('  node removeBeautify.js --all -v       # 移除所有风格的结尾并显示详细信息'));
  console.log(chalk.white('  node removeBeautify.js --dry-run      # 预览模式，不实际修改文件'));
  console.log('\n');
}

// 获取时间戳
function getTimestamp() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
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

// 从文件中移除指定模式的内容
function removeContentFromFile(filePath, options) {
  try {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let originalSize = fileContent.length;
    let wasModified = false;
    let removedPatterns = [];
    let removedSignature = false;
    
    // 检查并移除每种结尾模式
    for (const pattern of endingPatterns) {
      if (!options.all && pattern.name !== '新样式(带标记)') {
        continue;
      }
      if (pattern.checker(fileContent)) {
        // 用正则移除结尾及其前后的多余空行
        const regex = new RegExp(`\n*${pattern.start}[\s\S]*?${pattern.end}\n*`, 'g');
        if (regex.test(fileContent)) {
          if (options.dryRun && options.verbose) {
            const match = fileContent.match(regex);
            if (match) {
              console.log(chalk.yellow(`\n在文件 ${filePath} 中找到 ${pattern.name} 风格的结尾:`));
              console.log(chalk.gray('—'.repeat(50)));
              console.log(match[0]);
              console.log(chalk.gray('—'.repeat(50)));
            }
          }
          if (!options.dryRun) {
            fileContent = fileContent.replace(regex, '');
            wasModified = true;
            removedPatterns.push(pattern.name);
          }
        }
      }
    }
    
    // 检查并移除签名标记及其前后的多余空行
    const signatureRegex = /\n*<!-- ArticleEndBeautifier: [a-zA-Z0-9]+ -->\n*/g;
    if (signatureRegex.test(fileContent)) {
      signatureRegex.lastIndex = 0;
      if (options.dryRun && options.verbose) {
        let match;
        while ((match = signatureRegex.exec(fileContent)) !== null) {
          console.log(chalk.yellow(`\n在文件 ${filePath} 中找到签名标记:`));
          console.log(chalk.gray('—'.repeat(50)));
          console.log(match[0]);
          console.log(chalk.gray('—'.repeat(50)));
        }
      }
      if (!options.dryRun) {
        const newContent = fileContent.replace(signatureRegex, '');
        if (newContent !== fileContent) {
          fileContent = newContent;
          wasModified = true;
          removedSignature = true;
        }
      } else {
        removedSignature = true;
      }
    }
    
    // 移除文件末尾多余空行
    if (!options.dryRun) {
      fileContent = fileContent.replace(/\n{3,}$/g, '\n\n');
    }
    
    if (wasModified && !options.dryRun) {
      fs.writeFileSync(filePath, fileContent);
      const newSize = fileContent.length;
      const reducedSize = originalSize - newSize;
      if (!options.quiet) {
        let message = `✅ 已移除`;
        if (removedPatterns.length > 0) {
          message += ` [${removedPatterns.join(', ')}] 结尾`;
        }
        if (removedSignature) {
          message += `${removedPatterns.length > 0 ? ' 和' : ''} 签名标记`;
        }
        console.log(chalk.green(`${message}: ${filePath} (减少 ${reducedSize} 字节)`));
      }
      return { success: true, patterns: removedPatterns, reducedSize, removedSignature };
    } else if (options.dryRun && (removedPatterns.length > 0 || removedSignature)) {
      if (!options.quiet) {
        let message = `🔍 预览: 将移除`;
        if (removedPatterns.length > 0) {
          message += ` [${removedPatterns.join(', ')}] 结尾`;
        }
        if (removedSignature) {
          message += `${removedPatterns.length > 0 ? ' 和' : ''} 签名标记`;
        }
        console.log(chalk.blue(`${message}: ${filePath}`));
      }
      return { success: true, dryRun: true, patterns: removedPatterns, removedSignature };
    }
    return { success: false };
  } catch (error) {
    if (!options.quiet) {
      console.error(chalk.red(`❌ 处理文件失败: ${filePath}`));
      if (options.verbose) {
        console.error(error);
      }
    }
    return { success: false, error: error.message };
  }
}

// 递归遍历文件夹
async function processFiles(dirPath, options) {
  try {
    const files = fs.readdirSync(dirPath);
    let stats = {
      processed: 0,
      skipped: 0,
      errors: 0,
      patternStats: {}
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
        
        // 合并模式统计
        for (const pattern in subStats.patternStats) {
          stats.patternStats[pattern] = (stats.patternStats[pattern] || 0) + subStats.patternStats[pattern];
        }
      } else if (shouldProcessFile(filePath, options)) {
        const result = removeContentFromFile(filePath, options);
        
        if (result.success) {
          if (!result.dryRun) {
            stats.processed++;
            // 更新模式统计
            for (const pattern of result.patterns) {
              stats.patternStats[pattern] = (stats.patternStats[pattern] || 0) + 1;
            }
          }
        } else if (result.error) {
          stats.errors++;
        } else {
          stats.skipped++;
          if (options.verbose && !options.quiet) {
            console.log(chalk.yellow(`⏩ 未找到可移除的结尾: ${filePath}`));
          }
        }
      }
    }
    
    return stats;
  } catch (error) {
    console.error(chalk.red(`❌ 目录访问失败: ${dirPath}`));
    if (options.verbose) {
      console.error(error);
    }
    return { processed: 0, skipped: 0, errors: 1, patternStats: {} };
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
      console.log(chalk.cyan(`=== 文章结尾移除工具 V2.0 [${getTimestamp()}] ===`));
      console.log(chalk.yellow(`📁 目标文件夹: ${options.targetFolder}`));
      console.log(chalk.yellow(`🔧 运行模式: ${options.dryRun ? '预览' : '正常'}`));
      console.log(chalk.yellow(`📦 处理范围: ${options.all ? '所有风格结尾' : '仅带标记的新样式'}`));
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
      
      if (options.dryRun) {
        console.log(chalk.yellow(`   - 预览模式: 未实际修改文件`));
      } else {
        console.log(chalk.yellow(`   - 处理文件数: ${stats.processed}`));
        console.log(chalk.yellow(`   - 跳过文件数: ${stats.skipped}`));
        console.log(chalk.yellow(`   - 错误数: ${stats.errors}`));
      }
      
      console.log(chalk.yellow(`   - 耗时: ${((endTime - startTime) / 1000).toFixed(2)}秒`));
      
      // 显示模式统计
      if (stats.processed > 0) {
        console.log(chalk.yellow(`\n📊 风格分布:`));
        for (const pattern in stats.patternStats) {
          const percentage = ((stats.patternStats[pattern] / stats.processed) * 100).toFixed(1);
          console.log(chalk.yellow(`   - ${pattern}: ${stats.patternStats[pattern]} (${percentage}%)`));
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