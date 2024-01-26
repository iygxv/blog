---
sidebar: 
 title: 快速入门mysql
 step: 1
 isTimeLine: true
title: 快速入门mysql
tags:
 - mysql
categories:
 - mysql
---

# 快速入门mysql

## 常用的字段类型
- INT：存储整数
- VARCHAR(100): 存储变长字符串，可以指定长度
- CHAR：定长字符串，不够的自动在末尾填充空格
- DOUBLE：存储浮点数
- DATE：存储日期 2023-05-27
- TIME：存储时间 10:13
- DATETIME：存储日期和时间 2023-05-27 10:13

## 表的基本使用
例如：现有一张名为 user 表，包含 id, name, age, sex 字段，用这张表来展示基本的 sql 语句

### 创建表
```sql
CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Id',
    name VARCHAR(50) NOT NULL COMMENT '学生名',
    sex VARCHAR(10) NOT NULL COMMENT '性别',
    age INT NOT NULL COMMENT '年龄') CHARSET=utf8mb4
```

### 查询
```sql
SELECT * FROM user;
SELECT * FROM user WHERE id = 1;
SELECT * FROM user WHERE id = 1 AND name = '小缘';
SELECT * FROM user WHERE id = 1 OR name = '小缘';
SELECT * FROM user WHERE id = 1 AND name = '小缘' OR sex = '男';
SELECT * FROM user WHERE id = 1 AND name = '小缘' AND sex = '男';
```
### 更新
```sql
UPDATE user SET name = '随缘' WHERE id = 1;
UPDATE user SET name = '随缘', age = 20 WHERE id = 1;
UPDATE user SET name = '随缘', age = 20, sex = '男' WHERE id = 1; 
```
### 删除
```sql
DELETE FROM user WHERE id = 1;
DELETE FROM user WHERE id = 1 AND name = '随缘';
DELETE FROM user WHERE id = 1 AND name = '随缘' AND sex = '男';
```
### 插入
```sql
INSERT INTO user (id, name, age, sex) VALUES (1, '随缘', 20, '男');
INSERT INTO user (id, name, age, sex) VALUES (1, '随缘', 20, '男'), (2, '王五', 21, '女');
```

## 查询语法和函数
### 查询语法
- where：查询条件，比如 where id=1
  ```sql
  SELECT * FROM user WHERE id=1;
  ```
- as：别名，比如 select xxx as 'yyy'
  ```sql
    SELECT name as '姓名' FROM user ;
  ```
- and: 连接多个条件
  ```sql
  SELECT * FROM user WHERE id= 1 and name='随缘';
  ```
- in/not in：集合查找，比如 where a in (1,2)
  ```sql
    -- 在 id 为 1、2、3 寻找
    SELECT * FROM user WHERE id in (1,2,3);
    
    -- 不在 id 为 1、2、3 寻找
    SELECT * FROM user WHERE id not in (1,2,3);
  ```
- between and：区间查找，比如 where a between 1 and 10
  ```sql
  SELECT * FROM user WHERE id between 1 and 10;
  ```
- limit：分页，比如 limit 0,5
  ```sql
  -- 从第 0 个开始，取 5 个
  SELECT * FROM user limit 0,5;
  ```
- order by：排序，可以指定先根据什么升序、如果相等再根据什么降序，比如 order by a desc,b asc
  ```sql
  -- 先根据 a 降序，如果 a 相同再根据 b 升序
  SELECT * FROM user order by a desc,b asc;
  ```
- group by：分组，比如 group by aaa
  ```sql
  -- 分组，比如分组求和
  SELECT * FROM user group by aaa;
  ```
- having：分组之后再过滤，比如 group by aaa having xxx > 5
  ```sql
  -- 分组之后再过滤，比如 group by aaa having xxx > 5
  SELECT * FROM user group by aaa having xxx > 5;
  ```
- distinct：去重
  ```sql
  -- 去重
  SELECT * FROM user distinct xxx;
  ```

### 函数
- 聚合函数：avg、count、sum、min、max
  ```sql
  -- 聚合函数：avg、count、sum、min、max
  SELECT avg(xxx), count(xxx), sum(xxx), min(xxx), max(xxx) FROM user;
  ```
- 字符串函数：concat、substr、length、upper、lower
  ```sql
  -- 字符串函数：concat、substr、length、upper、lower
  SELECT concat(xxx, xxx), substr(xxx, 1, 2), length(xxx), upper(xxx), lower(xxx) FROM user;
  ```
- 数值函数：round、ceil、floor、abs、mod
  ```sql
  -- 数值函数：round、ceil、floor、abs、mod
  SELECT round(xxx), ceil(xxx), floor(xxx), abs(xxx), mod(xxx) FROM user;
  ```
- 日期函数：year、month、day、date、time
  ```sql
  -- 日期函数：year、month、day、date、time
  SELECT year(xxx), month(xxx), day(xxx), date(xxx), time(xxx) FROM user;
  ```
- 条件函数：if、case
  ```sql
  -- 条件函数：if、case
  SELECT if(xxx, xxx, xxx), case xxx when xxx then xxx else xxx end FROM user;
  ```
- 系统函数：version、datebase、user
  ```sql
  -- 系统函数：version、datebase、user
  SELECT version(), database(), user(), convert(xxx, xxx), cast(xxx as xxx), date_format(xxx, xxx), str_to_date(xxx, xxx) FROM user;
  ```
- 类型转换函数：convert、cast、date_format、str_to_date
  ```sql
  -- 类型转换函数：convert、cast、date_format、str_to_date
  SELECT convert(xxx, xxx), cast(xxx as xxx), date_format(xxx, xxx), str_to_date(xxx, xxx), nullif(xxx, xxx), coalesce(xxx, xxx), greatest(xxx, xxx), least(xxx, xxx) FROM user;
  ```
- 其他函数：nullif、coalesce、greatest、least
  ```sql
  -- 其他函数：nullif、coalesce、greatest、least
  SELECT nullif(xxx, xxx), coalesce(xxx, xxx), greatest(xxx, xxx), least(xxx, xxx) FROM user;
  ```
