---
layout: post
title: Running consul in a container with UI and Development Mode
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2019-03-22 00:31:22
categories:
tags:
---

記錄如何在容器內簡單啟動 Consul 的 Development Mode 與 UI 的指令

<!-- More -->

從 Consul 官方的文件中或是 [Docker Hub](https://hub.docker.com/_/consul)

會叫你用以下指令就可以開啟 Development mode

    docker run -d --name=dev-consul -e CONSUL_BIND_INTERFACE=eth0 consul

官網還寫上補上 `-ui` 就可以開啟 UI 畫面．

試了幾次不行後才眼殘發現要將預設的 0.0.0.0 綁定才能成功連到預設的 8500 port

![01.png](01.png)

docker 指令時記得補上 `0.0.0.0` :

    docker run --name dev-consul -d -p 8500:8500 consul agent -dev -ui -client=0.0.0.0 -bind=0.0.0.0

接者就可以成過連線至 [http://localhost:8500](http://localhost:8500)

![02.png](02.png)

## References ##

- [Consul GETTING STARTED - Web UI](https://learn.hashicorp.com/consul/getting-started/ui)
- [Larry Nung's Level Up : Consul - Web UI](http://larrynung.github.io/2018/12/13/Consul-Web-UI/)