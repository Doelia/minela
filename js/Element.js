function Element(type, direction)
{
	this.type = type;

	this.activable;
	this.deplacement;
	this.direction;
	this.activeOnMonster;

	// sété
	this.casePresente;


	if (direction)
		this.direction = direction;

	switch (this.type)
	{
		case 1: // Alumette
			this.activable = true;
			this.deplacement = 0;
			this.activeOnMonster = true;
			break;
		case 2: // Alumette v2
			this.activable = true;
			this.deplacement = 0;
			this.activeOnMonster = true;
			break;
		case 3:
			this.activable = false;
			this.deplacement = 1;
			this.activeOnMonster = false;
			this.direction = 1;
			break;
		case 4:
			this.activable = false;
			this.deplacement = 1;
			this.activeOnMonster = false;
			this.direction = 2;
			break;
		case 6:
		case 7:
		case 8:
		case 9:
			this.activable = true;
			this.deplacement = 0;
			this.activeOnMonster = true;
			break;
	}

	this.getImgSrc = function()
	{
		return "img/mine_"+this.type+".png";
	}

	this.action = function(caseDeclancheuse)
	{
		var string = "";
		string += "action{"+this.type+"} @"+this.casePresente.x+","+this.casePresente.y;

		if (caseDeclancheuse)
			string += "case déclancheuse: "+caseDeclancheuse.x+", "+caseDeclancheuse.y;

		console.log(string);

		switch (this.type)
		{
			case 1: // alumette
				$('#boom')[0].play();

				this.casePresente.clearCase();
				this.casePresente.playAnimation(2);

				if (caseDeclancheuse)
					console.log("R: "+caseDeclancheuse.x+", "+caseDeclancheuse.y);

				if (caseDeclancheuse != null)
					caseDeclancheuse.action();

				this.casePresente.actionVoisins();

				game.addPoints(10);
				break;
			case 2:

				$('#boom')[0].play();

				this.casePresente.clearCase();
				this.casePresente.playAnimation(3);

				if (caseDeclancheuse != null)
					caseDeclancheuse.action();

				this.casePresente.actionLineSup();

				game.addPoints(50);
				break;

			case 3: // coci vers la droite
			case 4: // coci vers la gauche
				this.casePresente.clearCase();
				game.cibleTuee();
				break;
			case 6: // Fleche bas
				if (caseDeclancheuse != null && caseDeclancheuse.element != null)
					caseDeclancheuse.element.deplaceToCoord(this.casePresente.x+1, this.casePresente.y);
				break;
			case 7: // Fleche droite
				if (caseDeclancheuse != null && caseDeclancheuse.element != null)
				{
					caseDeclancheuse.clearCase();
					caseDeclancheuse.addElement(new Element(4));
				}
				break;
		}

		
		
	}

	this.deplaceToCoord = function(newX, newY)
	{
		if (game.plateau.getCase(newX, newY).element == null)
		{
			game.plateau.moveContent(
				this.casePresente,
				game.plateau.getCase(newX, newY)
			);
		}
		else
		{
			if (game.plateau.getCase(newX, newY).element.activeOnMonster)
			{
				game.plateau.getCase(newX, newY).element.casePresente = game.plateau.getCase(newX, newY);
				game.plateau.getCase(newX, newY).element.action(this.casePresente);
			}
		}
	}

	this.deplacer = function()
	{
		//console.log("deplacer {"+this.type+"}");
		var newX = this.casePresente.x;
		var newY = this.casePresente.y;

		if (this.deplacement == 1)
		{
			switch (this.direction)
			{
				case 1: newY++; break;
				case 2: newY--; break;
			}

			if (
				game.plateau.coordValide(newX, newY)
			)
			{
				this.deplaceToCoord(newX, newY);
			}
			else
			{
				this.casePresente.clearCase();
			}
		}
	}
}

