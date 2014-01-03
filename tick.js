var tick = {};

tick.logEntry = function(tick,action) {
	this.tick = tick;
	this.action = action;
};

tick.player = {};
tick.player.ui = {};
tick.player.ui.initiative = undefined;
tick.player.ui.reactionSpeed = undefined;
tick.player.name = undefined;
tick.player.initiative = undefined;
tick.player.reactionSpeed = 5;
tick.player.weaponSpeed = 0;
tick.player.combat = false;
tick.player.logs = [];
tick.player.currentTick = 0;
tick.player.offensivePenalty = 0;
tick.player.defensivePenalty = 0;
tick.player.getInitiative = function() {
	tick.player.initiative = parseInt(prompt("Initiative"));
	tick.player.ui.initiative.innerHTML = "Initiative: " + tick.player.initiative;
	tick.local.obj.initiative = tick.player.initiative;
	localStorage[tick.local.key] = JSON.stringify(tick.local.obj);
};

tick.player.getReactionSpeed = function() {
	tick.player.reactionSpeed = parseInt(prompt("Reaction Speed"));
	tick.player.ui.reactionSpeed.innerHTML = "Reaction Speed: " + tick.player.reactionSpeed;
	tick.local.obj.reactionSpeed = tick.player.reactionSpeed;
	localStorage[tick.local.key] = JSON.stringify(tick.local.obj);
};

tick.player.getWeaponSpeed = function() {
	tick.player.weaponSpeed = parseInt(prompt("Weapon Speed"));
	tick.player.ui.weaponSpeed.innerHTML = "Weapon Speed: " + tick.player.weaponSpeed;
	tick.local.obj.weaponSpeed = tick.player.weaponSpeed;
	localStorage[tick.local.key] = JSON.stringify(tick.local.obj);
};

tick.player.startCombat = function() {
	if(!tick.player.combat) {
		var t = 0 - tick.player.initiative;
		tick.player.currentTick = t;
		tick.player.combat = true;
		var e = new tick.logEntry(t,"Initiative");
		tick.player.logs.push(e);
		tick.player.addLogEntry(e);
		
		tick.local.obj.combat = tick.player.combat;
		tick.local.obj.currentTick = t;
		tick.local.obj.log = [];
		tick.local.obj.log.push(e);
		tick.local.save();
	}
};

tick.player.declareAction = function() {
	var a = tick.player.ui.action.selectedOptions[0].value;
	var action = tick.actions[a];
	var ticks = tick.player.currentTick + eval(action.ticks);
	tick.player.currentTick = ticks;
	var e = new tick.logEntry(ticks,action.name);
	tick.player.addLogEntry(e);

	tick.local.obj.log.push(e);
	tick.local.obj.currentTick = e.ticks;
	tick.local.obj.offensivePenalty = tick.player.offensivePenalty;
	tick.local.obj.defensivePenalty = tick.player.defensivePenalty;
	tick.local.save();
};

tick.player.delayAction = function() {
	var ticks = parseInt(tick.player.currentTick) + 5;
	tick.player.currentTick = ticks;
	var e = new tick.logEntry(ticks,"delayed");
	tick.player.addLogEntry(e);

	tick.local.obj.log.push(e);
	tick.local.obj.currentTick = e.ticks;
	tick.local.obj.offensivePenalty = tick.player.offensivePenalty;
	tick.local.obj.defensivePenalty = tick.player.defensivePenalty;
	tick.local.save();
}

tick.player.addLogEntry = function(log) {
	var d = tick.player.ui.log;

	var row = document.createElement("tr");
	var t = document.createElement("td");
	var a = document.createElement("td");

	var txt = document.createTextNode(log.tick);
	t.appendChild(txt);

	var txt = document.createTextNode(log.action);
	a.appendChild(txt);

	row.appendChild(t);
	row.appendChild(a);

	d.insertBefore(row,d.firstChild);
};

tick.changeMode = function() {
	tick.reset();
	delete localStorage[tick.local.key];
	tick.local.obj = undefined;
	tick.initialize();
};

tick.gmMode = function() {
	var t = document.createTextNode("GM Mode");
	var h = document.createElement("h1");
	h.appendChild(t);
	tick.root.appendChild(h);
	localStorage[tick.local.key] = JSON.stringify({mode: "gm"});

	var button = document.createElement("button");
	var t = document.createTextNode("Change Mode");
	button.onclick = tick.changeMode;
	button.appendChild(t);
	tick.root.appendChild(button);
};

tick.playerMode = function() {
	var t = document.createTextNode("Player Mode");
	var h = document.createElement("h1");
	h.appendChild(t);
	tick.root.appendChild(h);

	tick.player.combat = tick.local.obj.combat;
	tick.player.log = tick.local.obj.log;

	var button = document.createElement("button");
	var t = document.createTextNode("Change Mode");
	button.onclick = tick.changeMode;
	button.appendChild(t);
	tick.root.appendChild(button);

	var button = document.createElement("button");
	var t = document.createTextNode("Initiative");
	button.onclick = tick.player.getInitiative;
	button.appendChild(t);
	tick.root.appendChild(button);

	var button = document.createElement("button");
	var t = document.createTextNode("Reaction Speed");
	button.onclick = tick.player.getReactionSpeed;
	button.appendChild(t);
	tick.root.appendChild(button);

	var button = document.createElement("button");
	var t = document.createTextNode("Weapon Speed");
	button.onclick = tick.player.getWeaponSpeed;
	button.appendChild(t);
	tick.root.appendChild(button);

	var button = document.createElement("button");
	var t = document.createTextNode("Start Combat");
	button.onclick = tick.player.startCombat;
	button.appendChild(t);
	tick.root.appendChild(button);

	var d = document.createElement("div");
	tick.root.appendChild(d);
	var span = document.createElement("span");
	tick.player.initiative = tick.local.obj.initiative ? tick.local.obj.initiative : "";
	var t = document.createTextNode("Initiative: " + tick.player.initiative);
	span.appendChild(t);
	d.appendChild(span);
	tick.player.ui.initiative = span;

	var span = document.createElement("span");
	tick.player.reactionSpeed = tick.local.obj.reactionSpeed ? tick.local.obj.reactionSpeed : 5;
	var t = document.createTextNode("Reaction Speed: " + tick.player.reactionSpeed);
	span.appendChild(t);
	d.appendChild(span);
	tick.player.ui.reactionSpeed = span;

	var span = document.createElement("span");
	tick.player.weaponSpeed = tick.local.obj.weaponSpeed ? tick.local.obj.weaponSpeed : ""
	var t = document.createTextNode("Weapon Speed: " + tick.player.weaponSpeed);
	span.appendChild(t);
	d.appendChild(span);
	tick.player.ui.weaponSpeed = span;

	var d = document.createElement("div");
	tick.root.appendChild(d);
	var span = document.createElement("span");
	tick.player.currentTick = tick.local.obj.currentTick ? tick.local.obj.currentTick : "";
	var t = document.createTextNode("Current Tick: " + tick.player.currentTick);
	span.appendChild(t);
	d.appendChild(span);
	tick.player.ui.currentTick = span;

	var span = document.createElement("span");
	tick.player.offensivePenalty = tick.local.obj.offensivePenalty ? tick.local.obj.offensivePenalty : 0;
	var t = document.createTextNode("Offensive Penalty: " + tick.player.offensivePenalty);
	span.appendChild(t);
	d.appendChild(span);
	tick.player.ui.offensivePenalty = span;

	var span = document.createElement("span");
	tick.player.defensivePenalty = tick.local.obj.defensivePenalty ? tick.local.obj.defensivePenalty : 0;
	var t = document.createTextNode("Defensive Penalty: " + tick.player.defensivePenalty);
	span.appendChild(t);
	d.appendChild(span);
	tick.player.ui.defensivePenalty = span;	

	var d = document.createElement("div");
	tick.root.appendChild(d);
	var span = document.createElement("span");
	var t = document.createTextNode("Action:");
	var input = document.createElement("select");
	for(var a in tick.actions) {
		var action = tick.actions[a];
		var opt = document.createElement("option");
		opt.value = a;
		var txt = document.createTextNode(action.name);
		opt.appendChild(txt);
		input.appendChild(opt);
	}
	span.appendChild(t);
	d.appendChild(span);
	d.appendChild(input);
	tick.player.ui.action = input;

	var button = document.createElement("button");
	var t = document.createTextNode("Declare!");
	button.appendChild(t);
	button.onclick = tick.player.declareAction;
	d.appendChild(button);

	var button = document.createElement("button");
	var t = document.createTextNode("Delay");
	button.appendChild(t);
	button.onclick = tick.player.delayAction;
	d.appendChild(button);

	var d = document.createElement("table");
	tick.root.appendChild(d);
	tick.player.ui.log = d;
	if(tick.player.combat) {
		for(var l in tick.player.log) {
			var log = tick.player.log[l];
			tick.player.addLogEntry(log);
		}
	}
};

tick.mode = null;
tick.modes = {
	"gm": {
		title: "GM",
		func: tick.gmMode
	},
	"pc": {
		title: "Player",
		func: tick.playerMode
	}
};

tick.local = {};
tick.local.key = "kantiatick";
tick.local.obj = undefined;
tick.local.save = function() {
	localStorage[tick.local.key] = JSON.stringify(tick.local.obj);
};

tick.root = null;

tick.initialize = function(root) {	
	tick.root = document.getElementById("root");
	tick.reset();
	tick.local.obj = {};

	if(localStorage[tick.local.key]) {
		var j = localStorage[tick.local.key];
		var obj = JSON.parse(j);
		tick.local.obj = obj;
		tick.modes[obj.mode].func();
	}
	else {
		tick.chooseMode();
	}
};

tick.chooseMode = function() {
	var t = document.createTextNode("Choose Mode");
	var span = document.createElement("span");
	span.appendChild(t);
	tick.root.appendChild(span);
	var select = document.createElement("select");
	for(var m in tick.modes) {
		var option = document.createElement("option");
		option.value = m;
		option.innerHTML = tick.modes[m].title;
		select.appendChild(option);
	}
	tick.root.appendChild(select);
	var button = document.createElement("button");
	var t = document.createTextNode("Set Mode");
	button.tick = {};
	button.tick.func = tick.setMode;
	button.tick.select = select;
	button.setAttribute("onclick","this.tick.func(this.tick.select);");
	button.appendChild(t);
	tick.root.appendChild(button);
};

tick.reset = function() {
	while(tick.root.lastChild) {
		tick.root.removeChild(tick.root.lastChild);
	}
};

tick.setMode = function(select) {
	var m = select.selectedOptions[0].value;
	tick.mode = m;
	tick.reset();
	tick.local.obj.mode = m;
	localStorage[tick.local.key] = JSON.stringify(tick.local.obj);
	tick.modes[m].func();
};