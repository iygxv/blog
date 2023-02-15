#!/bin/bash

cd /var/lib/jenkins/workspace/blog

npm install
npm run build

# 删除站点文件space
rm -rf /www/vvv/space/dist/*

# 进入jenkins -> workspace -> blog
cd /var/lib/jenkins/workspace/blog/docs/.vitepress/dist

# 迁移过去
cp -rf * /www/vvv/blog/dist/