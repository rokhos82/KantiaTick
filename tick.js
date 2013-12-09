var tick = {};

tick.player = {};
tick.player.ui = {};
tick.player.ui.initiative = undefined;
tick.player.ui.reactionSpeed = undefined;
tick.player.name = undefined;
tick.player.initiative = undefined;
tick.player.reactionSpeed = 5;
tick.player.getInitiative = function() {
	tick.player.initiative = prompt("Initiative");
	tick.player.ui.initiative.innerHTML = "Initiative: " + tick.player.initiative;
	tick.local.obj.initiative = tick.player.initiative;
	localStorage[tick.local.key] = JSON.stringify(tick.local.obj);
};
tick.player.getReactionSpeed = function() {
	tick.player.reactionSpeed = prompt("Reaction Speed");
	tick.player.ui.reactionSpeed.innerHTML = "Reaction Speed: " + tick.player.reactionSpeed;
	tick.local.obj.reactionSpeed = tick.player.reactionSpeed;
	localStorage[tick.local.key] = JSON.stringify(tick.local.obj);
}

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