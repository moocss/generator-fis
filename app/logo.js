function FisLogo(contex) {
	var version = '';
	try{
		version = contex? 'v'+contex.pkg.version : '';
	}
	catch (e){}

/*
   ________  _____   ______
  |_   __  ||_   _|.' ____ \
    | |_ \_|  | |  | (___ \_|
    |  _|     | |   _.____`.
   _| |_     _| |_ | \____) |
  |_____|   |_____| \______.'
*/

	var logo ="\n"+
	"/*--------------------------------------------*/\n"+
	red("   ________  _____   ______\n")+
	red("  |_   __  ||_   _|.' ____ \\\n")+
	yellow("    | |_ \\_|  | |  | (___ \\_|\n")+
	green("    |  _|     | |   _.____`.\n")+
	purple("   _| |_     _| |_ | \\____) |\n")+
	blue("  |_____|   |_____| \\______.'")+ red("  {{{ ") + version + red(" }}}")+"\n\n"+
	"/*--------------------------------------------*/\n\n";

	logo += ('need help?')+ purple('  ===>  ') + green('yo fis:h') + '\n';

	if(contex){
		logo += '\nCMD: '+green(contex.generatorName.toUpperCase())+'\n';
	}

	return logo;
};

exports.FisLogo = FisLogo;

function consoleColor(str,num){
	if (!num) {
		num = '32';
	}
	return "\033[" + num +"m" + str + "\033[0m"
}

function green(str){
	return consoleColor(str,32);
}

function yellow(str){
	return consoleColor(str,33);
}

function red(str){
	return consoleColor(str,31);
}

function blue(str){
	return consoleColor(str,34);
}

function purple(str){
	return consoleColor(str,36);
}

//console.log(FisLogo());