'use strict';
/**********************************************
1.DEPENDENCIES
**********************************************/

var gulp = require('gulp'),
    // glob = require("glob"),
    // bower = require('bower'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    // jade = require('gulp-jade'),
    // uncss = require('gulp-uncss'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    spritesmith = require('gulp.spritesmith'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    // rimraf = require('rimraf'),
    livereload = require('gulp-livereload'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;



/**********************************************
2. FILE DESTINATIONS(RELATIVE TO ASSETS FOLDER)
**********************************************/

var path = {
    build: {
        html: 'build/',
        jade: 'src/template',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        sprite: 'src/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        jade: 'src/jade/*.jade',
        js: 'src/js/**/*.js',
        sass: 'src/sass/**/*.scss',
        sprite: 'src/img/ico/*.*',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
        // bower: 'src/app/*.js'
        
    },
    watch: {
        html: 'src/*.html',
        jade: 'src/jade/*.jade',
        js: 'src/js/**/*.js',
        sass: 'src/sass/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};



/**********************************************
3. BROWSER SYNC
**********************************************/
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 7778,
    logPrefix: "Kossmat"
};

gulp.task('webserver', function () {
    browserSync(config);
});

/**********************************************
4. CLEAN BUILD FOLDER
**********************************************/

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

/**********************************************
BOWER
**********************************************/
// gulp.task('bower:build', function() {
//     gulp.src(path.src.bower)
//     .pipe(gulp.dest(path.build.bower))
//     .pipe(reload({stream: true}));
// })

/**********************************************
JADE
**********************************************/
gulp.task ('jade:build', function(){
    var assets = useref.assets();
    gulp.src(path.src.jade)
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber())
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .on('error', console.log)
        .pipe(gulp.dest(path.build.jade))
        .pipe(reload({stream: true}));
}) 

/**********************************************
HTML
**********************************************/
gulp.task('html:build', function () {
    var assets = useref.assets();
    // var opts = {
    // conditionals: true,
    // spare:true
    // };
    return gulp.src('src/mywork.html')
        .pipe(plumber())
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
        // .pipe(livereload());
});


/**********************************************
SASS
**********************************************/
gulp.task('sass:build', function () {
    // var assets = useref.assets();
    gulp.src(path.src.sass) 
        .pipe(plumber({
            errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))

        .pipe(sourcemaps.init())
        ///
        .pipe(sass())
        // ///
        // .pipe(uncss({
        //     html: glob.sync('build/index.html')
        // }))
        // ///

        .pipe(prefixer({browsers: [
                '> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9'
                    ],
                cascade: false}))
        ///
        // .pipe(uncss({
        //     html: glob.sync('src/index.html')
        // }))
        ///
        //.pipe(minifyCSS())
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

/**********************************************
JS
**********************************************/
// gulp.task('js:build', function () {
//     var assets = useref.assets();
//     // return gulp.src('src/*.html')

//     gulp.src(path.src.js)

//         .pipe(plumber())
//             // .pipe(sourcemaps.init())
//         .pipe(assets)
//         .pipe(gulpif('*.js', uglify())) 
//         .pipe(assets.restore())
//         .pipe(useref())  
//             // .pipe(sourcemaps.write()) 
//         .pipe(gulp.dest(path.build.js))
//         .pipe(reload({stream: true}));
// });

/**********************************************
IMG
**********************************************/
gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

/**********************************************
FONTS
**********************************************/
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

/**********************************************
SPRITE
**********************************************/
 gulp.task('sprite:build', function() {
    var spriteData = gulp.src(path.src.sprite)
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        //escaped_image: 'nested/dir/sprite.png',
        source_image: '../img/sprite.png',
        padding: 20
    }));
    spriteData.pipe(gulp.dest(path.build.sprite))
    .pipe(reload({stream: true}));
 })

/**********************************************
N. GULP TASKS
**********************************************/
gulp.task(
    'build', [
    // 'jade:build',
    'html:build',
    'sass:build'
    // 'bower:build',
    // 'js:build',
    // 'fonts:build',
    // 'sprite:build',
    // 'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.jade], function(event, cb) {
        gulp.start('jade:build');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    // watch([path.watch.bower], function(event, cb) {
    //     gulp.start('bower:build');
    // });
});


gulp.task('default', ['build', 'webserver', 'watch']);