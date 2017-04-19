$(function () {

    var config = {
        apiKey: "AIzaSyBf7JDI9yqb9Ty85EEpCCzeF26trNOqp7g",
        authDomain: "blackie1019-github-io.firebaseapp.com",
        databaseURL: "https://blackie1019-github-io.firebaseio.com",
        projectId: "blackie1019-github-io",
        storageBucket: "blackie1019-github-io.appspot.com",
        messagingSenderId: "862135311610"
    };

    firebase.initializeApp(config);

    var database = firebase.database();
    var homeKey = "home";

    var curPath = window.location.pathname;
    var isPostPage = curPath.length > 1;
    var rootSelector = isPostPage
        ? $('#pageviews')
        : $('#item-pageviews');
    var items = $('.post-header');

    function readData(tag, selector, isUpdate) {
        var db_key = decodeURI(tag.replace(new RegExp('\\/|\\.', 'g'), "_"));
        database
            .ref(db_key)
            .once("value")
            .then(function (result) {
                var count = parseInt(result.val() || 0) + 1;

                if (isUpdate) {
                    database
                        .ref(db_key)
                        .set(count);
                }

                if (selector.length > 0) {
                    $(selector).html(count);
                };

            });
    }

    readData(homeKey, $("#visitors .count"), true);

    $(items).map(function () {
        var element = this;
        var isUpdate = isPostPage
            ? true
            : false;
        var tag = "page" + (isPostPage ? curPath : $(element).find(".post-title-link").attr('href'));

        readData( tag, $(element).find("#pageviews .count"), isUpdate);
    }, this);
});