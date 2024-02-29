const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function formatFileSize(size) {
  if (size < 1024) {
    return size + ' B';
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
}
// 在这里替换为你的图片文件夹路径
const imageDir = './docs';
const originalSizes = []; // 用于存储所有原始图片的文件大小
const compressedSizes = []; // 用于存储所有压缩后图片的文件大小

function compressAndReplaceImage(filePath) {
  const originalSize = fs.statSync(filePath).size; // 获取原始图片文件大小
  originalSizes.push(originalSize); // 将原始图片文件大小存入数组

  return sharp(filePath, {
    animated: true,
    limitInputPixels: false,
  }).png({
    compressionLevel: 9,
  }).toBuffer().then(data => {
      fs.writeFileSync(filePath, data); // 覆盖原始图片

      const compressedSize = fs.statSync(filePath).size; // 获取压缩后的图片文件大小
      compressedSizes.push(compressedSize); // 将压缩后的图片文件大小存入数组

      console.log(`${filePath} 压缩完成`);
    })
    .catch(err => {
      console.error(`压缩并替换图片时发生错误: ${err}`);
    });
}

// 递归查找文件
function findImagesInDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findImagesInDir(filePath); // 如果是目录，则递归查找
    } else {
      if (/\.(jpg|jpeg|png)$/i.test(file)) {
        compressAndReplaceImage(filePath);
      }
    }
  });
}

// 压缩图片并计算原始图片文件大小的总和
findImagesInDir(imageDir);

// 在所有图片压缩完成后，进行统计和输出
process.on('exit', () => {
  const totalOriginalSize = originalSizes.reduce((sum, size) => sum + size, 0);
  console.log(`所有原始图片的文件大小总和为: ${formatFileSize(totalOriginalSize)}`);

  const totalCompressedSize = compressedSizes.reduce((sum, size) => sum + size, 0);
  console.log(`所有压缩后图片的文件大小总和为: ${formatFileSize(totalCompressedSize)}`);

  const totalDifference = totalOriginalSize - totalCompressedSize;
  console.log(`所有图片压缩完成，总的文件大小减少了 ${formatFileSize(totalDifference)}`);
});