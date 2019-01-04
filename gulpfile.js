var gulp = require('gulp'),
	minify = require('gulp-minify-css'),
	purifyCSS = require('gulp-purifycss'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	merge = require('merge-stream'),
	prefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	runSequence = require('run-sequence'),
	browserSync = require('browser-sync').create();

	var paths = {
		vendor: ['node_modules/jquery/dist/jquery.js', 'node_modules/featherlight/release/featherlight.min.js', 'node_modules/gsap/src/minified/TweenMax.min.js', 'node_modules/gsap/src/minified/TimelineMax.min.js', 'node_modules/gsap/src/minified/plugins/CSSPlugin.min.js' ],
		scripts: ['js/*.js'],
		pages: ['pages/**/*.html'],
		scss: ['scss/*.scss', 'node_modules/featherlight/release/featherlight.min.css'],
		images: ['images/**/*']
	};

gulp.task('clean', function(){
	del ([
		'dist/**', '!dist'
		])
});

gulp.task('server', ['css', 'js', 'pages', 'images', 'vendorsJS'], function(){
	browserSync.init({
		server:  "dist/"
	});
});	

gulp.task('pages', function(){
	return gulp.src(paths.pages)
	.pipe(gulp.dest('dist/'));
});

gulp.task('images', function(){
	return gulp.src(paths.images)
	.pipe(gulp.dest('dist/img/'));
});

gulp.task('css', function(){
	return gulp.src(paths.scss)
	.pipe(sass({
		includePaths: ['node_modules/foundation-sites/scss', 'node_modules/hamburgers/_sass/hamburgers']
	}).on('error', sass.logError))
	.pipe(prefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']}))
	.pipe(concat('style.css'))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.stream());
});

gulp.task('js', function(){
	return gulp.src(paths.scripts)
	.pipe(browserSync.stream())
	.pipe(concat('script.js'))
	.pipe(gulp.dest('dist/'));
});

gulp.task('vendorsJS', function(){
	return gulp.src(paths.vendor)
	.pipe(uglify())
	.pipe(concat('vendors.min.js'))
	.pipe(gulp.dest('dist/'));
});

gulp.task('purify', ['css', 'js', 'vendorsJS', 'pages'], function(){
	return gulp.src(['dist/style.css'])
	.pipe(purifyCSS(['dist/*.js', 'dist/*.html']))
	.pipe(minify())
	.pipe(gulp.dest('dist/'))
})

// WATCHERS
gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['css']).on('change', function(event) { console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
	gulp.watch('js/**/*.js', ['js']).on('change', function(event) { console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
	gulp.watch('pages/**/*.html', ['pages']).on('change', browserSync.reload, function(event) { console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
	gulp.watch('images/**/*', ['images']).on('change', function(event) { console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('production', ['pages', 'images', 'css', 'js']);

gulp.task('build', ['images', 'purify']);

gulp.task('rebuild', ['clean'], function(callback){
	 runSequence('images', 'purify', callback);
});

gulp.task('default', ['pages', 'images', 'css', 'vendorsJS', 'js', 'watch', 'server'])



