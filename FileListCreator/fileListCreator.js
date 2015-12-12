var inquirer = require('inquirer');
var shelljs = require('shelljs');
var path = require('path');
var fs = require('fs');


function help() {
//	console.log(process.argv);
	console.log('use: mflc [Folder path]');
	console.log('ej: mflc /ALMACEN/MUSICA/G/Guns_and_roses');
	process.exit(0);
}



function run() {	
//	console.log(process.argv);
//	console.log(process.argv.length);
	if (process.argv.length != 3 || process.argv[2].length === 0) {
		help();
	}
	var arg = process.argv[2];	
	var cmd = 'ls -lhi "' + arg + '"';
	var log = shelljs.exec(cmd);

	inquirer.prompt({type: 'confirm', name:'addPath', message: 'Do you want add to file', default:false}, function(anwser) {
		if (arg[arg.length-1] === path.sep) {
			arg = arg.substr(0, arg.length-1);
		}
		var name = arg.substr(arg.lastIndexOf(path.sep)+1);
		//console.log(name);
		name = name.replace(/ /gm, '_');
		//arg = arg.replace(/(\s)/gm, '\\ ');
		var line = arg + path.sep + ';' + name + '\n';
	
		if (anwser.addPath === true) { 
			fs.appendFileSync('music4Phone.js', line, 'utf8');		
		} else {
			console.log(line);
		}
	});
}

run();


