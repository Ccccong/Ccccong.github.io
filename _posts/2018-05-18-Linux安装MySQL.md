---
title: Linux安装MySQL
layout: post
tags: Linux
categories: Mysql
---
## CentOS 7.2 安装 MySQL 5.7.13

## 1. 下载mysql的repo源
CentOS 7.2的yum源中默认没有mysql,要先下载mysql的repo源
      `wget http://repo.mysql.com/mysql57-community-release-el7-8.noarch.rpm`
## 2. 安装mysql57-community-release-el7-8.noarch.rpm包
`rpm -ivh mysql57-community-release-el7-8.noarch.rpm` 
安装这个包后，会获得两个mysql的yum repo源：/etc/yum.repos.d/mysql-community.repo，/etc/yum.repos.d/mysql-community-source.repo
<!--more-->
## 3.安装mysql
`yum install mysql-server`
## 4. 启动mysql服务
查看MySQL服务是否已启动
   ` service mysqld status`
启动服务
    `systemctl start mysqld`

## 5. 重置root密码
MySQL5.7会在安装后为root用户生成一个随机密码，而不是像以往版本的空密码。 
可以安全模式修改root登录密码或者用随机密码登录修改密码。下面用随机密码方式
MySQL为root用户生成的随机密码通过mysqld.log文件可以查找到：

    grep 'temporary password' /var/log/mysqld.log

修改root用户密码：(MySQL的密码策略比较复杂，过于简单的密码会被拒绝)

    mysql -u root -p
    mysql> Enter password: （输入刚才查询到的随机密码）
    mysql> SET PASSWORD FOR 'root'@'localhost'= "Root-123";
    mysql> exit
用root新密码登录： 

		mysql -u root -pRoot-123

如果上面的方式不能修改可以使用下面安全模式修改root：
关闭服务
	systemctl stop mysqld.service
	vi /etc/my.cnf 
mysqld下面添加skip-grant-tables 保存退出启动服务
	systemctl start mysqld.service
	mysql -u root 不用密码直接回车
	use mysql
	update user set authentication_string=password('Root-123') where User='root' and Host='localhost';
	flush privileges;
	exit;
	vi /etc/my.cnf 把 skip-grant-tables 一句删除保存退出重启mysql服务 
	systemctl restart mysqld.service
再次登录即可

    mysql -u root -pRoot-123

如果进行操作出现下面的提示:

	You must reset your password using ALTER USER statement before executing this statement.
就再设置一遍密码  

	set password = password('Root-123');

## 6. 开放3306端口
允许使用用户名root密码Root-123456从任何主机连接到mysql服务器

	mysql>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'Root-123456' WITH GRANT OPTION;
	mysql>FLUSH PRIVILEGES;
	mysql>exit;
开启防火墙mysql 3306端口的外部访问
	firewall-cmd --zone=public --add-port=3306/tcp --permanent
	firewall-cmd --reload
	
	
**注意：**如果只想设置简单密码需要修改两个全局参数：
mysql> set global validate_password_policy=0;
mysql> set global validate_password_length=1;