{# Reset `window.Promise` when it was not a function. #}
{# IE refers the element whose id is `Promise` as `window.Promise`, this causes Velocity throwing an exception #}
<script type="text/javascript">
  if (Object.prototype.toString.call(window.Promise) !== '[object Function]') {
    window.Promise = null;
  }
</script>

{% set js_vendors = {} %}
{% set js_vendors.jquery      = 'jquery/index.js?v=2.1.3' %}
{% set js_vendors.fastclick   = 'fastclick/lib/fastclick.min.js?v=1.0.6' %}
{% set js_vendors.lazyload    = 'jquery_lazyload/jquery.lazyload.js?v=1.9.7' %}
{% set js_vendors.velocity    = 'velocity/velocity.min.js?v=1.2.1' %}
{% set js_vendors.velocity_ui = 'velocity/velocity.ui.min.js?v=1.2.1' %}

{% if theme.fancybox %}
  {% set js_vendors.fancybox  = 'fancybox/source/jquery.fancybox.pack.js?v=2.1.5' %}
{% endif %}

{% if theme.firebase %}
  {% set js_vendors.firebase  = 'firebase/firebase.js' %}
{% endif %}

{% for name, internal in js_vendors %}
  {% set internal_script = url_for(theme.vendors._internal) + '/' + internal %}
  <script type="text/javascript" src="{{ theme.vendors[name] | default(internal_script) }}"></script>
{% endfor %}

<script>
  var config = {
    apiKey: "AIzaSyBf7JDI9yqb9Ty85EEpCCzeF26trNOqp7g",
    authDomain: "blackie1019-github-io.firebaseapp.com",
    databaseURL: "https://blackie1019-github-io.firebaseio.com",
    projectId: "blackie1019-github-io",
    storageBucket: "blackie1019-github-io.appspot.com",
    messagingSenderId: "862135311610"
  };
  firebase.initializeApp(config);

  var curUrl = decodeURI(window.location.pathname.replace(/\/|\./g,"_"));

  firebase.child("sum").on("value",function(data){
      var curCnt = data.val();
      if(curCnt > 1){
          if($("#totalCnt").length){
              $("#totalCnt").remove();
          }

          $("span.author").append(" | <span id='totalCnt'>Total：" + curCnt + "Views");
      }
  });

  firebase.child("page/" + curUrl).on("value",function(data){
      var pageCnt = data.val();
      if(pageCnt > 1){
          $("#detail_cnt").text(pageCnt);
      }
  });

  firebase.child("sum").transaction(function(curCnt){
      return (curCnt || 0) + 1;
  });

  firebase.child("page/" + curUrl).transaction(function(curCnt){
      return (curCnt || 0) + 1;
  });
</script>

