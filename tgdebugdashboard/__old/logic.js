

var update_interval;

var components = {
	"tg_tab_screen": tab_screen,
	"tg_tab_io": tab_io,
	"tg_tab_printer": tab_printer,
	"tg_tab_sas": tab_sas,
	"tg_tab_bill": tab_bill,
	"tg_left_panel": left_panel,
};

var _dj;

require([
	"dojo/dom", 
	"dojo/dom-construct", 
	"dojo/query",
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/html",
	"dojo/parser", 
	"dojo/NodeList-traverse",
	"dijit/layout/BorderContainer", 
	"dijit/layout/TabContainer", 
	"dijit/layout/ContentPane", 
	"dojo/NodeList-dom", 
	"dojo/domReady!"
], function(dom, domConstruct, query, domAttr, domClass, html, parser){
	log.debug("parsing everything");
	parser.parse();
	log.debug("all parsed");

	var dj = {
		"dom": dom,
		"domConstruct": domConstruct,
		"query": query,
		"domAttr": domAttr,
		"domClass": domClass,
		"html": html,
		"parser": parser,
	};
	_dj = dj;
	log.info("created dojo object:");
	log.info(dj);

	log.info("initializing");
	initialize(dj);
	log.info("all initialized");

	log.debug("setting update_interval");
	update_interval = setInterval(function(){
		update(dj);
	}, 1000);
});

// ------------------------------------------ UPDATES


function initialize(dj)
{
	for(var name in components)
	{
		components[name].initialize(dj);
	}
}




// ------------------------------------------ UPDATES

function update(dj)
{	
	log.annoy("update call");
	// TODO
	//			mostrar datos del kernel
	// 			pedir llaves, botones, luces
	// 			refrescar estado constantemente
	//			
	//			imprimir ticket de prueba
	//
	// TOTO
	// TODO 

	dj.query("#tg_tab_container .tg_tab").forEach( function(node, index, nodelist) {
		id = dj.domAttr.get(node, "id");
		if(dj.domClass.contains(node.parentNode, "dijitVisible"))
		{
			log.annoy("trying to update" + id);
			components[id].update(dj);	
		};
		
	});	
}