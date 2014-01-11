tick.action = function(name,ticks) {
	this.name = name;
	this.ticks = ticks;
};

tick.actions = {};
tick.actions.standardMove = new tick.action("Standard Movement","tick.player.reactionSpeed");
tick.actions.cautiousMove = new tick.action("Cautious Movement","tick.player.reactionSpeed");
tick.actions.cautiousMoveCont = new tick.action("Continue Cautious Movement","Math.floor(tick.player.reactionSpeed/2);");
tick.actions.engageAttack = new tick.action("Engage and Attack","tick.player.reactionSpeed + tick.player.weaponSpeed");
tick.actions.engageWait = new tick.action("Engage and Wait","tick.player.reactionSpeed + 2;");
tick.actions.charge = new tick.action("Charge","tick.player.reactionSpeed + Math.ceil(tick.player.weaponSpeed/2);");
tick.actions.offensiveStance = new tick.action("Offensive Stance","tick.player.reactionSpeed - 1;");
tick.actions.defensiveStance = new tick.action("Defensive Stance","tick.player.reactionSpeed + Math.ceil(tick.player.weaponSpeed/2);");
tick.actions.attack = new tick.action("Attack","tick.player.weaponSpeed;");
tick.actions.fire = new tick.action("Fire","tick.player.weaponSpeed;");
tick.actions.cast = new tick.action("Cast","tick.player.weaponSpeed;");
tick.actions.refocus = new tick.action("Refocus","parseInt(tick.player.reactionSpeed);");
tick.actions.parry = new tick.action("Parry","tick.player.reactionSpeed + tick.player.weaponSpeed;");
tick.actions.sidestep = new tick.action("Sidestep","tick.player.reactionSpeed + 2;");
tick.actions.escape = new tick.action("Escape","tick.player.reactionSpeed + 2;");
tick.actions.disengage = new tick.action("Disengage","tick.player.reactionSpeed;");
tick.actions.turndisengage = new tick.action("Turn and Disengage","tick.player.reactionSpeed;");
tick.actions.escapeinterrupt = new tick.action("Escape Interrupt","tick.player.reactionSpeed + 2;");