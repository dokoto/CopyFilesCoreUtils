var shelljs = require('shelljs');
var path = require('path');
var fs = require('fs');


function help() {
//	console.log(process.argv);
	console.log('use: sml [Path to file list]');
	console.log('ej: sml music4Phone.txt');
	process.exit(0);
}



function run() {	
//	console.log(process.argv);
//	console.log(process.argv.length);
	if (process.argv.length != 3 || process.argv[2].length === 0) {
		help();
	}
	var arg = process.argv[2];	
	var file = fs.readFileSync(arg, 'utf8').split('\n');
	var totalSize = 0.0;
	for(var i = 0; i < file.length; i++) {
		var path = file[i].split(';')[0];
//		console.log('path : ' + path);
		var cmd = 'du -hcs "' + path + '" | tail -n 1';
//		console.log('cmd : ' + cmd);
		var log = shelljs.exec(cmd, {silent: true});
		//console.log(log);
		var fileSize = log.output.split('\t')[0];
		var type = fileSize.substr(fileSize.length-1);
		fileSize = Number( fileSize.substr(0, fileSize.length-1) );
		console.log(fileSize + type + ' ==> ' + path );
		if (type === 'K') {
			totalSize += fileSize * 1024;
		}
		else if (type === 'M') {
			totalSize += fileSize;
		} else if (type === 'G') {
			totalSize += fileSize / 1024;
		}		
	}
	console.log('TOTAL SIZE : ' + totalSize + 'MB');
}

run();


