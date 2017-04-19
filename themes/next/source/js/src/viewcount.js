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
    var oriUrl = window.location.host; 
    var curUrl = oriUrl + window.location.pathname;
    
    function readData(url, selector) {
        var db_key = decodeURI(url.replace(new RegExp('\\/|\\.', 'g'), "_"));
        database
            .ref(db_key)
            .once("value")
            .then(function (result) {
                var count = parseInt(result.val() || 0) + 1;
                database
                    .ref(db_key)
                    .set(count);

                if (selector.length > 0) {
                    $(selector).html(count);
                };
            });
    }
    
    readData(oriUrl, $("#visitors .count"));

    if (curUrl != "_") {
        readData("page/" + curUrl, $("#pageviews .count"));
    }

});