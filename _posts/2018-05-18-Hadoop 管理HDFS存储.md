---
title: Hadoop 管理HDFS存储
layout: post
tags: Hadoop
---
# 管理HDFS存储
## HDFS Architecture
![](https://i.imgur.com/7irFwLE.png)
# HDFS写入文件的过程
![](https://i.imgur.com/pIvskFP.png)
![](https://i.imgur.com/v5DHTyo.png)
# DateNode磁盘
![](https://i.imgur.com/Zgbkr1K.png)
HDFS 数据块在 DataNode 的本地文件系统中显示为文件
#NameNode启动
![](https://i.imgur.com/8zyXUfW.png)
1. 当 NameNode 启动时, 它进入安全模式, 这是一个只读模式。
2.  NameNode 加载最新的 fsimage, 并将文件编辑到内存中
3.  NameNode 执行一个检查点, 将 fsimage 和编辑文件中的信息合并在一起。这将创建文件系统的最新内存映像。
4.  它将最新的 fsimage 文件写入磁盘, 并创建一个新的空编辑文件来跟踪文件系统更改
5.  DataNodes 将他们的阻止名单发送到 NameNode。NameNode 聚合此信息以重建内存中的块映射。块映射用于定位和读取文件数据。安全模式的目的是提供 NameNode 重建块映射所需的时间。
6.  NameNode 退出安全模式, 它开始正常的读写操作。只有在最小复制所有数据块中的99.9% 时, NameNode 才能退出安全模式。最小复制意味着至少有一个副本可用。此百分比由 dfs.namennode.safemode.threshold-pct属性确定在hdfs-site.xml中
# HDFS读数据
![](https://i.imgur.com/FHxUu51.png)
# Data Node可用性
![](https://i.imgur.com/FWznil3.png)

NameNode 监听 DataNode 心跳以确定 DataNode 的可用性。
# 数据腐败策略
![](https://i.imgur.com/gLKPT4y.png)
#### 两种策略
1. 当HDFS读取数据的时候检查数据块
2. 定期检查数据块（ dfs.datanode.scan.period.hours参数设置扫描周期）
3. 当所有的数据块损坏时需要手动修复
# 使用UI管理HDFS
![](https://i.imgur.com/l7wtXp2.jpg)
# Ambari HDFS Service Managemet
![](https://i.imgur.com/ZtsTqBv.png)
# Ambari HDFS Configuration Management
### 所有的配置都能在此UI中完成
![](https://i.imgur.com/64WLte7.png)
# Ambari HDFS Monitoring
![](https://i.imgur.com/KMjWAxA.png)
# The NameNode UI
两种方法访问，一个是通过UI（我的通过域名可以访问，但是输入IP不能访问），一个是通过输入IP地址和端口号

![](https://i.imgur.com/jMhIdUK.png)
# DataNode UI
#### 输入http://192.168.15.140:50075/blockScannerReport访问
![](https://i.imgur.com/f53oLz9.png)
# Managing HDFS Manually and Using Command-Line Tools
![](https://i.imgur.com/T1k1yiw.png)
# Determining Consumed Storage Space
![](https://i.imgur.com/7otvo9D.png)
# HDFS fsck检查文件的一致性
![](https://i.imgur.com/FzpJlGr.png)

## -files Option

	hdfs fsck  / -files
报告文件的大小和数据块的数量，状态。
目录只存在于 NameNode 内存中, 因此没有大小或不占用任何数据块。因为没有检查数据块, 所以没有用于报告目录的 fsck 状态。
![](https://i.imgur.com/agYy1Pi.png)
## -blocks Option
块 ID 号, 块大小和副本数

	hdfs fsck  /user -blocks

## -locations Option
## -racks Option
# Problem Report Example
![](https://i.imgur.com/pl6Wk3i.png)
### 报错的原因是单个集群却配置了3个备份节点
# dfsadmin
 ### basic syntax：`hdfs dfsadmin [options]`

## dfsadmin Examples
namenode进入安全模式（HDFS只读）

	hdfs dfsadmin –safemode enter
namenode退出安全模式
	
	hdfs dfsadmin –safemode leave
强制执行checkpoint操作，并创造一个新的fsimage和edits文件
	
	hdfs dfsadmin –saveNamespace
创造一个新的edits文件

	hdfs dfsadmin –rollEdits
下载最新的 fsimage 文件 (用于远程备份)

	hdfs dfsadmin –fetchImage
生成运行状况、状态和使用情况报告
	
	hdfs dfsadmin -report

![](https://i.imgur.com/JCpO0Se.png)


----------

#HDFS Quotas
命名配额是一个在这个文件夹下文件和文件夹的数目。
空间配额是设置一个文件夹的大小。
![](https://i.imgur.com/9PjxLze.png)

#Limiting Specific Users and Applications
即使配额是按目录配置的, 仍然可以将配额应用于特定的用户和应用程序
![](https://i.imgur.com/iwwRsHl.png)

#Configuring Quotas

######•	Setting a name quota on one or more directories:
	hdfs dfsadmin –setQuota <n> <directory> [<directory>] …
Issue the command again to modify a name quota.
####•	Removing a name quota on one or more directories:
	hdfs dfsadmin –clrQuota <directory> [<directory>] …
####•	Setting a space name quota on one or more directories:
	hdfs dfsadmin –setSpaceQuota <n> <directory> [<directory>] …
Issue the command again to modify a space quota.
####•	Removing a space quota on one or more directories:
	hdfs dfsadmin –clrSpaceQuota <directory> [<directory>] …
#### 即使目录将立即违反新配额, 尝试设置名称或空间配额仍将成功 ####

#Viewing Quota Information
	hdfs dfs –count –v –q <directory_name>	
![](https://i.imgur.com/1wlcAVb.png)