//=============================================================================
// Shifumi.js
//=============================================================================

/*:
* @plugindesc Rock-Paper-Scissors Battle System 
* @author Shiggy
*
*
*
*
* @help 
* Just put <rock> , <paper> or <scissors> in an item or skill notebox .
* If there is a typo or you forgot something, it will default to paper and a message will be shown in the console.
* --------------------------------------------------------------------------------
* Terms of Use
* --------------------------------------------------------------------------------
* 
*
*
* --------------------------------------------------------------------------------

*/
(function() {

	BattleManager.makeActionOrders = function() {
		player = $gameParty.members()[0];
		enemy = $gameTroop.members()[0];
		this._logWindow.displayShifumiBattle(player,enemy) 
		a = player.shifumi();
		b = enemy.shifumi();
		if (a == 3 && b == 3) {
			x = 4;
			battlers = [player, enemy];
		} else if (a == 3) {
			x = 2;
			battlers = [player];
		} else if (b == 3) {
			battlers = [enemy];
			x = 1;
		} else {
			x = a-b
			if (x < 0) {
				x = 3 + x;
			}
			console.log(x)		
			switch (x) {
				case 0:
					battlers = [];
					break;
				case 1:
					battlers = [enemy];
					break;
				case 2:
					battlers = [player];
					break;
			}
		}
		this._logWindow.displayShifumiVictor(player,enemy,x)
		this._actionBattlers = battlers;
	};
	
	Game_Battler.prototype.shifumi = function() {
		note = this.currentAction().item().note
		if ( /<paper>/.test(note) ) {
			return 0;
		} else if ( /<rock>/.test(note) ) {
		    return 1;
		} else if ( /<scissors>/.test(note) ) {
			return 2;
		} else if ( /<all>/.test(note) ) {
			return 3;
		} else {
			console.log("ERROR : default to paper")
			return 0;
		}
	};
	
	Window_BattleLog.prototype.displayShifumiBattle = function(player, enemy) {
		var numMethods = this._methods.length;
		var string = "";
		var item = player.currentAction().item()
		
		
		if (DataManager.isSkill(item)) {
			if (item.message1) {
				string += player.name() + item.message1.format(item.name);
			}
			if (item.message2) {
				string += item.message2.format(item.name);
			}
		} else {
			string += TextManager.useItem.format(player.name(), item.name);
		}
		
		string += " while "
		
		item = enemy.currentAction().item()
		if (DataManager.isSkill(item)) {
			if (item.message1) {
				string += enemy.name() + item.message1.format(item.name);
			}
			if (item.message2) {
				string += item.message2.format(item.name);
			}
		} else {
			string += TextManager.useItem.format(enemy.name(), item.name);
		}
		
		this.push('addText', string);
		this.push('wait');

	};

	Window_BattleLog.prototype.displayShifumiVictor = function(player, enemy,x) {
		var numMethods = this._methods.length;
		var victor = "";
		var item = "";
		
		switch (x) {
			case 0:
				victor = "Both attacks"
				item = "each other"
				break;
			case 1:
				victor = enemy.name()
				item = player.currentAction().item().name
				break;
			case 2:
				victor = player.name()
				item = enemy.currentAction().item().name
				break;
		}
		console.log(victor)
		console.log(item)
		if (x == 4)
			this.push('addText', "Both attack went through.");
		else
			this.push('addText', victor + " negated "+ item + ".");
		this.push('wait');
		this.push('wait');
		this.push('clear');
	};

})();