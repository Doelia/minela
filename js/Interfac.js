function Interfac()
{
	this.create = function()
	{

	}

	this.setLevel = function(level)
	{
		$('#menuDroite .level').html(''+level);
	}

	this.haveInStock = function(type)
	{
		return $('#menuDroite .minesDispos > .mine[type="'+type+'"]:first').size();
	}

	this.addMineDispo = function(mine)
	{
		$('#menuDroite .minesDispos').append(
			$('<img class="mine" type="'+mine.type+'" />')
				.attr('src', mine.getImgSrc())
				.click( function() {
					game.mineSelect = mine;
				})
		)

	}
	this.rmMineDispo = function(mine)
	{
		console.log("rm mine"+mine.type);
		$('#menuDroite .minesDispos > .mine[type="'+mine.type+'"]:first').remove();
	}

	this.rmAllMines = function()
	{
		$('#menuDroite .minesDispos > .mine').remove()
	}

	this.createNMineDispo = function(type, n)
	{
		for (var i = 0; i < n; i++)
			this.addMineDispo(new Element(type));
	}

	this.updatePoints = function()
	{
		$('#points value').html(game.points);
	}

	this.updateCiblesRestantes = function()
	{
		$('#ciblesRestantes value').html(game.ciblesRestantes);
	}

	this.passerAnnonce = function(texte)
	{
		$('#announce')

			.css({
				opacity: '0',
				top: '0px',
				display: 'block'
			})

			.html(texte)

			.animate({
			    opacity: '0.9',
				top: '200px'
			}, 1000 ,'swing')

			.delay(1000)

			.fadeOut(400)
		;
	}
}
