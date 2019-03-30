const { src, dest, series, parallel, watch } = require('gulp'),
			handlebars = require('gulp-compile-handlebars'),
			rename = require('gulp-rename'),
			browserSync = require('browser-sync'),
			gulpsass = require('gulp-sass'),
			wait = require('gulp-wait'),
			autoprefixer = require('gulp-autoprefixer'),
			notify = require("gulp-notify"),
			cleanCSS = require('gulp-clean-css'),
			concat = require('gulp-concat'),
			uglify = require('gulp-uglify'),
			gutil = require('gulp-util'),
			del = require('del'),
			cache = require('gulp-cache'),
			ftp = require('vinyl-ftp'),
			jshint = require('gulp-jshint'),
			htmlhint = require("gulp-htmlhint"),
			inject = require('gulp-inject');

// gulp.task('watch', ['html', 'css', 'js', 'browser-sync'], function () {
// 	gulp.watch('app/sass/**/*.sass', ['css']);
// 	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
// 	gulp.watch('app/handlebars/**/*.hbs', ['reload']);
// });

function compileHandlebars() {
	var templateData = {
		siteName: 'Site Name'
	},
	options = {
		ignorePartials: true, //ignores the unknown partial 
		batch: ['app/handlebars']
	};

	return src('app/handlebars/*.hbs')
		.pipe(handlebars(templateData, options))
		.pipe(rename(function (path) {
			path.extname = ".html"
		}))
		.pipe(dest('app'));
}

function copyVendorCSS() {
	var index = 1;
	return src([
			'node_modules/normalize.css/normalize.css',
			// 'node_modules/magnific-popup/dist/magnific-popup.css',
			// 'node_modules/rangeslider.js/dist/rangeslider.css',
			// 'node_modules/bootstrap/dist/css/bootstrap.min.css',
			// 'node_modules/hint.css/hint.min.css',
			// 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css',
			// 'node_modules/slick-carousel/slick/slick.css',
			// 'node_modules/slick-carousel/slick/slick-theme.css'
		])
		.pipe(rename(function (path) {
			path.basename = index++ + "-" + path.basename
		}))
		.pipe(dest('app/libs/css'));
}

function copyVendorJS() {
	var index = 1;
	return src([
			'node_modules/jquery/dist/jquery.min.js',
			// 'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
			// 'node_modules/rangeslider.js/dist/rangeslider.min.js',
			// 'node_modules/slick-carousel/slick/slick.min.js',
			// 'node_modules/bootstrap/dist/js/bootstrap.min.js',
			// 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
			// 'node_modules/slick-carousel/slick/slick.min.js',
			// 'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
		])
		.pipe(rename(function (path) {
			path.basename = index++ + "-" + path.basename
		}))
		.pipe(dest('app/libs/js'));
}

function injectVendors() {
	var sources = src([
		'./app/libs/css/**/*.css',
		'./app/libs/js/**/*.js'
	], { read: false });

	return src('app/*.html')
		.pipe(inject(sources, { relative: true }))
		.pipe(dest('app'));
};

function sass() {
	return src('app/sass/**/*.sass')
	.pipe(wait(1500))
	.pipe(gulpsass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(dest('app/css'))
	.pipe(browserSync.reload({ stream: true }));
}

function compileCustomJs() {
	return src([
		'app/js/common.js', // Всегда в конце
	])
		.pipe(concat('scripts.min.js'))
		// .pipe(uglify({ mangle: false })) // Минимизировать весь js (на выбор)
		.pipe(dest('app/js'))
		.pipe(browserSync.reload({ stream: true }));
}

function browserSyncInit(done) {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		open: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
	done();
}

function watchFiles() {
	watch('app/sass/**/*.sass', sass);
	watch(['app/js/common.js'], compileCustomJs);
	watch('app/handlebars/**/*.hbs', series(html, reload));
}

function reload(done) {
	browserSync.reload();
	done();
}

function clean() {
	return del(['dist', 'app/css', 'app/libs', 'app/*.html']);
}

const html = series(
	parallel(compileHandlebars, copyVendorCSS, copyVendorJS),
	injectVendors
);

exports.default = series(
	parallel(html, sass, compileCustomJs),
	browserSyncInit,
	watchFiles
);

exports.clean = clean;

// gulp.task('lint', ['lint-js', 'lint-html']);

// gulp.task('lint-js', function () {

// 	return gulp.src([
// 		'node_modules/jquery/dist/jquery.min.js',
// 		'app/js/common.js', // Всегда в конце
// 	])
// 		.pipe(jshint())
// 		.pipe(jshint.reporter('default'))
// 		.pipe(gulp.dest('app/js'));
// });
// gulp.task('lint-html', function () {
// 	return gulp.src("./app/*.html")
// 		.pipe(htmlhint({
// 			"alt-require": true
// 		}))
// 		.pipe(htmlhint.reporter());
// });

// gulp.task('deploy', function () {

// 	const UPLOAD_DIR = "surf";
// 	if (!UPLOAD_DIR) {
// 		throw new Error('Specify UPLOAD_DIR');
// 	}

// 	var conn = ftp.create({
// 		host: 'ftp-srv74404.ht-systems.ru',
// 		user: 'srv74404',
// 		password: '',
// 		parallel: 10,
// 		log: gutil.log
// 	});

// 	var globs = [
// 		'app/css/**',
// 		'app/fonts/**',
// 		'app/img/**',
// 		'app/js/**',
// 		'app/*.html',
// 	];
// 	return gulp.src(globs, { base: 'app/', buffer: false })
// 		.pipe(conn.newer('htdocs/' + UPLOAD_DIR)) // only upload newer files
// 		.pipe(conn.dest('htdocs/' + UPLOAD_DIR));

// });

// gulp.task('removedist', function () { return del.sync('dist'); });
// gulp.task('clearcache', function () { return cache.clearAll(); });

