var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var del = require('del');

var public_dir = __dirname + '/public';
var bundle_dir = public_dir + '/bundle';
var bundle_js = bundle_dir + '/js'
var bundle_css = bundle_dir + '/css';
var bundle_fonts = public_dir + '/fonts';

gulp.task('clean', function() {
    return del([bundle_dir + '/*']);
});

gulp.task('copy-htaccess', function() {
    return gulp.src('source/.htaccess')
        .pipe(gulp.dest(public_dir));
})

gulp.task('copy-js', function() {
    return gulp.src([
             public_dir + '/vendors/jquery/index.js',
             public_dir + '/vendors/fastclick/lib/fastclick.min.js',
             public_dir + '/vendors/jquery_lazyload/jquery.lazyload.js',
             public_dir + '/vendors/velocity/velocity.min.js',
             public_dir + '/vendors/velocity/velocity.ui.min.js',
             public_dir + '/vendors/fancybox/source/jquery.fancybox.pack.js',
             public_dir + '/vendors/google-code-prettify/prettify.js',
             public_dir + '/vendors/firebase/firebase.js',
             public_dir + '/js/src/viewcount.js',
             public_dir + '/js/src/utils.js',
             public_dir + '/js/src/motion.js',
             public_dir + '/js/src/bootstrap.js',
             public_dir + '/js/src/scrollspy.js',
             public_dir + '/js/src/post-details.js',
             public_dir + '/js/src/swig/localsearch.js',
             public_dir + '/js/src/swig/achive-year.js',
             public_dir + '/js/src/pretty-print.js'
        ])
        .pipe(gulp.dest(bundle_js));
})

gulp.task('minify-js', function() {
    return gulp.src(bundle_js)
        .pipe(uglify())
        .pipe(gulp.dest(bundle_js));
})

gulp.task('concat-js', function() {
    return gulp.src([
             bundle_js + '/index.js',
             bundle_js + '/fastclick.min.js',
             bundle_js + '/jquery.lazyload.js',
             bundle_js + '/velocity.min.js',
             bundle_js + '/velocity.ui.min.js',
             bundle_js + '/jquery.fancybox.pack.js',
             bundle_js + '/firebase.js',
             bundle_js + '/prettify.js',
             bundle_js + '/viewcount.js',
             bundle_js + '/utils.js',
             bundle_js + '/motion.js',
             bundle_js + '/bootstrap.js',
             bundle_js + '/scrollspy.js',
             bundle_js + '/post-details.js',
             bundle_js + '/localsearch.js',
             bundle_js + '/achive-year.js',
             bundle_js + '/pretty-print.js'
        ])
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest(bundle_dir));
});

gulp.task('copy-css', function() {
    return gulp.src([
            public_dir + '/vendors/fancybox/source/jquery.fancybox.css',
            public_dir + '/vendors/font-awesome/css/font-awesome.min.css',
            public_dir + '/vendors/font-mfizz/css/font-mfizz.css',
            public_dir + '/vendors/google-code-prettify/skins/prettify.css',
            public_dir + '/css/main.css'
        ])
        .pipe(gulp.dest(bundle_css));
})


gulp.task('copy-font-awesome', function() {
    return gulp.src(public_dir + '/vendors/font-awesome/fonts/**.*')
        .pipe(gulp.dest(bundle_fonts));
})

gulp.task('copy-font-mfizz', function() {
    return gulp.src(public_dir + '/vendors/font-mfizz/fonts/**.*')
        .pipe(gulp.dest(bundle_fonts));
})

gulp.task('minify-css', function() {
    return gulp.src(bundle_css)
        .pipe(cleanCSS({
            debug: true
        }, function(details) {
            console.log(`${details.name}:[${Math.round(details.stats.efficiency *100)}%]${details.stats.originalSize}=>${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest(bundle_css));
})

gulp.task('concat-essential-css', function() {
    return gulp.src([
            bundle_css + '/main.css'
        ])
        .pipe(concat('essential.css'))
        .pipe(gulp.dest(bundle_dir));
});

gulp.task('concat-advance-css', function() {
    return gulp.src([
            bundle_css + '/jquery.fancybox.css',
            bundle_css + '/font-awesome.min.css',
            bundle_css + '/font-mfizz.css',
            bundle_css + '/prettify.css'
        ])
        .pipe(concat('advance.css'))
        .pipe(gulp.dest(bundle_dir));
});

gulp.task('finish-task', function() {
    return del([bundle_js, bundle_css]);
});

gulp.task('default', function() {
    runSequence('clean', ['copy-htaccess','copy-js', 'copy-css','copy-font-awesome','copy-font-mfizz'], ['minify-js', 'minify-css'], ['concat-js', 'concat-essential-css','concat-advance-css'],'finish-task');
});