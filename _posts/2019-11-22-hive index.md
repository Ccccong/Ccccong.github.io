---
title: hive index
layout: post
---
## hive 在3.0就已经移除了索引  
更新文档显示如下： 如果用户需要快速查找一小部分记录，他们可以使用Apache HBase;如果需要快速检索大数据集，或者需要快速join、聚合，他们可以使用Apache Impala。  
在我看来，Hive索引在Hive的未来中并没有太大的作用   
即使不将工作负载转移到其他产品，具有统计数据的columnar file 格式也可以实现与Hive索引类似的目标。