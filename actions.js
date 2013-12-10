tick.action = function(name,ticks) {
	this.name = name;
	this.ticks = ticks;
};

tick.actions = {};
tick.actions.standardMove = new tick.action("Standard Movement","tick.player.reactionSpeed");
tick.actions.cautiousMove = new tick.action("Cautious Movement","tick.player.reactionSpeed");
tick.actions.cautiousMoveCont = new tick.action("Cautious Movement, Continue","Math.floor(tick.player.reactionSpeed/2);");
tick.actions.engageAttack = new tick.action("Engage and Attack","tick.player.reactionSpeed + tick.player.weaponSpeed");
tick.actions.charge = new tick.action("Charging - Reaction Speed + 1/2 Weapon Speed","tick.player.reactionSpeed + Math.ceil(tick.player.weaponSpeed/2);");
tick.actions.engageWait = new tick.action("Engage and Wait - Reaction Speed + 2","tick.player.reactionSpeed + 2;");
tick.actions.offensiveStance = new tick.action("Offensive Stance - Reaction Speed + 2","tick.player.reactionSpeed +2;");