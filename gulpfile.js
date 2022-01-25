const { series, src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

sass.complier = require('dart-sass');

//Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Utilidades JS
const terser = require('gulp-terser-js')
const rename = require('gulp-rename')

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css() {
    return src(paths.scss)
        .pipe( sourcemaps.init())
        .pipe( sass({
            //outputStyle: 'expanded' //Esto nos entragaba una forma de compilacion de el css, podia ser expanded para la normal, o minified creo para la version liviana
        }) )
        .pipe( postcss([autoprefixer(), cssnano() ]))
        .pipe( sourcemaps.write('.'))
        .pipe( dest("./build/css") );
}

function minificarcss(){
    return src(paths.scss)
        .pipe( sass({
            outputStyle: 'compressed'
        }) )
        .pipe( dest("./build/css") )
}

function javascript(){
    return src(paths.js)
        .pipe( sourcemaps.init())
        .pipe( concat('bundle.js'))
        .pipe( terser())
        .pipe( sourcemaps.write('.'))
        .pipe( rename({ suffix: '.min' }))
        .pipe( dest('./build/js'))
}

function imagenes(){
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest('./build/img'))
//        .pipe( notify({ message: 'Imagen Minificada' }) );   Esta Linea de codigo que sirve para mandar mensajes al usuario, no la estare usando al final debido a que es muy molesta la notificacion que este manda
}

function versionWebp(){
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest('./build/img') )
}


function watchArchivos(){
    watch(paths.scss, css); //* Todos los archivos con esa extencion - ** Todas las carpetas
    watch(paths.js, javascript);
}


exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos );