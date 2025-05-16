---
sidebar:
  title: 使用nest实现文件上传到七牛云
  step: 1
  isTimeLine: true
title: 使用nest实现文件上传到七牛云
tags:
  - Nest
categories:
  - Nest
---

# 使用 nest 实现文件上传到七牛云

## Node.js SDK

首先，我们可以查看七牛云开发者中心的 [Node.js SDK](https://developer.qiniu.com/kodo/1289/nodejs#5)

Node.js SDK 属于七牛服务端 SDK 之一，主要有如下功能：

- 提供生成客户端上传所需的上传凭证的功能

- 提供文件从服务端直接上传七牛的功能

- 提供对七牛空间中文件进行管理的功能

- 提供对七牛空间中文件进行处理的功能

- 提供七牛 CDN 相关的刷新，预取，日志功能

## 上传前提

1. 获取到 Access Key 、Secret Key （授权凭证的签算）
   Node.js SDK 的所有功能，都需要合法的授权。授权凭证的签算需要七牛账号下的一对有效的 Access Key 和 Secret Key
   [获取授权凭证的签算](https://portal.qiniu.com/developer/user/key?ref=developer.qiniu.com&s_path=%2Fkodo%2F1289%2Fnodejs)

2. 上传凭证

   第一步：定义好其中鉴权对象 mac：

   ```js
   var accessKey = "your access key";
   var secretKey = "your secret key";
   var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
   ```

   第二步：构建配置类

   ```js
   var config = new qiniu.conf.Config();
   // 空间对应的机房
   config.zone = qiniu.zone.Zone_z0;
   // 是否使用https域名
   //config.useHttpsDomain = true;
   // 上传是否使用cdn加速
   //config.useCdnDomain = true;
   ```

   其中关于 Zone 对象和机房的关系如下：

   | 机房 |    **Zone 对象**    |
   | :--: | :-----------------: |
   | 华东 | qiniu.zone.Zone_z0  |
   | 华北 | qiniu.zone.Zone_z1  |
   | 华南 | qiniu.zone.Zone_z2  |
   | 北美 | qiniu.zone.Zone_na0 |

   第三步：构建上传凭证

   ```js
   var options = {
     scope: bucket,
   };
   var putPolicy = new qiniu.rs.PutPolicy(options);
   var uploadToken = putPolicy.uploadToken(mac);
   ```

   这个 `uploadToken` 就是上传凭证

## 使用 nest 上传 至七牛云

1. 创建一个 nest 项目
   ```shell
   nest new qiniuUploadFile -p yarn
   ```
2. 创建一个 user resource
   ```shell
   nest g resource user
   ```
3. 安装相关依赖

```shell
 yarn add @types/multer -D
```

4. 实现代码

`user.controller.ts 代码`

```ts
import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("upload")
  @UseInterceptors(FilesInterceptor("files"))
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body
  ) {
    const res = await this.userService.uploadFiles(files, body);
    return res;
  }
}
```

`user.service.ts 代码`

```ts
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import * as qiniu from "qiniu";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  private mac: qiniu.auth.digest.Mac;
  private config: qiniu.conf.Config;
  private formUploader: qiniu.form_up.FormUploader;

  // @Inject(ConfigService)
  // private configService: ConfigService;

  constructor(private configService: ConfigService) {
    // 获取到配置中的七牛云的ak和sk
    const qn_ak = this.configService.get("qn_ak");
    const qn_sk = this.configService.get("qn_sk");
    // 定义好其中鉴权对象mac
    this.mac = new qiniu.auth.digest.Mac(qn_ak, qn_sk);
    // 构建配置
    this.config = new qiniu.conf.Config({
      zone: qiniu.zone.Zone_z2, // 华南地区
    });
    this.formUploader = new qiniu.form_up.FormUploader(this.config);
  }

  async uploadFiles(files, body) {
    return Promise.all(files.map((file) => this.uploadFile(file, body)));
  }

  private async uploadFile(file, body) {
    return new Promise((resolve, reject) => {
      const key = `${body.filePath || "public"}/${file.originalname}`;
      const bucket = `ooc`;
      const options: qiniu.form_up.PutExtra = new qiniu.form_up.PutExtra();
      const putPolicy: qiniu.rs.PutPolicy = new qiniu.rs.PutPolicy({
        scope: `${bucket}:${key}`, // 配置 bucket（位置）
        expires: 3600 * 24 * 7, // 缓存过期时间
      });
      const uploadToken: string = putPolicy.uploadToken(this.mac);
      /**
       * this.formUploader.put
       * uploadToken 上传的凭证
       * key
       * body 文件流
       * options 构建配置
       * callback 上传的回调
       */
      this.formUploader.put(
        uploadToken,
        key,
        file.buffer,
        options,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
          }

          if (respInfo && respInfo.statusCode === 200) {
            resolve(`${this.configService.get("qn_domain")}${respBody.key}`);
          } else {
            reject(respBody);
          }
        }
      );
    });
  }
}
```

## 前端相关代码

文件上传请求， 这里需要说明的是，headers 中的 `Content-Type` 为 `multipart/form-data`

```ts
import request from "./request";

export const login = (option: AxiosOptions): Promise<AxiosOptions> => {
  option.url = "/user/upload";
  return request.post({
    config: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
    ...option,
  });
};
```

vue 代码

```vue
<script setup lang="ts">
import { ref, Ref } from "vue";
import { uploadFile } from "@/api/upload";
const file: Ref<HTMLInputElement | null> = ref(null);
const filePath = ref("");
const uploading = ref(false);
const isUploaded = ref(false);
const tableData = ref([]);
const selectFiles = () => {
  let fileList = Array.from(file.value.files);
  let list = [];
  if (isUploaded.value) {
    tableData.value = [];
    isUploaded.value = false;
  }
  fileList.forEach((file: File) => {
    list.push({
      name: file.name,
      url: "",
      file: file,
    });
  });
  tableData.value = tableData.value.concat(list);
};
const deleteFile = (_, index) => {
  tableData.value.splice(index, 1);
};
const submitUpload = () => {
  let fd = new FormData();
  uploading.value = true;
  for (let i = 0; i < tableData.value.length; i++) {
    // files 需要服务端商定的
    // @UseInterceptors(FilesInterceptor('files'))
    fd.append(`files`, tableData.value[i].file);
  }
  filePath.value && fd.set("filePath", filePath.value);
  // append 会创建唯一的键，不会被覆盖
  // set 会覆盖
  uploadFile({
    data: fd, // 直接整个传
  })
    .then((res) => {
      uploading.value = false;
      res.data.forEach((item, index) => {
        tableData.value[index].url = item;
      });
    })
    .catch(() => {
      uploading.value = false;
    });
};
</script>

<template>
  <div class="app-container">
    <div class="table-search">
      <el-form inline size="default" class="table-search-form">
        <el-row>
          <el-col :sm="16">
            <el-form-item label="上传至:">
              <el-input
                v-model="filePath"
                placeholder="请输入文件夹路径"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="8">
            <el-form-item>
              <input
                style="display: none"
                ref="file"
                type="file"
                multiple
                @change="selectFiles"
              />
              <el-button
                :loading="uploading"
                type="primary"
                @click="file.click()"
              >
                {{ isUploaded ? "重新选取文件" : "选取文件" }}
              </el-button>
              <el-button
                :loading="uploading"
                :disabled="isUploaded"
                type="success"
                @click="submitUpload"
              >
                {{ isUploaded ? "已上传" : "上传到七牛" }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table :data="tableData" border>
      <el-table-column
        prop="name"
        label="文件名"
        align="center"
      ></el-table-column>
      <el-table-column prop="url" label="路径" align="center">
        <template v-slot="{ row }">
          <a :href="row.url" target="_blank">{{ row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{ row, $index }">
          <el-button type="danger" @click="deleteFile(row, $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss"></style>
```

## 七牛云错误响应

在进行文件上传的过程中，可能会遇到一些问题，可以参照下面的错误响应来解决

[七牛云错误响应](https://developer.qiniu.com/kodo/3928/error-responses)