#[CSS]Sass and Compass - 01:Sass Concept


![logo](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20150104/logo.png)

	Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.

##What is Sass

Sass的全名Syntactically Awesome Style Sheets，由此可知他主要是提供一個語意式的CSS樣式，補強原本在CSS使用上令人感到詬病的一些過程。

在現今開發上都強調DRY的方式上CSS最讓人詬病的一點就是不斷的重複一樣的東西，簡單的舉例如下：

但長久寫下來，我們都會面臨幾個問題：

1. 一直打重複的類型或是宣告造成CSS內容很臭長, 很多時候找不到自己寫的class只好再另外寫一個
2. 許多特定瀏覽器的寫法必須重複撰寫,常常會因為忘記撰寫而造成bug
3. 不易做修改/維護，甚至更換架構到其他網頁框架上
4. 很難做效能調整與強化，因為早就忘記當初為什麼要這樣寫
5. 一天複製貼上同樣的樣式變成常態,造成鍵盤容易壞掉(誤)

沒錯，就是這樣糟糕的寫法或作法延伸的造成了上面幾個問題（沒結構化不方便重用與調整，內容過於龐大...等），當然還有更多更多沒說出來但是大家感到無奈的地方。

當然以上最可怕的莫過於要更換框架了，因為這代表以前改的一些客製化的內容都要從做了呀。

![]()

此時Sass的出現主要就是要改變兩個CSS的兩個特性：

1. 給予CSS變數宣告與運算(Variables,Operators等)的能力
2. 給予CSS結構化(Nesting,Partials,Import,Mixins,Extend/Inheritance...等)的能力

而最大的好處是，現在普遍框架都支援Sass，所以你學會後就不會再害怕換框架這件事情了。

![]()

透過這兩個改變你準備好跟上面的惡夢說掰掰了嗎？在開始學習之前先幫大家整理你學會Sass的好處：

1. 跟可怕的非結構CSS說掰掰
2. 跟容易調整與維護CSS
3. 方便跟現在主流的框架作結合，加速你的開發還能早點下班
4. 利於效能調整或是整理你的CSS
5. 減少每天複製貼上的步驟，讓你鍵盤的壽命變長(誤)

聽起來就像九陽神功一樣，既然如此我們就趕快來上手瞭解一下吧！

##How to using it

使用Sass的方式很簡單，這邊簡單舉幾個例子：


##Sass hands on Lab

###Sass work flow

開始使用前我們先解釋一下Sass的流程

![01](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20150104/01.png)

其實Sass就是一個 CSS preprocessors，而我們所寫的Sass檔案會有兩種可能的檔名(.scss與.sass)，不管哪一種都要先透過SASS的Compiler幫我們轉換成一般的CSS，而轉換出來的CSS就像我們一般在使用CSS與HTML結合的方式一模一樣的呈現在網頁上，聽起來就是這麼簡單。

###Set up your Sass enviroment

接著我們開始建置我們所需要的Sass compiler環境，這邊使用Node.js與Grunt來做我們建構主要技術。

###First Sass

最後我們就來實際寫一小段Sass來玩玩吧

##總結

Sass對我來說最大的方便就是讓自己擁有一個『CSS的internal library』，
讓你只需寫一次後就可以到處沿用（包括特定瀏覽器的hack方法或是一般的觀念問題）之後遇到類似問題只要引用已經寫過的code就可以解決問題。
這讓維護與強化CSS從惡夢變成可能，鍵盤也不會再如此頻繁需要更換了(大誤)！

與Sass雷同的preprocessors技術：

- [LESS](http://lesscss.org/)
- [Turbine](http://turbinecss.org/)
- [Switch CSS](http://sourceforge.net/projects/switchcss/)
- [CSS Cacheer](http://retired.haveamint.com/archive/2008/05/30/check_out_css_cacheer)
- [CSS Preprocessor](http://pornel.net/css)
- [DT CSS](http://code.google.com/p/dtcss/)
- [Stylus](http://learnboost.github.com/stylus/)
- [Compass (built on top of CSS SASS)](http://compass-style.org/)

##Ref

- [Sass & Susy教學手冊](http://sam0512.blogspot.tw/2013/10/sass.html)
