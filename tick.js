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
tick.player.offensivePenalty = 10;
tick.player.defensivePenalty = 10;

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

tick.player.declareAction = function(action) {
	var ticks = tick.player.currentTick + eval(action.ticks);
	tick.player.currentTick = ticks;
	tick.player.ui.initiativeTick.setText(ticks);
	tick.player.ui.nextActionName.setText(action.name);

	tick.player.offensivePenalty = tick.player.offensivePenalty - eval(action.offensivePenalty);
	tick.player.defensivePenalty = tick.player.defensivePenalty - eval(action.defensivePenalty);
	tick.player.ui.offensivePenalty.setText(tick.player.offensivePenalty);
	tick.player.ui.defensivePenalty.setText(tick.player.defensivePenalty);
	
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

// Local Storage Handler ---------------------------------------------------------------------------
tick.local = {};
tick.local.key = "kantiatick";
tick.local.obj = undefined;

tick.local.save = function() {
	tick.local.obj.initiative = tick.player.initiative;
	tick.local.obj.currentTick = tick.player.currentTick;
	tick.local.obj.defensivePenalty = tick.player.defensivePenalty;
	tick.local.obj.offensivePenalty = tick.player.offensivePenalty;
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
	var reactionInput = new tick.ui.input(row2.node,"tick_input","number",0,{"min":"0"},function() { tick.player.reactionSpeed = parseInt(tick.player.ui.reactionSpeed.getValue()); });
	tick.player.ui.reactionSpeed = reactionInput;
	var row3 = new tick.ui.div(div.node,"tick_row");
	var weaponLabel = new tick.ui.label(row3.node,"tick_label","Weapon Speed:");
	var weaponInput = new tick.ui.input(row3.node,"tick_input","number",0,{"min":"0"},function() { tick.player.weaponSpeed = parseInt(tick.player.ui.weaponSpeed.getValue()); });
	tick.player.ui.weaponSpeed = weaponInput;
	var row4 = new tick.ui.div(div.node,"tick_row");
	var startCombat = new tick.ui.button(row4.node,"tick_startCombat","Start Combat",tick.player.startCombat);

	var div = new tick.ui.div(area1.node,"tick_div");
	var offensivePenalty = new tick.ui.span(div.node,"tick_penalty tick_offPenalty","0");
	var offensiveLabel = new tick.ui.span(div.node,"tick_penalty_label","Offense Pen.");
	var defensivePenalty = new tick.ui.span(div.node,"tick_penalty tick_defPenalty","0");
	var defensiveLabel = new tick.ui.span(div.node,"tick_penalty_label","Defense Pen.");
	tick.player.ui.offensivePenalty = offensivePenalty;
	tick.player.ui.defensivePenalty = defensivePenalty;

	var div = new tick.ui.div(area1.node,"tick_div");
	var actionTickLabel = new tick.ui.span(div.node,"tick_actionName","Next Action Tick");
	var nextActionTick = new tick.ui.span(div.node,"tick_actionTick","0");
	var nextActionName = new tick.ui.span(div.node,"tick_actionName","Select An Action");
	tick.player.ui.initiativeTick = nextActionTick;
	tick.player.ui.nextActionName = nextActionName;

	var div = new tick.ui.div(tick.root,"tick_row");
	for(var a in tick.actions) {
		var action = tick.actions[a];
		var button = new tick.ui.button(div.node,"tick_squareBig",tick.actions[a].name,tick.player.declareAction.bind(tick.player,action));
	}
};