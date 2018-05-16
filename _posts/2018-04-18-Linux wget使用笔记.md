---
title: Linux wget使用笔记
layout: post
categories: Linux
tags: wget
---
# wget 使用方法

需要下载某个目录下面的所有文件。
命令如下

>wget -c -r -np -k -L -p http://docs.openstack.org/liberty/install-guide-rdo/

在下载时。有用到外部域名的图片或连接。如果需要同时下载就要用-H参数。

>wget -np -nH -r –span-hosts www.xianren.org/pub/path/ 

 
	
**-c** 断点续传  
**-r** 递归下载，下载指定网页某一目录下（包括子目录）的所有文件 
**-nd** 递归下载时不创建一层一层的目录，把所有的文件下载到当前目录 
**-np** 递归下载时不搜索上层目录，如**wget -c -r www.xianren.org/pub/path/** 
没有加参数-np，就会同时下载path的上一级目录pub下的其它文件 
**-k** 将绝对链接转为相对链接，下载整个站点后脱机浏览网页，最好加上这个参数  
**-L** 递归时不进入其它主机，如**wget -c -r www.xianren.org/**  
如果网站内有一个这样的链接：  
**www.xianren.org**，不加参数-L，就会像大火烧山一样，会递归下载**www.xianren.org**网站  
**-p** 下载网页所需的所有文件，如图片等  
**-A** 指定要下载的文件样式列表，多个样式用逗号分隔  
**-i**后面跟一个文件，文件内指明要下载的URL