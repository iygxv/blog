const fs = require('fs');
const path = require('path');

const foldersPath = [
  `${ __dirname + '/docs/webpack'}`,
  `${ __dirname + '/docs/vite'}`,
  `${ __dirname + '/docs/vue2'}`,
  `${ __dirname + '/docs/vue3'}`,
  `${ __dirname + '/docs/uniapp'}`,
  `${ __dirname + '/docs/nest'}`,
  `${ __dirname + '/docs/interview'}`,
  `${ __dirname + '/docs/javascript'}`,
  `${ __dirname + '/docs/know'}`,
  `${ __dirname + '/docs/git'}`,
  `${ __dirname + '/docs/coding'}`,
  `${ __dirname + '/docs/tools'}`,
  `${ __dirname + '/docs/regex'}`,
  `${ __dirname + '/docs/link'}`,
  `${ __dirname + '/docs/devOps'}`,
  `${ __dirname + '/docs/ts'}`,
  `${ __dirname + '/docs/project'}`,
  `${ __dirname + '/docs/css'}`,
  `${ __dirname + '/docs/mysql'}`,
  `${ __dirname + '/docs/java'}`,
  `${ __dirname + '/docs/Ai'}`,
]

const folderNameWhite = ['css']

function traverseFolder(folderPath) {
  let capitalizedFolderName = ''
  const folderName = path.basename(folderPath);

  if (folderNameWhite.includes(folderName)) {
    capitalizedFolderName = folderName;
  } else {
    capitalizedFolderName = folderName.charAt(0).toUpperCase() + folderName.slice(1);
  }
  const indexPath = path.join(folderPath, 'index.md');
  let indexContent = `---\nhidden: true\n---\n\n## ${capitalizedFolderName}\n\n`;

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('读取文件夹出错：', err);
      return;
    }
    // 过滤 index.md 并排序
    const realFiles = files.sort((a, b) => a - b);

    const p = new Promise((resolve) => {
      if (realFiles.length === 0) {
        resolve()
      }
      console.log(files)
      realFiles.forEach((file, index) => {
        const filePath = path.join(folderPath, file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error('获取文件信息出错：', err);
            return;
          }
          if (stats.isDirectory()) {
            // traverseFolder(filePath); // 递归遍历子文件夹
          } else if (path.extname(file) === '.md') {
            const fileName = path.basename(file, '.md');
            indexContent += `* [${fileName}](./${file})\n`;
          }
          setTimeout(() => {
            index === files.length - 1 && resolve();
          }, 200)
        });
      });
    })


    p.then(() => {
      fs.writeFile(indexPath, indexContent, err => {
        if (err) {
          console.error('写入index.md出错：', err);
          return;
        }
        console.log('index.md文件已生成！');
      });
    })
  });
}

foldersPath.forEach(item => {
  // console.log('item:', item)
  traverseFolder(item);
})