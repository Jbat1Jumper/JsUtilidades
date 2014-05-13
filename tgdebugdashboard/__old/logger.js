var log = {};

log.saved = [];

log.write = function (str, lvl)
{
	if(typeof(lvl) === "undefined")
		lvl = 10;
	log.saved.push((new Date()).toString() + " lvl " + lvl.toString() + ": " + str)
	if(lvl <= log.verbosity)
		console.log(str);
}
log.paranoid = function(str){
	log.write(str, log.lvl.PARANOID);
}
log.annoy = function(str){
	log.write(str, log.lvl.ANNOY);
}
log.bother = function(str){
	log.write(str, log.lvl.BOTHER);
}
log.debug = function(str){
	log.write(str, log.lvl.DEBUG);
}
log.info = function(str){
	log.write(str, log.lvl.INFO);
}
log.warning = function(str){
	log.write(str, log.lvl.WARNING);
}
log.error = function(str){
	log.write(str, log.lvl.ERROR);
}
log.critical = function(str){
	log.write(str, log.lvl.CRITICAL);
}
log.kernel_panic = function(str){
	log.write(str, log.lvl.KERNEL_PANIC)
}


log.tail = function(howMany){
	if(typeof(howMany) == "undefined")
		howMany = 20;
	var total = log.saved.length;
	if(total < howMany)
		howMany = log.saved.length;
	for(var n = total - howMany; n < total; n++)
		console.log(log.saved[n]);
}


log.lvl = {};

log.lvl.PARANOID = 1000;

log.lvl.ANNOY = 60; //  Se recomienda usar log.annoy y log.bother
log.lvl.BOTHER = 60; //  para funciones que se ejecutan constantemente asi no molestan visualmente

log.lvl.DEBUG = 40;
log.lvl.INFO = 30;
log.lvl.WARNING = 20;
log.lvl.ERROR = 10;
log.lvl.CRITICAL = 0;

log.lvl.KERNEL_PANIC = -1000;


log.verbosity = log.lvl.DEBUG;