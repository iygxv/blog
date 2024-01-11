const fs = require('fs');
const path = require('path');

// const folderPath = __dirname + '/docs/coding'; 

// const folderPath = __dirname + '/docs/git'; 

// const folderPath = __dirname + '/docs/devOps'; 
const folderPath = __dirname + '/docs/uniapp'; 

// const folderPath = __dirname + '/docs/informalEssay'; 

// const folderPath = __dirname + '/docs/interview'; 

// const folderPath = __dirname + '/docs/javascript'; 

// const folderPath = __dirname + '/docs/know'; 

// const folderPath = __dirname + '/docs/link'; 

// const folderPath = __dirname + '/docs/regex'; 

// const folderPath = __dirname + '/docs/tools'; 

// const folderPath = __dirname + '/docs/ts'; 

// const folderPath = __dirname + '/docs/vite'; 

// const folderPath = __dirname + '/docs/vue2'; 

// const folderPath = __dirname + '/docs/vue3'; 

// const folderPath = __dirname + '/docs/webpack'; 


const folderName = path.basename(folderPath);
const capitalizedFolderName = folderName.charAt(0).toUpperCase() + folderName.slice(1);
const indexPath = path.join(folderPath, 'index.md');
let indexContent = `---\nhidden: true\n---\n\n## ${capitalizedFolderName}\n`;

function traverseFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('读取文件夹出错：', err);
      return;
    }

    const p = new Promise((resolve) => {
      if (files.length === 0) {
        resolve()
      }
      files.forEach((file, index) => {
        const filePath = path.join(folderPath, file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error('获取文件信息出错：', err);
            return;
          }
          if (stats.isDirectory()) {
            // traverseFolder(filePath); // 递归遍历子文件夹
          } else if (path.extname(file) === '.md' && file !== 'index.md') {
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

traverseFolder(folderPath);