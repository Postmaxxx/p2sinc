const   { series, parallel, src, dest, watch }      = require('gulp'),
        gulp            = require('gulp'),
        sass            = require('gulp-sass'),
        del             = require('del'),
        browsersync     = require('browser-sync').create(),
        reload          = browsersync.reload,
        tailwindcss     = require('tailwindcss'),
        autoprefixer    = require('gulp-autoprefixer'),
        postcss         = require('gulp-postcss'),
        //merge           = require('merge-stream'),
        concat          = require('gulp-concat'),
        cssnano         = require('gulp-cssnano'),
        purgecss        = require('gulp-purgecss'),
        twig            = require('gulp-twig'),
        htmlmin         = require('gulp-htmlmin'),
        sourcemaps      = require('gulp-sourcemaps'),
        rename          = require('gulp-rename'),
        svgsprite       = require('gulp-svg-sprite'),
        ttf2woff        = require('gulp-ttf2woff'),
        ttf2woff2       = require('gulp-ttf2woff2'),
        critical        = require('critical').stream,
        uglify          = require('gulp-uglify-es').default,
        imagemin        = require('gulp-imagemin'),
        terser          = require('gulp-terser'),
        cache           = require('gulp-cached');


function cleanFolders() { 
    return del(['./web/**','./temp/**', '!public'])
};
        

/* -----------------------  Twig/html  --------------------------- */


function compileTwig() { //compile twig files
    return src('./src/templates/pages/**/*.twig')
        .pipe(twig())
        .pipe(dest('./web/'))
        .pipe(browsersync.stream());
}

 
function htmlMinifier() {
    return src('./web/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('./web/'))
}

function htmlStylesInjector() { //injects some csws styles in html file inline
    return src('./web/*.html')
        .pipe(critical({
            base: './web/',
            inline: true,
            css: ['./web/assets/css/bundle.css'],
        })
      )
        .on('error', err => {
            log.error(err.message);
        })
        .pipe(dest('./web/'))
        //.pipe(browsersync.stream()); //???
  };


/* -----------------------  IMG  --------------------------- */

function imgCopy() { //copy images to 'web/assets/img' folder
    return src(['./src/assets/img/**/*.*', "!./src/assets/img/**/*.svg"])
        //.pipe(cache('./web/assets/img'))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(dest('./web/assets/img/'))
        .pipe(browsersync.stream());
}





function createSvgSprite() {
    return src('./src/assets/img/**.svg')
        .pipe(svgsprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('./web/assets/img/sprites/'))
}





/* -----------------------  Video  --------------------------- */

function vidCopy() { //copy videos to 'web/assets/vid' folder
    return src(['./src/assets/vid/**/*.*'])
        //.pipe(cache('./web/assets/img'))
        .pipe(dest('./web/assets/vid/'))
        .pipe(browsersync.stream());
}



/* -----------------------  Fonts  --------------------------- */

function fontsConverter() {
    src('./src/assets/fonts/**/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('./web/assets/fonts/'))
    return src('./src/assets/fonts/**/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('./web/assets/fonts/'))
}


/* -----------------------  CSS  --------------------------- */


function scssToCss() { //formatting all scss files to single 'main.css' file inside 'temp' folder
    return src('./src/assets/scss/**/*.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        //.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        /*.pipe(postcss([ // formatting css file for better reading comfort
            tailwindcss('./postcss.config.js')
        ]))*/
        //.pipe(concat({ path: 'main.css'})) //filename
        //.pipe(sourcemaps.write('.'))
        .pipe(dest('./temp/')) //file folder
}


function scssToCssBuild() { //formatting all scss files to single 'main.css' file inside 'temp' folder
    return src('./src/assets/scss/**/*.scss') 
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(postcss([ // formatting css file for better reading comfort
            tailwindcss('./postcss.config.js')
        ]))
        //.pipe(concat({ path: 'main.css'})) //filename
        .pipe(dest('./temp/')) //file folder
}

function tailwindCopy() { //formatting tailwind.css file to 'tailwind.css' file inside 'temp' folder
    return src('./node_modules/tailwindcss/tailwind.css')
        //.pipe(cache('./temp'))
        .pipe(postcss([ // formatting css file for better reading comfort
            tailwindcss('./tailwind.config.js')
        ]))
        .pipe(concat({ path: 'tailwind.css'})) //filename
        .pipe(dest('./temp/')) //file folder
}



function concatStyles() { //split css files to 'bundle.css' file
    return src(['./temp/tailwind.css', './temp/main.css'])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat("bundle.css")) //filename
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./temp/')); //file folder
};




function cssCleaner() { //clean 'bundle.css' from unused properties and save it in folder './web/assets/css/'
    return src('./temp/bundle.css')
        //.pipe(cache('./temp'))
        .pipe(purgecss({
            content: ['./web/**/*.html']
        }))
        .pipe(cssnano()) // minify css file
        .pipe(dest('./temp/')) //output file folder
}


function copyCss() { //copy 'bundle.css' in folder './web/assets/css/' without any modifications
    return src(['./temp/bundle.css', './temp/bundle.css.map'])
        .pipe(dest('./web/assets/css/')) //output file folder
        .pipe(browsersync.stream());
}


/*
function removeMaps() { 
    return del(['./web/assets/css/bundle.css.map', '!public'])
};
*/

/* -----------------------  JS  --------------------------- */


function jsCopy() { //copy js to 'web/assets/js' folder
    return src('./src/assets/js/**/*.*')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./web/assets/js/'))
        .pipe(browsersync.stream());
}

function jsCopyBuild() { //copy js to 'web/assets/js' folder
    return src('./src/assets/js/**/*.*')
        .pipe(uglify())
        .pipe(dest('./web/assets/js/'))
}

/*
function uglifyJs() {
    return src('./web/assets/js/about.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./web/assets/js/2/'))
}
*/
/* -----------------------  Server  --------------------------- */

function createServer() {

    browsersync.init({
        server: {
            baseDir: "./web/",
            index: "homepage.html",
            port: 3000,
            reloadDelay: 0,
            reloadOnRestart: true,
            notify: true
        }
    });

    watch("./src/templates/**/*.twig").on("change", series(compileTwig));
    watch("./src/assets/scss/**/*.scss").on("change", series(scssToCss, concatStyles, copyCss));
    watch("./src/assets/js/**/*.*").on('change', series(jsCopy));
    watch(["./src/assets/img/**/*.*", "!./src/assets/img/**/*.svg" ]).on('all', series(imgCopy, reload));
    watch(["./src/assets/vid/**/*.*"]).on('all', series(vidCopy, reload));
    watch("./src/assets/img/**/*.svg").on('all', series(createSvgSprite));
    watch("./src/assets/fonts/**/*.ttf").on('all', series(fontsConverter));
};





const build = series(cleanFolders, parallel(compileTwig, imgCopy, vidCopy, createSvgSprite, scssToCssBuild, tailwindCopy, fontsConverter, jsCopyBuild), concatStyles, cssCleaner, copyCss, htmlStylesInjector, htmlMinifier)
exports.build = build;


const server = series(cleanFolders, parallel(compileTwig, imgCopy, vidCopy, createSvgSprite, jsCopy, fontsConverter, scssToCss), tailwindCopy, concatStyles, copyCss, createServer);
exports.server = server;

const test = series(scssToCss);
exports.test = test;