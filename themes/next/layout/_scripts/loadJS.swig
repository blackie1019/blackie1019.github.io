<script>

function downloadJSAtOnload() {
var element = document.createElement("script");
element.src = "{{ url_for('bundle') }}/all.min.js?v={{ theme.version }}";
document.body.appendChild(element);
}
if (window.addEventListener)
window.addEventListener("load", downloadJSAtOnload, false);
else if (window.attachEvent)
window.attachEvent("onload", downloadJSAtOnload);
else window.onload = downloadJSAtOnload;

</script>