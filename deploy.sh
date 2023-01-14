#!/bin/bash

rm -rf /var/lib/jenkins/workspace/space/docs/.vitepress/dist/*

cd /var/lib/jenkins/workspace/space

npm install
npm run build

# 删除站点文件space
rm -rf /www/vvv/space/*

# 进入jenkins -> workspace -> space
cd /var/lib/jenkins/workspace/space/docs/.vitepress/dist

# 迁移过去
cp -rf * /www/vvv/space/