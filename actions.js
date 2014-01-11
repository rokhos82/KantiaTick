tick.action = function(name,ticks,off,def) {
	this.name = name;
	this.ticks = ticks;
	this.offensivePenalty = off;
	this.defensivePenalty = def;
};

tick.actions = {};
tick.actions.standardMove = new tick.action("Standard Movement","tick.player.reactionSpeed","0","0");
tick.actions.cautiousMove = new tick.action("Cautious Movement","tick.player.reactionSpeed","0","0");
tick.actions.cautiousMoveCont = new tick.action("Continue Cautious Movement","Math.floor(tick.player.reactionSpeed/2);","0","0");
tick.actions.engageAttack = new tick.action("Engage and Attack","tick.player.reactionSpeed + tick.player.weaponSpeed","10","0");
tick.actions.engageWait = new tick.action("Engage and Wait","tick.player.reactionSpeed + 2;","0","0");
tick.actions.charge = new tick.action("Charge","tick.player.reactionSpeed + Math.ceil(tick.player.weaponSpeed/2);","10","0");
tick.actions.offensiveStance = new tick.action("Offensive Stance","tick.player.reactionSpeed - 1;","0","0");
tick.actions.defensiveStance = new tick.action("Defensive Stance","tick.player.reactionSpeed + Math.ceil(tick.player.weaponSpeed/2);","0","0");
tick.actions.attack = new tick.action("Attack","tick.player.weaponSpeed;","10","0");
tick.actions.fire = new tick.action("Fire","tick.player.weaponSpeed;","10","0");
tick.actions.cast = new tick.action("Cast","tick.player.weaponSpeed;","10","0");
tick.actions.refocus = new tick.action("Refocus","parseInt(tick.player.reactionSpeed);","-tick.player.offensivePenalty","-tick.player.defensivePenalty");
tick.actions.parry = new tick.action("Parry","tick.player.reactionSpeed + tick.player.weaponSpeed;","0","10");
tick.actions.sidestep = new tick.action("Sidestep","tick.player.reactionSpeed + 2;","0","0");
tick.actions.escape = new tick.action("Escape","tick.player.reactionSpeed + 2;","0","0");
tick.actions.disengage = new tick.action("Disengage","tick.player.reactionSpeed;","0","0");
tick.actions.turndisengage = new tick.action("Turn and Disengage","tick.player.reactionSpeed;","0","0");
tick.actions.escapeinterrupt = new tick.action("Escape Interrupt","tick.player.reactionSpeed + 2;","0","0");