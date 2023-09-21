<p align="center">
	<img alt="logo" style="width:80px;height:80px" src="https://pictured-bed.oss-cn-beijing.aliyuncs.com/img/2022/6/202206151314105.png">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">Studio-wx V1.0.0</h1>
<p align="center">
<img src="https://img.shields.io/badge/JDK-1.8+-green.svg"/>
<img src="https://img.shields.io/badge/springboot-2.7.0.RELEASE-green"/>
<img src="https://img.shields.io/badge/vue-2.5.2-green"/>
<img src="https://img.shields.io/badge/mysql-8.0.28-green"/>
<img src="https://img.shields.io/badge/mybatis--plus-3.4.3-green"/>
<img src="https://img.shields.io/badge/redis-2.5.0-green"/>
</p>



# 前言

本次项目是学校大四上的实训项目大作业，自己命题，我就连着之前的实验室系统来实现了微信小程序版本。

前后端项目地址：[Studio-Vue（Gitee）](https://gitee.com/changluJava/studio-vue)、[Studio-Vue（Github）](https://github.com/changlua/Studio-Vue)

---

# 项目简介

> 截止目前：2023.9.20

项目名称：实验室小助手

本项目实现了前后端分离，采用token来完成用户鉴权登录，后端使用了springboot+springsecurity，登录、注册密码进行非对称加密，前端部分界面使用了vant-weapp组件。主要实现了以实验室为主题的成员及数据管理app，目前已完成用户账号的登录、注册，用户信息编辑功能的前后端实现，主要页面包含有实验室主页、团队成员动态数据展示、聊天界面、我的界面、后端管理系统预览页面、用户信息编辑页面、用户详细信息展示、消息界面。

功能详细介绍：总共8个页面，调用了8个后端接口

①实验室主页index：1个接口：获取团队汇总数据。| 优化轮播图UI，数据栏目展示。

②团队成员展示页面team：1个接口：①获取团队成员数据。|  前端页面团队成员精细展示，导航栏索引定位功能，下拉刷新数据。
③聊天界面chat：目前写死，仅仅只是两个用户聊天的静态页面。

④我的页面my：3个接口：①获取验证码接口。②登录接口。③注册接口。 | 实现登录、注册、获取用户信息功能，用户凭证使用token，登录、注册中密码进行了非对称加密。登录、注册功能快速使用精简集成。

⑤后台管理系统预览页面 manage：使用web-view组件。

⑥用户信息编辑页面edituser：3个接口：①获取用户信息接口。②获取年级、专业菜单接口。③保存用户接口。 | 使用流程顺畅，包含用户提示信息，使用了Vant Weapp中的选择器组件。

⑦用户详细信息展示membershow：用户详细信息，包含联系方式，需要登录后才能访问，目前同样写死。

⑧消息界面message：设想是多团队成员聊天，目前仅写死双方聊天静态页面。

---

# 项目介绍

## 页面展示

<table>
    <tr>
        <td><img src="https://pictured-bed.oss-cn-beijing.aliyuncs.com/img/2023/7/image-20230920112809004.png"/></td>
        <td><img src="https://pictured-bed.oss-cn-beijing.aliyuncs.com/img/2023/7/image-20230920112900836.png"/></td>
    </tr>
    <tr>
        <td><img src="https://pictured-bed.oss-cn-beijing.aliyuncs.com/img/2023/7/image-20230920113105304.png"/></td>
        <td><img src="https://pictured-bed.oss-cn-beijing.aliyuncs.com/img/2023/7/image-20230920113122945.png"/></td>
    </tr>
    <tr>
        <td><img src="https://pictured-bed.oss-cn-beijing.aliyuncs.com/img/2023/7/image-20230920113145509.png"/></td>
        <td><img src="https://pictured-bed.oss-cn-beijing.aliyuncs.com/img/2023/7/image-20230920113252245.png"/></td>
    </tr>
	<tr>
        <td><img src="https://pictured-bed.oss-cn-beijing.aliyuncs.com/img/2023/7/image-20230920113202103.png"/></td>
        <td><img src="https://pictured-bed.oss-cn-beijing.aliyuncs.com/img/2023/7/image-20230920113216836.png"/></td>
    </tr>	 
    <tr>
        <td><img src="https://pictured-bed.oss-cn-beijing.aliyuncs.com/img/2023/7/%E6%97%A0%E6%A0%87%E9%A2%98.png"/></td>
        <td><img src="https://pictured-bed.oss-cn-beijing.aliyuncs.com/img/2023/7/image-20230920113358715.png"/></td>
    </tr>
</table>

---

## 技术实现

测试工具：ApiFox，微信小程序调试工具。

前端使用技术：微信小程序、vant weapp UI组件、rsa工具库、iconfont。

后端技术：SpringBoot、Spring Security、MybatisPlus。

---

## 页面说明及功能

index：实验室主页

+ 1个接口：获取团队汇总数据。
+ 亮点：优化轮播图UI，数据栏目展示。

team：团队成员展示页面

+ 1个接口：①获取团队成员数据。
+ 亮点：前端页面团队成员精细展示，导航栏索引定位功能，下拉刷新数据。

chat：聊天界面

+ 说明：目前写死，仅仅只是静态页面。

my：我的页面

+ 基本功能：登录、注册功能，贡献日历锁实现。
+ 3个接口：①获取验证码接口。②登录接口。③注册接口。
+ 亮点：用户凭证使用token，登录、注册中密码进行了非对称加密。登录、注册功能快速使用精简集成。

manage：后台管理系统预览页面

+ 说明：学习使用web-view组件。

edituser：用户信息编辑页面

+ 3个接口：①获取用户信息接口。②获取年级、专业菜单接口。③保存用户接口。
+ 亮点：使用流程顺畅，包含用户提示信息，使用了Vant Weapp中的选择器组件。

template：模板页面（存放组件）

+ 说明：封装dialog、toast、loading的一些常用组件，方便引入调用（Vant Weapp中组件）。

membershow：用户详细信息展示

+ 说明：自己提前在墨刀绘制页面，目前写死仅实现静态页面。

message：消息界面

+ 说明：设想是多团队成员聊天，目前仅写死双方聊天静态页面。

---

# 日志

花费时间：35h不等

2023.9.20：添加了网络异常报错提示；增加了编辑用户的上传文件组件及上传图片功能。

2023.9.19：优化实现登录界面功能使用；实现注册页面；完成纯静态页面（成员信息展示页面、消息页面、聊天页面）；完成实验室首页的海报页面优化。

2023.9.16：实现登录界面、个人信息编辑界面UI以及前后端功能链条。

2023.9.13：优化我的页面。

2023.9.12：完成四个tab界面，首页进入栏目；实验室管理界面轮播图、数据；团队成员界面；我的界面；工作室管理系统界面。

# 交流学习

作者QQ：939974883

QQ群：571215225

---

整理者：长路  时间：2023.9.20