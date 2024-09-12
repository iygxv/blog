const fs = require('fs');
const path = require('path');

const contentToAdd = `

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
`;

// 递归遍历文件夹
function walkDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath); // 递归遍历子目录
    } else {
      if (path.extname(filePath) === '.md' && path.basename(filePath) !== 'index.md') {
        let fileContent = fs.readFileSync(filePath, 'utf8');
        if (!fileContent.includes('🌸🌸🌸🌸🌸🌸')) {
          fs.appendFileSync(filePath, contentToAdd);
          console.log(`添加完成： ${filePath}`);
        }
      }
    }
  });
}

// 指定要遍历的文件夹路径
const folderPath = './docs';

// 执行文件遍历
walkDir(folderPath);