const fs          = require( 'fs' );
const archiver    = require( 'archiver' );
const theme_name  = 'vrworld';
let theme_version = false;

try {
	const schema = require( './config/settings_schema.json' );
	if ( schema ) {
		const themeInfo = schema.find( item => item.name === 'theme_info' );

		theme_version = themeInfo?.theme_version;
	}
} catch ( err ) {
	console.log( err.message );
}

if ( false === theme_version ) {
	console.log( 'Zip theme failed!' );

	return;
}

const output  = fs.createWriteStream( __dirname + `/${ theme_name }-${ theme_version }.zip` );
const archive = archiver( 'zip', { zlib: { level: 9 }});

output.on(
	'close',
	function() {
		console.log( 'Done!!!' );
	}
);

output.on(
	'end',
	function() {
		console.log( 'Data has been drained' );
	}
);

archive.on(
	'warning',
	function( err ) {
		if ( 'ENOENT' === err.code ) {
			console.log( err );
		} else {
			throw err;
		}
	}
);

archive.on(
	'error',
	function ( err ) {
		throw err;
	}
);

archive.pipe( output );
archive.glob(
	'**',
	{
		cwd: __dirname,
		ignore: [
			'node_modules/**',
			'{dev,dev/**/*}',
			'*.zip',
			'**/page.test.*.json',
			'**/page.dev.*.json',
			'LICENSE.md',
			'README.md',
			'shopify.theme.toml',
			'**/*.{cache,log,xml,lock,map,yml}',
			'**/*.scss',
			'package-lock.json',
			'package.json',
			'gulpfile.js',
			'zip.js'
		]
	},
	{}
);

archive.finalize();