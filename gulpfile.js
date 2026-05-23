/**
 * Gulp file
 *
 * @package DEV
 */

'use strict';

const fs   = require('fs');
const path = require('path');

let gulp    = require('gulp'),
	concat  = require('gulp-concat'),
	terser  = require('gulp-terser'),
	sass    = require('gulp-sass')(require('sass'));

// Optional plugins for performance optimization.
let cached;
try {
	cached = require('gulp-cached');
	console.log('✅ gulp-cached loaded successfully');
} catch (e) {
	console.log('⚠️  gulp-cached not available:', e.message);
	cached = null;
}

// ✨ SCSS directories for index generation
const dirs = ['dev/scss/general', 'dev/scss/layout', 'dev/scss/module'];

// ======================================================
// 🔧 Generate _index.scss in each folder
// ======================================================
let generateFolderIndex = (dir, done) => {
	if (!fs.existsSync(dir)) {
		console.log(`⚠️  Skip missing folder: ${dir}`);
		return done();
	}

	const indexFile = path.join(dir, '_index.scss');
	const files = fs.readdirSync(dir).filter(file => file.endsWith('.scss') && file !== '_index.scss');

	const forwardStatements = files.map(file => {
		const filename = path.basename(file, '.scss');
		return `@forward '${filename}';`;
	});

	fs.writeFileSync(indexFile, forwardStatements.join('\n'));
	console.log(`✅ Generated: ${indexFile}`);
	done();
};
generateFolderIndex.displayName = 'generateFolderIndex';

// Task generate _index.scss for every folder.
let generateAllFolderIndexes = done => {
	dirs.forEach(dir => {
		if (fs.existsSync(dir)) {
			generateFolderIndex(dir, () => {});
		} else {
			console.log(`⚠️  Skip missing folder: ${dir}`);
		}
	});
	done();
};
generateAllFolderIndexes.displayName = 'generateAllFolderIndexes';

// Generate callback for watch.
const createWatchIndexTask = dir => {
	const indexFileTask = done => generateFolderIndex(dir, done);
	indexFileTask.displayName = `watchIndex-${path.basename(dir)}`;
	return indexFileTask;
};

// ======================================================
// 🎨 SCSS tasks
// ======================================================

// Theme main css file - Full build (initial)
let themeCss = () => {
	return gulp.src('dev/scss/style.scss')
		.pipe(sass({ style: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('assets/'));
};

// Theme main css file - Incremental build (watch mode)
let themeCssIncremental = () => {
	console.log('🔄 Building theme CSS...');
	return gulp.src('dev/scss/style.scss')
		.pipe(sass({ style: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('assets/'));
};

// Module css - Full build (initial)
let moduleCss = () => {
	return gulp.src(['dev/scss/module/**/*.scss'])
		.pipe(sass({ style: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('assets/'));
};

// Module css - Incremental build (watch mode)
let moduleCssIncremental = () => {
	console.log('🔄 Building module CSS...');
	let stream = gulp.src(['dev/scss/module/**/*.scss']);

	if (cached && typeof cached === 'function') {
		console.log('📦 Using gulp-cached for module CSS');
		stream = stream.pipe(cached('moduleCss'));
	}

	return stream
		.pipe(sass({ style: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('assets/'));
};

// ======================================================
// ⚙️ JavaScript tasks
// ======================================================

// Slider JS - Full build.
let sliderJs = () => {
	return gulp.src([
			'dev/js/lib/slider/_core.js',
			'dev/js/lib/slider/*.js',
		])
		.pipe(concat('slider.js'))
		.pipe(terser({ ecma: 2020 }))
		.on('error', err => console.log(err))
		.pipe(gulp.dest('dev/js/base'));
};

// Theme main js file - Full build.
let themeJs = () => {
	return gulp.src([
			'dev/js/base/slider.js',
			'dev/js/base/core.js',
			'dev/js/base/util.js',
			'dev/js/base/image-loader.js',
			'dev/js/components/*.js',
			'dev/js/base/listener.js'
		], {
			allowEmpty: true
		})
		.pipe(concat('theme.js'))
		// .pipe(terser({ ecma: 2020 }))
		.on('error', err => console.log(err))
		.pipe(gulp.dest('assets/'));
};

// Theme main js file - Incremental build (watch mode)
let themeJsIncremental = () => {
	console.log('🔄 Building theme JS...');
	return gulp.src([
			'dev/js/base/slider.js',
			'dev/js/base/core.js',
			'dev/js/base/util.js',
			'dev/js/base/image-loader.js',
			'dev/js/components/*.js',
			'dev/js/base/listener.js'
		], {
			allowEmpty: true
		})
		.pipe(concat('theme.js'))
		// .pipe(terser({ ecma: 2020 }))
		.on('error', err => console.log(err))
		.pipe(gulp.dest('assets/'));
};

// Module js - Full build.
let moduleJs = () => {
	return gulp.src([
			'dev/js/lib/*.js',
			'dev/js/module/**/*.js'
		])
		.pipe(terser({ ecma: 2020 }))
		.on('error', err => console.log(err))
		.pipe(gulp.dest('assets/'));
};

// Module js - Incremental build (watch mode)
let moduleJsIncremental = () => {
	console.log('🔄 Building module JS...');
	let stream = gulp.src([
		'dev/js/lib/*.js',
		'dev/js/module/**/*.js'
	]);

	if (cached && typeof cached === 'function') {
		console.log('📦 Using gulp-cached for module JS');
		stream = stream.pipe(cached('moduleJs'));
	}

	return stream
		.pipe(terser({ ecma: 2020 }))
		.on('error', err => console.log(err))
		.pipe(gulp.dest('assets/'));
};

// ======================================================
// 🧱 Build tasks
// ======================================================
let buildAll = gulp.parallel(themeCss, moduleCss, moduleJs);

// ======================================================
// 👀 Watch tasks
// ======================================================
let _watch = () => {
	// Watch for index file generation.
	dirs.forEach(dir => {
		gulp.watch([`${dir}/*.scss`, `!${dir}/_index.scss`], createWatchIndexTask(dir));
	});

	// CSS watches with incremental builds.
	gulp.watch(['dev/scss/library/*.scss', 'dev/scss/module/**/*.scss'], moduleCssIncremental);
	gulp.watch([
		'dev/scss/general/*.scss',
		'dev/scss/layout/*.scss',
		'dev/scss/module/*.scss',
		'dev/scss/style.scss'
	], themeCssIncremental);

	// JS watches with incremental builds.
	gulp.watch(['dev/js/lib/slider/**/*.js'], sliderJs);
	gulp.watch(['dev/js/base/*.js', 'dev/js/components/*.js'], themeJsIncremental);
	gulp.watch([
		'dev/js/lib/*.js',
		'dev/js/module/**/*.js' // ✅ NEW: module folder
	], moduleJsIncremental);
};

// ======================================================
// 🧹 Clear cache
// ======================================================
let clearCache = done => {
	if (cached && cached.caches) {
		delete cached.caches.moduleCss;
		delete cached.caches.themeJs;
		delete cached.caches.moduleJs;
		console.log('✅ Cache cleared!');
	} else {
		console.log('⚠️  gulp-cached not available');
	}
	done();
};

// ======================================================
// 🧩 Gulp tasks registration
// ======================================================
gulp.task('build:css', gulp.parallel(themeCss, moduleCss));
gulp.task('build:js', gulp.parallel(sliderJs, themeJs, moduleJs));
gulp.task('build', gulp.series(generateAllFolderIndexes, buildAll));
gulp.task('clear-cache', clearCache);

// Default task - Full build initially, then incremental watch
gulp.task('default', gulp.series(
	generateAllFolderIndexes,
	buildAll,
	_watch
));

// Development task - Build and watch with better logging
gulp.task('dev', gulp.series(
	generateAllFolderIndexes,
	buildAll,
	done => {
		console.log('🚀 Initial build completed! Watching for changes...');
		done();
	},
	_watch
));