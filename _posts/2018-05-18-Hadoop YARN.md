---
title: Hadoop YARN
layout: post
tags: Hadoop
---
# YARN Resource Management
##### YARN (unofficially “Yet Another Resource Negotiator”) 
#### 如果您认为 HDFS 作为 Hadoop 的群集文件系统, YARN将成为群集操作系统。它是 Hadoop 的建筑中心。 ####
![](https://i.imgur.com/hbJSVBU.png)
<!--more-->
##### YARN的目的：
计算机操作系统 (如 Windows 或 Linux) 管理对已安装应用程序的资源 (如 CPU、内存和磁盘) 的访问。以类似的方式, YARN提供了一个托管框架, 允许多种类型的应用程序 (批处理、交互式、在线、流式等) 在整个群集上执行数据。就像计算机操作系统同时管理资源分配 (哪个应用程序现在可以访问 CPU、内存和磁盘, 如果争用是否存在, 还要等待哪一个) 和安全性 (当前用户是否有权执行请求的操作？, YARN管理各种类型的数据处理工作负载的资源分配, 优先级和调度作业。
# YARN Architecture and Operation
##### YARN架构由两个核心部件组成
1. ResourceManager 组件在主节点上运行, 并在全球范围内集中管理所有YARN应用的资源
2.  NodeManager 组件在群集中的每个工作节点上运行, 并按全局 ResourceManager 元件的指示执行其本地资源上的所有任务。
![](https://i.imgur.com/CKQCuJR.png)
## YARN NodeManager
YARN NodeManager 是在群集中的每个工作节点上运行的守护进程/服务。它代表请求服务 (如 ResourceManager 和 ApplicationMasters) 管理本地资源。此外, 它还跟踪节点的运行状况, 并与 ResourceManager 进行通信。
![](https://i.imgur.com/ucBO4FZ.png)
### Containers
![](https://i.imgur.com/hKwtPew.png)
当 ResourceManager 发出 ApplicationMaster 请求 (启动应用程序的请求和运行它所需的作业) 时, NodeManager 将首先创建一个容器并为其分配 CPU 和内存资源。
![](https://i.imgur.com/N1gxjNY.png)
每次 ResourceManager 发出新的 ApplicationMaster 请求时, 都会启动一个容器。
### Application Master.
![](https://i.imgur.com/gaTxYDc.png)
一旦 NodeManager 产生一个容器, ApplicationMaster 可以使用它所控制的资源来启动。

![](https://i.imgur.com/ucBIBBx.png)
通常由群集级资源管理器执行的许多任务实际上是通过 ApplicationMaster 的实现向下推送到应用程序层的。全局 ResourceManager 组件负责监视、跟踪和批准资源分配请求, 但一旦授予这些请求, ApplicationMaster 就会在与NodeManagers, 跟踪应用程序的特定资源使用情况, 根据需要分配和分配容器/资源, 以及应用程序的常规进度监视
ApplicationMaster 负责大量的监视和管理, 但它不是特权服务。所有资源/容器请求必须由 ResourceManager 和 NodeManager 组件授予和执行。
### Job Scheduling
![](https://i.imgur.com/qk5sqZH.png)
ApplicationMaster 首先通过与 ResourceManager 的调查发现集群能力。然后, 它将对资源发出请求, 并在响应中接收授权令牌, 授予它任何所需或允许的资源。
![](https://i.imgur.com/nm4j54L.png)
然后, ApplicationMaster 负责与 NodeManagers 通信,将这些资源分配到容器中	。
![](https://i.imgur.com/gp4EGua.png)
一旦创建, 它将配置这些容器来执行其所需的任务。
![](https://i.imgur.com/yx1uQcD.png)
重复此过程, 直到 ApplicationMaster 已耗尽其分配的容器资源, 或直到分配了所有必需的作业任务为止
![](https://i.imgur.com/JpGWviC.png)
### Example
下图说明了容器、ApplicationMasters 和作业任务在三节点群集上的分布方式。
![](https://i.imgur.com/fGMxkxS.png)
在本例中, Job1 ApplicationMaster 开始于 NodeManager 2。Job1 的第一个任务开始于 NodeManager 1, 第二个 Job1 任务在 NodeManager 2 开始。完成了 Job1 所需的所有任务。
Job2 ApplicationMaster 是在 NodeManager 3 发射的。前两个 Job2 任务是在 NodeManager 1 启动的, Job2 任务3到6在 NodeManager 3 启动, 最后 Job2 任务在 NodeManager 1 启动。
这主要是为了说明 ApplicationMaster 可以在集群中的任何适当的 NodeManager 上启动容器的创建。默认行为是将所有作业放在已存在数据块的位置, 即使在没有这些数据块的节点上有更多的处理能力, 只要可能。
# YARN ResourceManager
![](https://i.imgur.com/EJ5hN3H.png)
ResourceManager 组件有许多组件组成，下面是些主要的
•	Scheduling
•	Node Management
•	Security
## Scheduling
YARN调度程序是一个单一的组件, 它根据 Hadoop 管理员设置的参数来控制资源的使用。这通过允许不同的组织使用集中汇集的群集资源 (多) 来提供效率, 同时控制每个租户对这些资源的访问。这样可以确保每个组织都能得到满足其服务级别协议所需的最低要求资源。同时, 这也使组织能够访问其他人不使用的过剩容量, 从而提供弹性和较低的总体部署成本。使用的调度机制和特定设置由 Hadoop 管理员控制。
### Node Management
ResourceManager 中的node和 ApplicationMaster 管理是通过许多执行各种任务的服务完成的:
1. 监视 NodeManagers 的心跳 (默认情况下每秒 NodeManager 发送一次)
2. 向适当的 NodeManagers 提交 ApplicationMaster 的启动请求
3. 验证资源容器组件是否在适当的 NodeManagers 上实际启动 , 并在需要时尝试重新启动
4. 监视 ApplicationMasters 在容器中运行的心跳 (每10分钟一次), 并在需要时尝试重新启动
5. 维护已提交的 ApplicationMasters,跨群集及其当前状态的列表
### Security
ResourceManager 充当 Web 应用程序代理, 并通过 acl (访问控制列表) 控制对资源的访问。它通过基于系统管理资源/应用程序安全性, 以验证所有容器请求是否有效。ApplicationMaster 必须将经过验证的 containerToken 传递给 NodeManager, 其中包含有关应分配给该容器的资源的信息。此检查机制禁止流氓 ApplicationMaster 分配比 ResourceManager 分配的更多的资源
# YARN Component Summary		
![](https://i.imgur.com/d0GNZiu.png)
# YARN Management Options
There are four basic options an HDP administrator has for managing YARN are:
•	Ambari
•	The ResourceManager UI
•	Command line management and manual editing / transferring of configuration files
•	The YARN API
# ResourceManager UI
##### 打开方式
1.如下图
2.输入http://192.168.15.140:8088/cluster/apps/KILLED
![](https://i.imgur.com/uegUAdW.png)
#### 在资源管理UI中，我们能看见YARN的相关信息
# 使用命令行查看
基本语法为`YARN+命令行`

###### 查看yarn的版本

	yarn version
###### 查看yarn的路径

	yarn classpath
###### 查看应用列表

	yarn application -list
######查看yarn节点列表

	yarn node -list

##### 具体请查看文档

# REST API
## Resource Manager
	curl -X GET http:// 192.168.15.140:8088/ws/v1/cluster/info 
	curl -X GET http:// 192.168.15.140:8088/ws/v1/cluster/metrics
	curl -X GET http:// 192.168.15.140:8088/ws/v1/cluster/scheduler 
	curl -X GET http:// 192.168.15.140:8088/ws/v1/cluster/apps
	curl -X GET http:// 192.168.15.140:8088/ws/v1/cluster/nodes
## Node Manager
	
	curl -X GET http://192.168.15.140:8042/ws/v1/node/info 
	curl -X GET http://192.168.15.140:8042/ws/v1/node/apps
	curl -X GET http://192.168.15.140:8042/ws/v1/node/containers

### 有关可用 api 的完整列表，请查看相关文档
http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/WebServicesIntro.html 
http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/ResourceManagerRest.html http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/NodeManagerRest.html
# YARN Component Failure Management
#### 在平台上运行的应用程序还可能会发生其他故障。在所有情况下, 设计系统时的主要目标应该是尽量减少应用程序或平台停机时间, 而不是组件故障。假设任何组件在任何时候都可能失败, 并设计系统, 以便在发生这种情况时, 恢复是自动的和即时的, 或者最简单和快速的。####
## Monitoring
#### 组件失败可能发生在其中的任何一个环节
![](https://i.imgur.com/x8FbhQR.png)