var tick = {};

// Log Handler -------------------------------------------------------------------------------------
tick.logEntry = function(tick,action) {
	this.tick = tick;
	this.action = action;
};

// Player Handler ----------------------------------------------------------------------------------
tick.player = {};
tick.player.ui = {};
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
		tick.player.ui.initiativeTick.setText(t);
		
		tick.local.obj.combat = tick.player.combat;
		tick.local.obj.currentTick = t;
		tick.local.save();
	}
};

tick.player.declareAction = function(a) {
	var action = tick.actions[a];
	var ticks = tick.player.currentTick + eval(action.ticks);
	tick.player.currentTick = ticks;

	
	tick.local.obj.currentTick = tick.player.currentTick;
	tick.local.obj.offensivePenalty = tick.player.offensivePenalty - eval(action.offPenalty);
	tick.local.obj.defensivePenalty = tick.player.defensivePenalty - eval(action.defPenalty);
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

// Local Storage Handler ---------------------------------------------------------------------------
tick.local = {};
tick.local.key = "kantiatick";
tick.local.obj = undefined;

tick.local.save = function() {
	tick.local.obj.initiative = tick.player.initiative;
	tick.local.obj.currentTick = tick.player.currentTick;
	localStorage[tick.local.key] = JSON.stringify(tick.local.obj);
};

tick.local.load = function() {
	tick.local.obj = {};
	if(localStorage[tick.local.key]) {
		tick.local.obj = JSON.parse(localStorage[tick.local.key]);
	}
};

// UI Handler --------------------------------------------------------------------------------------
tick.root = null;

tick.initialize = function(rootId) {	
	tick.root = document.getElementById(rootId);
	tick.local.obj = {};
	tick.local.load();
	tick.createInterface();
};

tick.createInterface = function() {
	var area1 = new tick.ui.div(tick.root,"tick_row");
	var div = new tick.ui.div(area1.node,"tick_div");
	var row1 = new tick.ui.div(div.node,"tick_row");
	var initiativeLabel = new tick.ui.label(row1.node,"tick_label","Initiative:");
	var initiativeInput = new tick.ui.input(row1.node,"tick_input","number",0,{"min":"0"},function() { tick.player.initiative = tick.player.ui.initiative.getValue(); tick.local.save(); });
	tick.player.ui.initiative = initiativeInput;
	var row2 = new tick.ui.div(div.node,"tick_row");
	var reactionLabel = new tick.ui.label(row2.node,"tick_label","Reaction Speed:");
	var reactionInput = new tick.ui.input(row2.node,"tick_input","number",0,{"min":"0"},function() { tick.player.reactionSpeed = tick.player.ui.reactionSpeed.getValue(); });
	tick.player.ui.reactionSpeed = reactionInput;
	var row3 = new tick.ui.div(div.node,"tick_row");
	var weaponLabel = new tick.ui.label(row3.node,"tick_label","Weapon Speed:");
	var weaponInput = new tick.ui.input(row3.node,"tick_input","number",0,{"min":"0"},function() { tick.player.weaponSpeed = tick.player.ui.weaponSpeed.getValue(); });
	tick.player.ui.weaponSpeed = weaponInput;
	var row4 = new tick.ui.div(div.node,"tick_row");
	var startCombat = new tick.ui.button(row4.node,"tick_startCombat","Start Combat",function() { tick.player.startCombat(); });

	var div = new tick.ui.div(area1.node,"tick_div");
	var offensivePenalty = new tick.ui.span(div.node,"tick_penalty tick_offPenalty","0");
	var offensiveLabel = new tick.ui.span(div.node,"tick_penalty_label","Offense Pen.");
	var defensivePenalty = new tick.ui.span(div.node,"tick_penalty tick_defPenalty","0");
	var defensiveLabel = new tick.ui.span(div.node,"tick_penalty_label","Defense Pen.");

	var div = new tick.ui.div(area1.node,"tick_div");
	var actionTickLabel = new tick.ui.span(div.node,"tick_actionName","Next Action Tick");
	var nextActionTick = new tick.ui.span(div.node,"tick_actionTick","0");
	var nextActionName = new tick.ui.span(div.node,"tick_actionName","Ready");
	tick.player.ui.initiativeTick = nextActionTick;

	var div = new tick.ui.div(tick.root,"tick_row");
	for(var a in tick.actions) {
		var button = new tick.ui.button(div.node,"tick_squareBig",tick.actions[a].name,function() { tick.player.declareAction(a); });
	}
}

tick.createInterfaceOld = function() {
	tick.player.combat = tick.local.obj.combat;
	tick.player.log = tick.local.obj.log;

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