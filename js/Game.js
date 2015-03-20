function Game()
{
	// Variables

	this.level = 0;

	// Composants
	this.plateau;
	this.interfac;

	this.mineSelect = null;
	this.step = 0;
	this.points = 0;
	this.ciblesRestantes;
	this.canStart;
		/*
			1: Préparation
			2: Action
		*/

	this.startGame = function()
	{
		this.nextLevel();
		this.interfac.updatePoints();
	}

	this.nextLevel = function()
	{
		this.level++;
		this.startLevel();
	}

	this.restartLevel = function()
	{
		this.startLevel(this.level);
	}

	this.startLevel = function(level)
	{
		$('#leveln')[0].play();

		this.interfac.passerAnnonce("Niveau "+this.level);
		this.interfac.setLevel(this.level);
		this.ciblesRestantes = getNbrCible(this.level);
		this.interfac.updateCiblesRestantes();
		this.plateau.netoyer();
		setCases(this.level);
		
		this.step = 1;
		this.canStart = false;

		setTimeout(function() {
			game.canStart = true;
			$('#finPreparation')
			.html('Lancer !')
		;
		}, 3000);

		this.donnerMinesDispos();

		// Bouton pret
		$('#finPreparation')
			.html('Placez vos objets...')
		;
	}

	this.startVague = function()
	{
		if (this.step == 1)
		{
			$('#startn')[0].play();

			// Bouton pret
			$('#finPreparation')
				.html('Recommencer');

			this.interfac.passerAnnonce("Phase d'action");
			this.step = 2;
			this.mineSelect = null;

			this.interfac.rmAllMines();

			this.startBoucleDeplacement();

			var pops = getQueue(this.level);
			for (var i in pops)
			{
				//if (i == 0)
				//	pops[i][3] = 1500;

				$('#game')
					.delay(pops[i][3])
					.queue(
						( function(p1, p2, p3) {
							return function() {

								if (game.step == 2)
								{
									game.popAMonster(p1,p2,p3);
									$('#game').dequeue();
								}
								else
									$('#game').clearQueue();
								
							};
						} ) (pops[i][0], pops[i][1], pops[i][2])
					)
				;
			}
						
			
		}
	}

	this.startBoucleDeplacement = function()
	{
		if (this.step == 2)
		{
			this.plateau.deplaceAll();
			setTimeout(function() { game.startBoucleDeplacement() }, 700);
		}
	}

	this.create = function()
	{
		this.plateau = new Plateau();
		this.interfac = new Interfac();

		this.plateau.create();
		this.interfac.create();

		$('#finPreparation')
			.click(function() {
					game.onclickstart();
				})
	}

	this.donnerMinesDispos = function()
	{
		this.interfac.rmAllMines();
		getItems(this.level);		
	}

	this.bouclePopMonster = function()
	{
		if (this.step == 2)
		{
			this.popARandomMonster();
			setTimeout(function() { game.bouclePopMonster() }, 3000);
		}
	}

	this.popARandomMonster = function()
	{
		var orientation = random(1, 1);
		/*
			1 => Gauche vers droite

		*/

		var x = random(0, game.plateau.size);

		this.popAMonster(orientation, x);
		
	}

	this.popAMonster = function(orientation, x, id)
	{
		game.plateau.pointer(orientation, x);
		setTimeout(function() { game.plateau.popMonster(x, 0, id); }, 2000);

	}

	/**
		Quand une cible est tuée
	*/
	this.cibleTuee = function()
	{
		this.addPoints(100);
		this.ciblesRestantes--;
		this.interfac.updateCiblesRestantes();

		if (this.ciblesRestantes == 0)
			this.nextLevel();
	}

	/**
		Pour ajouter des points + mise à jour interface
	*/
	this.addPoints = function(n)
	{
		this.points += n;
		this.interfac.updatePoints();
	}

	this.onclickstart = function()
	{
		if (this.step == 1 && this.canStart)
		{
			this.startVague();
		}
		else if (this.step == 2)
		{
			this.restartLevel();
		}
	}

	this.create();

}

function random(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
