---
title: Javascript埋点技术
layout: post
categories: javascript
tags: Javascript
---
##### Javascript前端埋点技术，后端日志收集，统计用户行为
# 目标 
##### 统计用户行为,进行入库出库分析，推荐产品，具体架构看文档
# 参考博客 
已经讲的非常清楚，按步骤实验就行 [http://blog.codinglabs.org/articles/how-web-analytics-da
ta-collection-system-work.html]()

github数据收集代码参考[https://github.com/534591395/collection]()  

accesslog的分析，得到用户的行为数据[https://www.jianshu.com/p/5a28e746be4e]() 
<!--more-->
# 项目阶段展示
###### 首先看我女朋友在学校做的前端界面，随便点击
![TIM截图20180301093019](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180301093019.png)
### 查看后台日志

![TIM截图20180301093507](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180301093507.png) 
### 整理后直观的日志
![TIM截图20180301093633](http://p1vuoao0b.bkt.clouddn.com/JekyllWriter/TIM截图20180301093633.png)

商城代码（动态的）：https://pan.baidu.com/s/1pMXX7PD 密码：88nu

#### 相关概念 
##### pv值
PV（page view）即页面浏览量或点击量，是衡量一个网站或网页用户访问量。具体的说，PV值就是所有访问者在24小时（0点到24点）内看了某个网站多少个页面或某个网页多少次。PV是指页面刷新的次数，每一次页面刷新，就算做一次PV流量
##### IP即独立IP数
IP可以理解为独立IP的访问用户，指1天内使用不同IP地址的用户访问网站的数量，同一IP无论访问了几个页面，独立IP数均为1。但是假如说两台机器访问而使用的是同一个IP，那么只能算是一个IP的访问
##### UV值
UV（unique visitor）即独立访客数，指访问某个站点或点击某个网页的不同IP地址的人数。在同一天内，UV只记录第一次进入网站的具有独立IP的访问者，在同一天内再次访问该网站则不计数。UV提供了一定时间内不同观众数量的统计指标，而没有反应出网站的全面活动。通过IP和cookie是判断UV值的两种方式:  
用Cookie分析UV值，当客户端第一次访问某个网站服务器的时候，网站服务器会给这个客户端的电脑发出一个Cookie，通常放在这个客户端电脑的C盘当中。在这个Cookie中会分配一个独一无二的编号，这其中会记录一些访问服务器的信息，如访问时间，访问了哪些页面等等。当你下次再访问这个服务器的时候，服务器就可以直接从你的电脑中找到上一次放进去的Cookie文件，并且对其进行一些更新，但那个独一无二的编号是不会变的。
##### UV（Unique visitor） 
是指通过互联网访问、浏览这个网页的自然人。访问您网站的一台电脑客户端为一个访客。00:00-24:00内相同的客户端只被计算一次。一天内同个访客多次访问仅计算一个UV。
##### PV与VV区别：  
如：你今天10点钟打开了百度，访问了它的三个页面；11点钟又打开了百度，访问了它的两个页面，则PV数+5，VV数+2.  
PV是指页面的浏览次数，VV是指你访问网站的次数。