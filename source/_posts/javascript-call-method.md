---
layout: post
title: Javascript call method(呼叫函式)
subtitle: ""
date: 2014-01-14 00:29:45
author: Blackie
header-img: ""
categories:
- JavaScript
tags:
- Basic JS
---

因為javascript是一個有無限可能的程式(我指的是寫法XD)，所以這篇是幫js新手了解javascript如何呼叫/寫出函式

<!-- More -->

如果你要呼叫一個函式你可以透過以下四個方法:

- function:

		var test=function(){
			return 'test';
		};
		console.log(test());

- method:

		var object={
			test:function(){
				return 'test';
			}
		}
		console.log(object.test());

- Constructor:

		var People=function(){
			this.name='blackie',
			this.gender='male'
		}

		var man=new People();
		console.log(man);

- apply() and call()

		var object={
			test:function(){
				console.log(this.name,arguments[0],arguments[1]);
			}
		}

        var man={name:'blackie'};
        var woman={name:'karma'};

        //Apply()
        console.log("This Apply");
        object.test.apply(man,['male','28']);

        //Call()
        console.log("This Call");
        object.test.call(woman,'female','27');

針對apply() and call()其實只有帶入的參數使用的方法不同而已，

-	apply()

	####lets you invoke the function with arguments as an array.

-	call()

	####requires the parameters be listed explicitly.

從剛剛上面的範例我們看到結果是如下，可以看到其實他們是類似的東西:

![applyandcall](applyandcall.PNG)

除了以上幾個四個用法外，常見的還有anonymous function(匿名函式)的呼叫，使用如下:

		var tryTest=function(f)
		{
			f();
		}

		tryTest(
			function(){
				console.log("this is a test");
			}
		);

當然依此我們也可以讓函式自己呼叫自己，而透過此自我呼叫的模式即可完成遞迴的功能，使用如下:

		var printRemain=function(number)
		{
			console.log(number--);
			if(number>0)
			{
				printRemain(number);
			}
		}

		printRemain(10);

結果如下:

![remains](remains.PNG)

看到這邊你應該對javascript的函式使用不在陌生了，而透過apply,call與自我呼叫的方式你可以寫出更多可被重複使用的method或是將你的功能切成更多細項來互相交錯使用‧
