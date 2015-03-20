function Case(p_x, p_y)
{
	this.x = p_x;
	this.y = p_y;

	this.element = null;
	this.placable = false;

	this.create = function()
	{
		var me = this;
		$('<td id="case_'+this.x+this.y+'"></td>')
			.appendTo('#tr_'+this.x)
			.click(function () { (
				function(el) { el.onclickCase() })(me)
			})
		;
	}

	this.clearCase = function()
	{
		$('#case_'+this.x+this.y).html('');
		this.element = null;
	}

	this.addElement = function(template)
	{
		if (template != null)
		{
			//console.log('add element {'+template.type+'} @ '+this.x+', '+this.y);
			this.element = template;
			this.element.casePresente = this;
			$('#case_'+this.x+this.y)
				.html(
					$('<img class="mine" />')
					.attr('src', this.element.getImgSrc())
				)
			;
		}
		else
		{
			//console.log("Add element undefined");
		}
	}

	this.onclickCase = function()
	{
		if (game.step == 1)
		{
			if (this.element == null)
			{
				if (game.mineSelect != null && this.placable)
				{
					if (!this.isBord() || game.mineSelect.bordable)
					{
						this.addElement(game.mineSelect);
						game.interfac.rmMineDispo(this.element);
						
						if (!game.interfac.haveInStock(game.mineSelect.type))
							game.mineSelect = null;
						
					}
					else
					{
						alert("Impossible de placer une mine sur un bord");
					}
					
				}	
			}
			else
			{
				game.interfac.addMineDispo(this.element);
				this.clearCase();
			}
		}

		if (game.step == 2)
		{
			if (this.element != null && this.element.activable)
			{
				this.element.casePresente = this;
				this.action();
			}
		}
	}

	this.isBord = function()
	{
		return (
			this.x == 0 ||
			this.y == 0 ||
			this.x == (game.plateau.size-1) ||
			this.y == (game.plateau.size-1)
		);
	}

	this.action = function()
	{
		var fonction =
		( function(p1) {
			return function() {

				if (p1.element != null)
				{
					p1.element.casePresente = p1;
					p1.element.action();
				}
			};
		} ) (this);
		
		if (!game.plateau.moveInProgress)
		{
			fonction();
		}
		else
		{
			game.plateau.actionList.push(fonction);
		}
	}

	this.actionVoisins = function()
	{
		var cases = new Array(
			new Array(this.x+1, this.y),
			new Array(this.x-1, this.y),
			new Array(this.x, this.y+1),
			new Array(this.x, this.y-1)
		);

		for (var i in cases)
		{
			if (game.plateau.coordValide(cases[i][0], cases[i][1]))
			{
				game.plateau.getCase(cases[i][0],cases[i][1]).action();
			}
				
		}

	}

	this.actionLineSup = function()
	{
		var cases = new Array(
			new Array(this.x-1, this.y-1),
			new Array(this.x-1, this.y),
			new Array(this.x-1, this.y+1)
		);

		for (var i in cases)
		{
			if (game.plateau.coordValide(cases[i][0], cases[i][1]))
			{
				game.plateau.getCase(cases[i][0],cases[i][1]).action();
			}
				
		}
	}

	this.create();

	this.setPlacable = function()
	{
		$('#case_'+this.x+this.y)
				.css({
					'backgroundColor': 'rgba(255,131,0, 0)'
				})
		;

		this.placable = true;
	}

	this.setUnplacable = function()
	{
		$('#case_'+this.x+this.y)
				.css({
					'backgroundColor': 'rgba(0,0,0, 0.1)'
				})
		;

		this.placable = false;
	}


	this.playAnimation = function(type)
	{
		if (type == 1 && game.step == 2)
		{
			var css = $('#case_'+this.x+this.y).css('backgroundColor');

			$('#case_'+this.x+this.y)
				.css({
					'backgroundColor': css
				})
				.animate({
				    'backgroundColor': 'rgba(255,131,0, 1)'
				}, 200 ,'swing')
				.animate({
				  'backgroundColor': css
				}, 400 ,'swing')
			;
		}
		else if (type == 2)
		{
			this.playAnimation(1);

			var i, j;

			i = this.x+1;
			j = this.y;
			if (game.plateau.coordValide(i, j))
				game.plateau.getCase(i,j).playAnimation(1);

			i = this.x-1;
			j = this.y;
			if (game.plateau.coordValide(i, j))
				game.plateau.getCase(i,j).playAnimation(1);

			i = this.x;
			j = this.y+1;
			if (game.plateau.coordValide(i, j))
				game.plateau.getCase(i,j).playAnimation(1);

			i = this.x;
			j = this.y-1;
			if (game.plateau.coordValide(i, j))
				game.plateau.getCase(i,j).playAnimation(1);
		}
		else if (type == 3)
		{

			var i, j;

			i = this.x-1;
			j = this.y;
			if (game.plateau.coordValide(i, j))
				game.plateau.getCase(i,j).playAnimation(1);

			i = this.x-1;
			j = this.y-1;
			if (game.plateau.coordValide(i, j))
				game.plateau.getCase(i,j).playAnimation(1);

			i = this.x-1;
			j = this.y+1;
			if (game.plateau.coordValide(i, j))
				game.plateau.getCase(i,j).playAnimation(1);
		}
	}
}

