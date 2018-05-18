---
layout: blog
title: HDFS架构
categories: hdfs
tags: Hadoop
---
# HIVE入门
## 什么是HIVE  
1. Hive是建立在Hadoop HDFS上的数据仓库基础架构  
2. Hive可以用来进行数据提取转化加载(ETL)  
3. Hive定义了简单的类似SQL查询语言，称为HQL它允许熟悉SQL的用户查询数据  
4. Hive允许熟悉MapReduce开发者的开发自定义的mapper和reducer来处理内建的mapper和reducer无法完成的复杂的分析工作  
5. Hive是SQL解析引擎，他将SQL语句转移成M/RJob然后在Hadoop执行  
6. Hived的表其实就是HDFS的目录/文件
<!--more-->
## Hive元数据

* Hive 将元数据存储在数据库中(metastore) , 支持mysql、derby等数据库。
    
* Hive 中的元数据包括表的名字，表的列和分区及其属性，表的属性（是否为外部表等表的数据所在目录等）

## HQL的执行过程
 解释器、编译器、优化器完成HQL 查询语句从词法分析、语法分析编译、优化以及查询计划(Plan) 的生成。生成的查询计划存储在HDFS 中，井在随后有MapRedece 调用执行