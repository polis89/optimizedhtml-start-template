var gulp           = require('gulp'),
		handlebars     = require('gulp-compile-handlebars'),
		browserSync    = require('browser-sync'),
		sass           = require('gulp-sass'),
		autoprefixer   = require('gulp-autoprefixer'),
		cleanCSS       = require('gulp-clean-css'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		gutil          = require('gulp-util' ),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		jshint 				 = require('gulp-jshint'),
		inject				 = require('gulp-inject'),
		wait 					 = require('gulp-wait'),
		htmlhint       = require("gulp-htmlhint");

// Скрипты проекта

gulp.task('default', ['watch']);

gulp.task('copy_css', function () {
	gulp.src([
		'node_modules/normalize.css/normalize.css',
		// 'node_modules/bootstrap/dist/css/bootstrap.min.css',
		// 'node_modules/rangeslider.js/dist/rangeslider.css',
		// 'node_modules/slick-carousel/slick/slick.css',
		// 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css',
		// 'node_modules/slick-carousel/slick/slick-theme.css'
	])
		.pipe(gulp.dest('app/libs/css'));
});

gulp.task('copy_js', function () {
	gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		// 'node_modules/rangeslider.js/dist/rangeslider.min.js',
		// 'node_modules/slick-carousel/slick/slick.min.js',
		// 'node_modules/bootstrap/dist/js/bootstrap.min.js',
		// 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
		// 'node_modules/slick-carousel/slick/slick.min.js'
	])
		.pipe(gulp.dest('app/libs/js'));
});

gulp.task('watch', ['html', 'css', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['css']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/handlebars/**/*.hbs', ['reload']); 
});

gulp.task('css', ['sass'], function() {
	return gulp.src([
		'app/css/main.css',
		])    
	// .pipe(concat('main.min.css'))
	// .pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
	return gulp.src([
		'app/js/common.js', // Всегда в конце
		])    
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify({ mangle: false })) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('reload', ['html'], function () {
    browserSync.reload();
});

gulp.task('html', ['handlebars', 'copy_css', 'copy_js'], function () {
	var sources = gulp.src([
		'./app/libs/css/**/*.css',
		'./app/libs/js/**/*.js'
		], { read: false });

	return gulp.src('app/*.html')
		.pipe(inject(sources, { relative: true }))
		.pipe(gulp.dest('app'));
});

gulp.task('handlebars', function () {
	var templateData = {
		siteName: 'Имя Сайта'
		},
		options = {
			ignorePartials: true, //ignores the unknown partial 
			partials: {
				// footer : '<footer>the end</footer>'
			},
			batch: ['app/handlebars'],
		};

	return gulp.src('app/handlebars/*.hbs')
		.pipe(handlebars(templateData, options))
		.pipe(rename(function (path) {
			path.extname = ".html"
		}))
		.pipe(gulp.dest('app'));
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(wait(1500))
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		open: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('lint', ['lint-js', 'lint-html']);

gulp.task('lint-js', function(){

	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'app/js/common.js', // Всегда в конце
		])    
	.pipe(jshint())
  .pipe(jshint.reporter('default')) 
	.pipe(gulp.dest('app/js'));
});
gulp.task('lint-html',function(){
	return gulp.src("./app/*.html")
	    .pipe(htmlhint({
	    	"alt-require": true
	    }))
	    .pipe(htmlhint.reporter());
});

//Build scripts
gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	const UPLOAD_DIR = "surf"; 
	if(!UPLOAD_DIR){
		throw new Error('Specify UPLOAD_DIR');
	} 

	var conn = ftp.create({
		host:      'ftp-srv74404.ht-systems.ru',
		user:      'srv74404',
		password:  '',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'app/css/**',
	'app/fonts/**',
	'app/img/**',
	'app/js/**',
	'app/*.html',
	];
	return gulp.src(globs, {base: 'app/', buffer: false})        
		.pipe( conn.newer( 'htdocs/' +  UPLOAD_DIR) ) // only upload newer files
    .pipe( conn.dest( 'htdocs/' +  UPLOAD_DIR) );

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

