tick.action = function(name,ticks,type) {
	this.name = name;
	this.ticks = ticks;
	this.type = type;
};

tick.actions = {};
tick.actions.standardMove = new tick.action("Standard Movement - Reaction Speed","tick.player.reactionSpeed","movement");
tick.actions.cautiousMove = new tick.action("Cautious Movement - Reaction Speed","tick.player.reactionSpeed","movement");
tick.actions.cautiousMoveCont = new tick.action("Cautious Movement, Continue - 1/2 Reaction Speed","Math.floor(tick.player.reactionSpeed/2);",,"movement");
tick.actions.engageAttack = new tick.action("Engage and Attack - Reaction Speed + Weapon Speed","tick.player.reactionSpeed + tick.player.weaponSpeed","attack");
tick.actions.charge = new tick.action("Charging - Reaction Speed + 1/2 Weapon Speed","tick.player.reactionSpeed + Math.ceil(tick.player.weaponSpeed/2);","attack");
tick.actions.engageWait = new tick.action("Engage and Wait - Reaction Speed + 2","tick.player.reactionSpeed + 2;","neutral");
tick.actions.offensiveStance = new tick.action("Offensive Stance - Reaction Speed - 1","tick.player.reactionSpeed - 1;","neutral");
tick.actions.defensiveStance = new tick.action("Defensive Stance - Reaction Speed + 1/2 Weapon Speed","tick.player.reactionSpeed + Math.ceil(tick.player.weaponSpeed/2);","neutral");
tick.actions.attack = new tick.action("Attack- Weapon Speed","tick.player.weaponSpeed;","attack");
tick.actions.fire = new tick.action("Fire - Weapon Speed","tick.player.weaponSpeed;","attack");
tick.actions.cast = new tick.action("Cast - Weapon Speed","tick.player.weaponSpeed;","attack");
tick.actions.refocus = new tick.action("Refocus - Reaction Speed","tick.player.reactionSpeed;","neutral");
tick.actions.parry = new tick.action("Parry - Reaction Speed + Weapon Speed","tick.player.reactionSpeed + tick.player.weaponSpeed;");
tick.actions.sidestep = new tick.action("Sidestep - Reaction Speed + 2","tick.player.reactionSpeed + 2;");
tick.actions.escape = new tick.action("Escape - Reaction Speed + 2","tick.player.reactionSpeed + 2;");
tick.actions.disengage = new tick.action("Disengage - Reaction Speed","tick.player.reactionSpeed;");
tick.actions.turndisengage = new tick.action("Turn and Disengage - Reaction Speed","tick.player.reactionSpeed;");
tick.actions.escapeinterrupt = new tick.action("Escape Interrupt- Reaction Speend + 2","tick.player.reactionSpeed + 2;");