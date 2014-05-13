
var left_panel = {};

left_panel.update = function(dj)
{
}

left_panel.initialize = function(dj)
{
	log.info("initialize left panel");
	left_panel.initialize_events(dj);
	left_panel.init_web_dashboard_info(dj);

	log.debug("loading dashboard server info");
	tg_connector.send_message("get_dashboard_info", {});

}


left_panel.initialize_events = function (dj)
{
	tg_connector.on("get_dashboard_info", function(msg){
		log.debug("got dashboard server info");
		log.debug(msg);

		di = dj.domConstruct.create("div", {
			className: "tg_dashboard_info"
		});

		dj.domConstruct.create("h4", {
			className: "tg_dashboard_info_title",
			innerHTML: "Debug Dashboard",
		}, di);

		var list = dj.domConstruct.create("ul", {}, di);

		for(var key in msg)
		{
			dj.domConstruct.create("li", {
				innerHTML: key.toString() + ": "+ msg[key].toString()
			}, list);
		}
		dj.domConstruct.destroy(dj.query("#tg_info > .tg_dashboard_info"));
		dj.domConstruct.place(di, "tg_info");
	});

	tg_connector.on("get")
}

left_panel.init_web_dashboard_info = function(dj)
{
	log.debug("initializing web dashboard info");

	var wdi = dj.domConstruct.create("div", {
		className: "tg_web_dashboard_info",
	});

	dj.domConstruct.create("h4", {
		className: "tg_web_dashboard_info_title",
		innerHTML: "Web Dashboard",
	}, wdi);

	var list = dj.domConstruct.create("ul", {}, wdi);

	dj.domConstruct.create("li", {
		innerHTML: "version: " + tg_config.web_dashboard_version.toString(),
	}, list);

	dj.domConstruct.destroy(dj.query("#tg_info > .tg_web_dashboard_info"));

	dj.domConstruct.place(wdi, "tg_info");
}

