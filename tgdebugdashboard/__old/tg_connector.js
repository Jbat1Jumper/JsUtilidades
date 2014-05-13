
var tg_connector = {};

tg_connector.ws = new WebSocket("ws://localhost:9022");

tg_connector.queue = [];


tg_connector.has_messages = function()
{
	if(this.queue.lenght > 0)
		return true;
	return false;
}

tg_connector.message_count = function()
{
	return this.queue.lenght;
}

tg_connector.get_message = function()
{
	return this.queue.shift();
}

tg_connector.handlers = {};

tg_connector.on = function(ev, f)
{
	if(typeof(this.handlers[ev]) === "undefined")
		this.handlers[ev] = [f];
	else
		this.handlers[ev].push(f);
}

tg_connector.enqueue_message = function(msg)
{
	log.paranoid("MESASAAAAAGE: " + msg)

	if(typeof(msg) === "undefined"){
		log.warning("tg_connector got an undefined msg");
		return undefined;
	}
	pmsg = JSON.parse(msg);	
	if(typeof(pmsg) == "undefined"){
		log.warning("tg_connector cant parse msg");
		return undefined;
	}
	if(typeof(pmsg.event) == "undefined"){
		log.warning("tg_connector msg dont has event");
		return undefined;
	}

	if(typeof(pmsg.event.forEach) == "undefined"){
		log.warning("tg_connector msg event is not a list");
		return undefined;
	}
	
	for(var iev in pmsg.event)
	{
		var ev = pmsg.event[iev];
		var o = {};
		o[ev] = pmsg[ev];

		if(typeof(this.handlers[ev]) === "undefined")
			this.queue.push(o);
		else
			this.handlers[ev].forEach(function(e, i, a){
				e(pmsg[ev]);
			});
	}
}

tg_connector.send_message = function(cmd, data)
{
	if(typeof(data) === "undefined")
		data = {};
	var msg = cmd.toString() + " " + JSON.stringify(data);
	this.ws.send(msg);
}


tg_connector.ws.onopen = function()
{
	log.debug("tg_connector opened");
	this.send("initialdata {}");
};

tg_connector.ws.onmessage = function(evt)
{
	var received_msg = evt.data;
	tg_connector.enqueue_message(received_msg);
};

tg_connector.ws.onclose = function()
{
	log.debug("tg_connector closed");
};			
