---
layout: post
title: GitLab Build up
subtitle: ""
author: Blackie
header-img: ""
sitemap: true
date: 2015-11-06 00:29:45
categories:
- CI&CD
tags:
- Git
- GitLab
- Source Control
---

This is a step by step tourist for how to build up a GitLab from Bitnami VM

<!-- More -->

## GitLab from Bitnami

[Download](https://bitnami.com/stack/gitlab/virtual-machine)

[Wiki - BitNami GitLab](https://wiki.bitnami.com/Applications/BitNami_GitLab?highlight=gitlab)

## General Setup

1. Update your apache for GitLab host to example.com

		$ sudo /opt/bitnami/apps/gitlab/bnconfig --machine_hostname example.com

2. Add example.com to host

		127.0.0.1    example.com

3. Update GitLab setting to correct host display

		$ sudo vi /opt/bitnami/apps/gitlab/htdocs/config/gitlab.yml
		host: example.com

4. restart(need do this action once configuration change)

		$ sudo /opt/bitnami/ctlscript.sh restart

## SSH Setup

1. Server open SSH setting

		$ sudo mv /etc/init/ssh.conf.back /etc/init/ssh.conf
		$ sudo start ssh

2. VM open port forwarding

	Setting>Network>Port Forwarding

	![port](Port%20Forwarding.png)

3. Client generate Key-pairs

	- Linux & Mac

			$ sudo ssh-keygen
	- Windows

		[PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)

4. Bidning Public key to GitLab account

	SSH Keys>Add

	![SSH public](ssh%20public.png)

5. Open SourceTree and clone with SSH protocal

	![Clone wih SSH](Clone%20with%20ssh.png)

	*Windows need add private key to computer first, can use [Pageant](http://the.earth.li/~sgtatham/putty/latest/x86/pageant.exe)*

## Get file from Host to Client VM using SSH protocal

- Mac & Windows
	[FileZilla - Client](https://www.google.com.tw/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CBsQFjAAahUKEwiN5OSiz_nIAhUGXqYKHZMABNQ&url=https%3A%2F%2Ffilezilla-project.org%2Fdownload.php&usg=AFQjCNEVBwvn5iTFmb5JyjzLrD0yKQsMGg&sig2=dep538VPLoemq1TctetF6g)
- Windows
	[WinSCP](https://www.google.com.tw/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CBsQFjAAahUKEwjv1vHDz_nIAhXlJKYKHRzKCFs&url=https%3A%2F%2Fwinscp.net%2Feng%2Fdownload.php&usg=AFQjCNFGy0DbS4A__xFv8ToHgJYyYD3BOw&sig2=HHP95wNoiU9FmIfyCVCzww)
