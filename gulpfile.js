var gulp = require("gulp"),
    gulpLoadPlugins = require("gulp-load-plugins"),
    del = require("del"),
    combiner = require("stream-combiner2").obj;

var $ = gulpLoadPlugins();

var isDevelopment =  !process.env.NODE_ENV || process.env.NODE_ENV == "development";

var path = {
    build: {
        html: "build/",
        js: "build/js/",
        css: "build/css/",
        img: "build/img/"
    },
    src: {
        html: "src/assets/*.html",
        js: "src/js/main.js",
        styles: "src/styles/main.less",
        img: "src/assets/img/**/*.*"
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        styles: 'src/styles/**/*.less',
        img: 'src/img/**/*.*',
    },
    clean: "./build"
};

function defaultError(caption){
    return function(err){
        return {
            title: caption,
            message: err.message
        };
    };
}

gulp.task("html:build", function(){
   return combiner(
       gulp.src(path.src.html, {since: gulp.lastRun("html:build")}),
       $.newer(path.build.img),
       gulp.dest(path.build.html)
   ).on("error", $.notify.onError(defaultError("HTML")));
});

gulp.task("js:build", function(){
    return combiner(
       gulp.src(path.src.js),
       $.rigger(),
       $.if(isDevelopment, $.sourcemaps.init()),
       $.if(!isDevelopment, $.uglify()),
       $.if(isDevelopment, $.sourcemaps.write()),
       gulp.dest(path.build.js)
   ).on("error", $.notify.onError(defaultError("Scripts")))
});

gulp.task("styles:build", function(){
    return combiner(
        gulp.src(path.src.styles),
        $.if(isDevelopment, $.sourcemaps.init()),
        $.less(),
        $.autoprefixer(),
        $.if(isDevelopment, $.sourcemaps.write()),
        $.if(!isDevelopment, $.cssnano()),
        gulp.dest(path.build.css)
    ).on("error", $.notify.onError(defaultError("Styles")));
});

gulp.task("images:build", function(){
    return combiner(
        gulp.src(path.src.img, {since: gulp.lastRun("images:build")}),
        $.newer(path.build.img),
        $.imagemin(),
        //$.debug({title: "images"}),
        gulp.dest(path.build.img)
    ).on("error", $.notify.onError(defaultError("Images")));
});

gulp.task("clean", function(){
    return del(path.clean);
});

gulp.task("build", gulp.series(
    "clean",
    gulp.parallel("html:build", "js:build", "styles:build", "images:build")
));

gulp.task("watch", function(){
    gulp.watch(path.watch.html, gulp.series("html:build"));
    gulp.watch(path.watch.js, gulp.series("js:build"));
    gulp.watch(path.watch.styles, gulp.series("styles:build"));
    gulp.watch(path.watch.img, gulp.series("images:build"));
});

gulp.task("default", gulp.series("build", "watch"));