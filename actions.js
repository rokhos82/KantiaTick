tick.action = function(name,ticks) {
	this.name = name;
	this.ticks = ticks;
};

tick.actions = {};
tick.actions.standardMove = new tick.action("Standard Movement","return tick.player.reactionSpeed");
tick.actions.cautiousMove = new tick.action("Cautious Movement","return tick.player.reactionSpeed");
tick.actions.cautiousMoveCont = new tick.action("Cautious Movement, Continue","return Math.floor(tick.player.reactionSpeed/2);");
tick.actions.engageAttack = new tick.action("Engage and Attack","return tick.player.reactionSpeed + tick.player.weaponSpeed");
tick.actions.charge = new tick.action("Charging","return tick.player.reactionSpeed + Math.ceil(tick.player.weaponSpeed/2);");
tick.actions.engageWait = new tick.action("Engage and Wait","return tick.player.reactionSpeed + 2;");