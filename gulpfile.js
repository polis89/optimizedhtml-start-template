var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		rsync          = require('gulp-rsync'),
		handlebars     = require('gulp-compile-handlebars'),
		jshint 				 = require('gulp-jshint'),
		htmlhint       = require("gulp-htmlhint");

// Скрипты проекта

gulp.task('default', ['watch']);

gulp.task('watch', ['html', 'sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/handlebars/**/*.hbs', ['reload']); 
});

gulp.task('reload', ['html'], function () {
    browserSync.reload();
});

gulp.task('html', function () {
    var templateData = {
        siteName: 'Имя Сайта',
        logo: 'Логотип',
        contacts: {
		      email: 'example@example.com',
		      phone: 'phone',
		      address: 'г.Город, ул.Уличная 1-20'        	
        },
        menu: [
        	'Пункт 1',
        	'Пункт 2',
        	'Пункт 3',
        	'Пункт 4',
        ],
        tabsContent: {
        	controls: [
        		{
        			name: 'Tab 1',
        			active: true,
        		},
        		{
        			name: 'Tab 2',
        		},
        		{
        			name: 'Tab 3',
        		},
        	],
        	content: [
        		{
        			name: 'Content 1',
        			active: true,
        		},
        		{
        			name: 'Content 2',
        		},
        		{
        			name: 'Content 3',
        		},        	
        	]
        },
    },
    options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false 
        partials : {
            // footer : '<footer>the end</footer>'
        },
        batch : ['app/handlebars'],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    }
 
    return gulp.src('app/handlebars/*.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename(function (path) {
				  path.extname = ".html"
				}))
        .pipe(gulp.dest('app'));
});

gulp.task('js', function() {
	return gulp.src([
		// 'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js', // Всегда в конце
		])    
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
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

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('lint', ['lint-js', 'lint-html']);

gulp.task('lint-js', function(){

	return gulp.src([
		// 'app/libs/jquery/dist/jquery.min.js',
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

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('rsync', function() {
	return gulp.src('dist/**')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		archive: true,
		silent: false,
		compress: true
	}));
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

