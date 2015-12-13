var shelljs = require('shelljs');
var path = require('path');
var fs = require('fs');
var utils = require('../Utils/utils');


function help() {
	console.log('use: mflc -l [Folder path] -f [Folder path]');
	console.log('-l : List files inside folder and ask if you want add to fileList');
	console.log('-f : Add all folders inside folder to list');
	console.log('ej : mflc -l /ALMACEN/MUSICA/G/Guns_and_roses');
	console.log('ej : mflc -p /mnt/usb');

	process.exit(0);
}

function processArgs() {
	var args = {};

	args.pathToListFile = utils.args.getParam('-l', {helpCallBack: help});
	args.pathToFolder = utils.args.getParam('-f', {helpCallBack: help});

	//console.log(args);
	if (args.pathToListFile && args.pathToFolder) {
		console.error('Only one param is allowed at the same time');
		help();
	}

	if (!args.pathToListFile && !args.pathToFolder) {
		help();
	}

	return args;
}

function handleFolder(args) {
	if (args.pathToFolder[args.pathToFolder.length-1] !== path.sep){
		args.pathToFolder += path.sep;
	}
	var cmd = 'ls -1 "' + args.pathToFolder + '"';
	var log = shelljs.exec(cmd, {silent: true});
	if (log.code !== 1){
		var list = log.output.split('\n');
		var resultList = [];
		for(var i = 0; i < list.length; i++) {
				resultList.push(args.pathToFolder + list[i] + ';' + list[i] );
		}
		fs.writeFileSync('../config/musicUsbToPhone.txt', resultList.join('\n'), 'utf8');
		utils.popup.alert('FileList result create in "../config/musicUsbToPhone.txt"', 'blue');
	}
}

function handleList(args) {
	var cmd = 'ls -lhi "' + args.pathToListFile + '"';
	var log = shelljs.exec(cmd);
	var inquirer = require('inquirer');

	inquirer.prompt({type: 'confirm', name:'addPath', message: 'Do you want add to file', default:false}, function(anwser) {
		if (arg[arg.length-1] === path.sep) {
			arg = arg.substr(0, arg.length-1);
		}
		var name = arg.substr(arg.lastIndexOf(path.sep)+1);
		name = name.replace(/ /gm, '_');
		var line = arg + path.sep + ';' + name + '\n';

		if (anwser.addPath === true) {
			fs.appendFileSync('music4Phone.js', line, 'utf8');
		} else {
			console.log(line);
		}
	});
}

function run() {
	var args = processArgs();
	if (args.pathToListFile) {
		handleList(args)
	} else if (args.pathToFolder)	{
		handleFolder(args);
	}
}

/*
* MAIN PROCESS
*/
run();
