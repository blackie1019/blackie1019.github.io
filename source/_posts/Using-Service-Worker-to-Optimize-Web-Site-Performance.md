---
layout: post
title: Using Service Worker to Optimize Web Site Performance
subtitle: ''
author: Blackie
header-img: ''
categories:
  - JavaScript
tags:
  - Service Worker
  - Cache
  - Web Performance
sitemap: true
date: 2017-08-01 09:47:55
---

介紹 Service Worker 並分享如何實作 Service Worker 來幫網頁建立快取加速頁面回應
<!-- More -->

![banner.jpg](banner.jpg)

Service Worker 是一個可程式化的網頁代理(programmable network proxy)，可以協助你自訂 Request 的處理流程與來源，決定是要從遠端來源或是緩存區內取用與何時取用/更新該資料。

透過 Service Worker 可以幫助我們有效的加速相同資源 **第二次** 之後的資源請求，當我們關閉browser cache也是能生效的。


因為網頁的資源可以被我們建立以下幾層緩存而加速(請求由上而下訪問):

1. Service Worker
2. Browser Cache
3. Host Server Cache(e.g. IIS, nginx)
4. Application Cache(e.g. ASP.NET application caching)
5. Shared Cache(e.g. Redis)

這邊有助於我們在架構上的規劃與效能上的大幅提升。而對於雲端部屬已經是趨勢的情況下，每個 request 都要算成本。能減少越多 request 訪問主機除了讓我們速度能提升之外，也能大幅度的降低主機服務的開銷。

在開始前有興趣先體驗一下速度差異的朋友可以至 [Trained-to-thrill](https://jakearchibald.github.io/trained-to-thrill/) 這個網站感受一下(記得先關閉browser的cache功能才能體驗到差異)。

以下內容的教學投影片請[參考](https://www.slideshare.net/chentientsai/web-optimization-with-service-woker)，完整原始碼請參考[service-worker-demo](https://github.com/blackie1019/service-worker-demo)，[範例線上成果](https://blackie1019.github.io/service-worker-demo/)。

## Service Worker Introduction ##

在開始實作前，稍微介紹一下整個技術的背景與觀念。

### What is Service Worker ###

Service Worker 本身是一個 [JavaScript Worker](https://www.html5rocks.com/en/tutorials/workers/basics/)，它本身不具備直接訪問網頁DOM的能力，但可以做為背景執行並透過pub/sub的概念進行DOM操作。

Service Worker 在實作上是借用了 HTML5 的 LocalStorage 與 IndexDB 功能來建置一個查詢索引與緩存資源，所以在網頁的相容性上也要有所資源才可以使用(目前僅Chrome有支援 Service Worker)

而Service Worker 的觸發邏輯與事件都是可以添加與客製修改的，可以控制與決定每個 Request 是要到緩存區內做置放做下次使用還是透過競爭模式決定使用遠端或是緩存區內的資源、也可以設定啟用的過濾條件。

### Prerequisite for Implementation ###

![sw_prerequisite](sw_prerequisite.png)

它的主要使用限制有3+1:

1. Service Worker 僅能針對客戶端(client)請求進行攔截與處理，無法從服務端(server)推播至客戶端。但可以建立更新機制去主動定期取得最新資源。
2. Host 該網頁應用程式的服務需支援 *SSL* 連線。
3. 作用域與註冊該檔案的位置有關，如果從根目錄註冊則所有子目錄的作用才可生效
4. 目前瀏覽器僅 *Chrome* 與 *Firefox* 支援(IE應該不打算支援)，瀏覽器相容性可以至
[http://caniuse.com/#feat=serviceworkers](http://caniuse.com/#feat=serviceworkers)與[Jake Archibald's is Serviceworker ready site](https://jakearchibald.github.io/isserviceworkerready/)查詢確認。

![browser_support_1](browser_support_1.png)

![browser_support_2](browser_support_2.png)

### How does Service Worker optimize Website performance ###

1. 建立 cache ，將特定資源儲存至緩存內，可減少 Request 請求每次都找遠端來源取得回應
2. 透過緩存區的架構，當資訊已建立在緩純區內，可以實踐部分離線網頁程式應用(如果剩餘功能不需連線也可以使用)

### Service Worker life cycle ####

這邊解說一下 Service Woker 的生命週期:

![sw_life_cycle](sw_life_cycle.png)

詳細說明，可以參考這個解說:

<iframe width='560' height='315' src='https://www.youtube.com/embed/__xAtWgfzvc?ecver=2' frameborder='0' allowfullscreen></iframe>

### How does Service Worker optimize Website performance ###

這邊我們可以思考幾個情境下能夠透過 Service Worker 來幫助我們，以下整理來至於[Jake Archibald : The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/)
- Cache only
- Network only
- Cache, falling back to network
- Cache & network race
- Network falling back to cache
- Cache then network
- Generic fallback
- ServiceWorker-side templating

### Service Worker Case Study ###

這邊簡單擷取幾個來自 Jake Archibald 的那篇文章中提及的情境與對應的架構設計
- On install - as a dependency

    ![sw_case_1](sw_case_1.png)

- On install - not as a dependency

    ![sw_case_2](sw_case_2.png)

- On activate

    ![sw_case_3](sw_case_3.png)

- On user interaction

    ![sw_case_4](sw_case_4.png)

- On network response

    ![sw_case_5](sw_case_5.png)

- Stale-while-revalidate

    ![sw_case_6](sw_case_6.png)

如果有興趣透過原生 JavaScript 與 HTML API 可以參考 *Jake Archibald* 的實作:

- [Cache on install](https://jakearchibald.com/2014/offline-cookbook/#on-install-as-a-dependency), for the static UI and behaviour
- [Cache on network response](https://jakearchibald.com/2014/offline-cookbook/#on-network-response), for the Flickr images and data
- [Fetch from cache, falling back to network](https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network), for most requests
- [Fetch from cache, then network](https://jakearchibald.com/2014/offline-cookbook/#cache-then-network), for the Flickr search results

## Implment Service Worker by sw-tool ##

再次提醒一下，目前瀏覽器僅支援 Chrome 與 Firefox，且 Host 主機需支援 *SSL* 連線才可以啟用該功能。

Github Pages 正好是 HTTPS 的，所以我們可以透過它來幫我們建立靜態頁面來測試 service worker 的好地方。

先前提到，Service Worker 的實踐其實可以透過 HTML5 就可以達成，而為了加速開發我們這邊的實作是藉由 [sw-toolbox](https://googlechrome.github.io/sw-toolbox/)來幫我們實作底層。

sw-toolbox 是由 Google 所開發的 Service Worker 工具，協助我們快速實作相關功能。

1. npm 安裝 sw-toolbox 套件

        npm install --save sw-toolbox

2. 註冊當前的 service worker 檔案(注意你希望作用的範圍與註冊有關)

    ```js
    navigator.serviceWorker.register('my-service-worker.js’);
    ```

3. 動態加入 sw-toolbox

    ```js
    importScripts('node_components/sw-toolbox/sw-toolbox.js');
    ```

### Handlers ###

- toolbox.networkFirst

    先採用網路調用遠端資源，若無回應才改用緩存區

- toolbox.cacheFirst

    先採用緩存區調用已存檔之資源，若無回應才改用網路調用遠端

- toolbox.fastest

    緩存區與網路調用遠端同時觸發，採用先提供回應者之結果。若網路調用遠端成功回應則可設定存回緩存區做更新。

- toolbox.cacheOnly

    只使用緩存區資源

- toolbox.networkOnly

    只使用網路遠端調用資源

### Method ###

- Router related
    
    ```js
    toolbox.router.<get|post|put|delete|head>(urlPattern, handler, options) //註冊特定 Method 狀態之路由設定
    toolbox.router.any(urlPattern, handler, options) //註冊全域路由設定
    toolbox.router.default //設定預設
    ```
- Cache related

    ```js
    toolbox.precache(arrayOfURLs) //執行緩存區前之資料
    toolbox.cache(url, options) //緩存區之資料
    toolbox.uncache(url, options) //釋放緩存之資料
    ```

### Live Demo ###

Github 的 Repo 有一個特殊結構，開一個 *doc* 資料夾，並在設定啟用 github page 的功能即可將此目錄的內容變成靜態頁面並提供SSL連線。

![githubpage](githubpage.png)

程式碼結構則如下:

index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
        <script src="js/moment.js"></script>
</head>

<body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
                    aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
                <a class="navbar-brand" href="#">Project name</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <!--/.nav-collapse -->
        </div>
    </nav>

    <div id="content-container" class="container">

        <div class="starter-template">
            <h1>Bootstrap starter template</h1>
            <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a mostly barebones
                HTML document.</p>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="thumbnail">
                    <a href="images/temp/julia_1.jpg">
                        <img src="images/temp/julia_1.jpg" alt="Lights" style="width:100%">
                        <div class="caption">
                        <p>Lorem ipsum...</p>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-md-4">
                <div class="thumbnail">
                    <a href="images/temp/julia_2.jpg">
                        <img src="images/temp/julia_2.jpg" alt="Nature" style="width:100%">
                        <div class="caption">
                        <p>Lorem ipsum...</p>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-md-4">
                <div class="thumbnail">
                    <a href="images/temp/julia_3.jpg">
                        <img src="images/temp/julia_3.jpg" alt="Fjords" style="width:100%">
                        <div class="caption">
                        <p>Lorem ipsum...</p>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-md-4">
                <div class="thumbnail">
                    <a href="images/temp/julia_4.jpg">
                        <img src="images/temp/julia_4.jpg" alt="Lights" style="width:100%">
                        <div class="caption">
                        <p>Lorem ipsum...</p>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-md-4">
                <div class="thumbnail">
                    <a href="images/temp/julia_5.jpg">
                        <img src="images/temp/julia_5.jpg" alt="Nature" style="width:100%">
                        <div class="caption">
                        <p>Lorem ipsum...</p>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-md-4">
                <div class="thumbnail">
                    <a href="images/temp/julia_6.jpg">
                        <img src="images/temp/julia_6.jpg" alt="Fjords" style="width:100%">
                        <div class="caption">
                        <p>Lorem ipsum...</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- /.container -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script>
        if ('serviceWorker' in navigator) {
            //navigator.serviceWorker.register('/service-worker-demo/service-worker_01.js', {scope: '/service-worker-demo/image/'})
            navigator.serviceWorker.register('/service-worker-demo/service-worker_sbk.js').then(function(reg) {
                // registration worked
                console.log('Service worker registration complete.');
                //console.log('Registration succeeded. Scope is ' + reg.scope);
            }).catch(function(error) {
                // registration failed
                console.log('Registration failed with ' + error);
            });
        }
    </script>
    <script src="js/test_1.js"></script>
    <script src="js/test_2.js"></script>
</body>

</html>
```

service-worker_sbk.js
```js
(global => {
    'use strict';

    // Load the sw-toolbox library.
    importScripts('js/sw-toolbox.js');
    // Ensure that our service worker takes control of the page as soon as possible.
    global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));

    //precache
    //toolbox.precache(['/cdn1101/images/loading-circle.svg']);
    //.toolbox.options.debug = true;
    // The route for any requests from the googleapis origin
    toolbox.router.get('/service-worker-demo/images(.*)', toolbox.cacheFirst, {
        cache: {
            name: 'images',
            maxEntries: 100,
            maxAgeSeconds: 300
        },
        origin: /blackie1019\.github\.io$/
    });

    toolbox.router.get('/service-worker-demo/css(.*)', toolbox.cacheFirst, {
        cache: {
            name: 'css',
            maxEntries: 10,
            maxAgeSeconds: 1200
        },
        origin: /blackie1019\.github\.io$/
    });

    
    toolbox.router.get('/service-worker-demo/js(.*)', toolbox.cacheFirst, {
        cache: {
            name: 'js',
            maxEntries: 10,
            maxAgeSeconds: 1200
        },
        origin: /blackie1019\.github\.io$/
    });

})(self);
```

完整原始碼請直接參考[service-worker-demo](https://github.com/blackie1019/service-worker-demo)，[範例線上成果](https://blackie1019.github.io/service-worker-demo/)。

當我們訪問該網站時，可以透過 Chrome 來看是否註冊 Serivce Worker 成功:

![demo_register_1](demo_register_1.png)

![demo_register_2](demo_register_2.png)

如果註冊成功後在 Chrome 的網路資源這邊就可以發現很多來至於 Service Worker 的回應資料:

![demo_result_1](demo_result_1.png)

## Before and After Comparison for Real Case ##

最後我們來看一下實務上改善的成果，先大致上說明改善的架構:

![result_overview](result_overview.png)

這邊是將頁面的前端資源依據使用情境與開發職責分成四類，由於跟目錄皆相同，所以透過單一個註冊點進行 Service Worker 註冊。

而以下是改善的對比:

![before](before.png)

這是一開始還沒改善前，我們可以看到第一次進入該網站或是關閉瀏覽器快取的情況下，總共有17個請求，1.4 MB 的檔案傳輸量與 3.53 秒的載入時間。整個網站則是要在 5.27秒 後才完成全部載入。

![after_1](after_1.png)

當我們加入Service Worker的第一次至該網頁瀏覽時，因為網頁還沒註冊與建立 Service Worker 緩存區，所以整體速度與先前差不多。

![after_2](after_2.png)

而當我們將部分前端資源建立Service Worker後(廠商開發的程式碼未納入Service Worker)，在當前資源已被快取的情況下，總共有18個請求，45.4 KB 的檔案傳輸量(**進步3100%**)與 784 毫秒的載入時間(**進步450%**)。整個網站則是要在 3.24秒 後就完成全部載入(**進步163%**)。

![after_3](after_3.png)

而當我們將全部前端資源建立Service Worker後(廠商開發的程式碼也納入Service Worker)，在當前資源已被快取的情況下，總共有18個請求，14.6 KB 的檔案傳輸量(**進步9820%**)與 705 毫秒的載入時間(**進步504%**)。整個網站則是要在 2.10秒 後就完成全部載入(**進步251%**)。

看到這邊已經展現了 Service Worker 的強大能力，如果你的網站也是有許多資源或是大多屬於不會變更的資料，那就趕快來幫它加速一下吧。

## References ##
- [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
- [Jake Archibald - The offline cookbook](https://jakearchibald.com/2014/offline-cookbook/)
- [Making a Simple Site Work Offline with ServiceWorker](https://css-tricks.com/serviceworker-for-offline/)