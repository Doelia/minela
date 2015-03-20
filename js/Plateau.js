function Plateau()
{
	// Constantes
	this.size = 11;
	this.matrice = new Array();
	this.moveInProgress = false;

	this.create = function()
	{
		$('<table id="plato"></table>').
		appendTo('#game');

		for (var x=0; x < this.size; x++)
		{
			this.matrice[x] = new Array();

			$('<tr id="tr_'+x+'"></tr>').
			appendTo('#plato');

			for (var y=0; y < this.size; y++)
			{
				this.matrice[x][y] = new Case(x, y);
			}
		}
	}

	this.coordValide = function(x, y)
	{
		return (
			x < game.plateau.size &&
			x >= 0 &&
			y < game.plateau.size &&
			y >= 0);
	}


	this.getCase = function(x, y)
	{
		if (!this.coordValide(x, y))
			return null;

		return this.matrice[x][y];
	}

	this.pointer = function(orientation, n)
	{
		var nameClass;
		switch (orientation)
		{
			case 1:
				nameClass = 'Left';
				break;
			case 2:
				nameClass = 'Right';
				break;
			case 3:
				nameClass = 'Top';
				break;
		}
		$('<div class="pointeur'+nameClass+' pointeur" />')
			.css('top', (n*51+19)+'px')
			.appendTo('#game')
			.show(100)
			.hide(100)
			.show(100)
			.hide(100)
			.show(100)
			.delay(2000)
			.fadeOut(400)
		;
	}

	this.popMonster = function(x, y, id)
	{
		if (game.step == 2)
		{
			if (!this.coordValide(x, y))
			{
				alert("Coordonné "+x+", "+y+" invalide pour pop un monstre");
			}
			
			if (this.getCase(x, y).element == null)
			{
				this.getCase(x, y).addElement(new Element(id));
			}
		}
	}

	this.actionList;

	this.deplaceAll = function()
	{
		var aDeplacer = new Array();
		this.actionList = new Array();

		this.moveInProgress = true;

		for (var x=0; x < this.size; x++)
		{
			for (var y=0; y < this.size; y++)
			{
				if (this.getCase(x, y).element != null)
				{
					aDeplacer.push(this.getCase(x, y).element);
				}
			}
		}

		for (var i in aDeplacer)
		{
			aDeplacer[i].deplacer();
		}

		this.moveInProgress = false;

		for (var i in this.actionList)
		{
			this.actionList[i]();
		}
	}

	this.moveContent = function(caseFrom, caseTo)
	{
		//console.log("move content from "+caseFrom.x+","+caseFrom.y+" => "+caseTo.x+","+caseTo.y+")");
		caseTo.addElement(caseFrom.element);

		if (caseFrom.element.direction <= 2)
			var attr = "left";
		else
			var attr = "top";

		var signe;
		signe = (caseFrom.element.direction % 2)?'':'-';

		$('#case_'+caseFrom.x+caseFrom.y+' > img')
			.animate({
				'left': signe+'50px'
			}, 400 ,'swing',
			function() {
				caseFrom.clearCase();
			});

		signe = (caseFrom.element.direction % 2)?'-':'';
		$('#case_'+caseTo.x+caseTo.y+' > img')
			.css('left', signe+'50px')
			.animate({
				'left': '0px'
			}, 400 ,'swing');

	}

	this.netoyer = function()
	{
		for (var x=0; x < this.size; x++)
		{
			for (var y=0; y < this.size; y++)
			{
				if (this.getCase(x, y).element != null)
				{
					this.getCase(x, y).clearCase();
				}
				this.getCase(x, y).setPlacable();
			}
		}
	}

}