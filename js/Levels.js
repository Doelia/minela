function getQueue(level)
{
	var pops = new Array();

	/*
		1. orientation
		2. nRangee
		3. id
		4. sleep avant lancement
	*/

	switch (level)
	{
		case 8:
			pops.push(new Array(1, 2, 3, 0));
			pops.push(new Array(1, 3, 3, 3500));
			pops.push(new Array(1, 3, 3, 3500));
			break;

		case 5:
			pops.push(new Array(1, 4, 3, 0));
			pops.push(new Array(1, 6, 3, 3500));
			break;

		case 6:
			pops.push(new Array(1, 0, 3, 0));
			pops.push(new Array(1, 2, 3, 0));
			pops.push(new Array(1, 6, 3, 0));
			pops.push(new Array(1, 10, 3, 0));
			pops.push(new Array(1, 4, 3, 1400));
			pops.push(new Array(1, 8, 3, 0));
			break;

		case 7:
			pops.push(new Array(1, 4, 3, 0));
			pops.push(new Array(1, 6, 3, 2100));
			break;
		case 1:
			pops.push(new Array(1, random(0,1), 3, 0));
			pops.push(new Array(1, random(3,4), 3, 2000));
			pops.push(new Array(1, random(5,6), 3, 2000));
			pops.push(new Array(1, random(7,8), 3, 2000));
			pops.push(new Array(1, random(9,10), 3, 2000));
			break;
		case 2:
			pops.push(new Array(1, 3, 3, 0));
			pops.push(new Array(1, 4, 3, 0));
			pops.push(new Array(1, 5, 3, 0));
			pops.push(new Array(1, 6, 3, 0));
			pops.push(new Array(1, 7, 3, 0));
			break;
		case 3:
			for (var i = 0; i < 8; i++)
			{
				pops.push(new Array(1, 5, 3, 2000));
			}
			break;
		case 4:
			pops.push(new Array(1, random(2,6), 3, 0));
			break;
	}

	return pops;
}

function getItems(level)
{
	switch (level)
	{
		case 8:
			game.interfac.createNMineDispo(7, 3);
			game.interfac.createNMineDispo(6, 2);
			game.interfac.createNMineDispo(2, 1);
			break;

		case 5:
			game.interfac.createNMineDispo(7, 1);
			game.interfac.createNMineDispo(1, 1);
			break;
		case 6:
			game.interfac.createNMineDispo(1, 5);
			break;
		case 7:
			game.interfac.createNMineDispo(1, 1);
			game.interfac.createNMineDispo(6, 1);
			game.interfac.createNMineDispo(7, 1);
			break;
		case 1:
			game.interfac.createNMineDispo(1, 5);
			break;
		case 2:
			game.interfac.createNMineDispo(1, 3);
			break;
		case 3:
			game.interfac.createNMineDispo(1, 8);
			break;
		case 4:
			game.interfac.createNMineDispo(6, 7);
			game.interfac.createNMineDispo(1, 1);
			break;
	}
}

function getNbrCible(level)
{
	switch (level)
	{
		case 5:
			return 2;
		case 6:
			return 6;
		case 1:
			return 5;
		case 2:
			return 5;
		case 3:
			return 8;
		case 4:
			return 1;
		case 7:
			return 2;
		case 8:
			return 3;
		default:
			return level * 2;
	}
}

function setCases(level)
{
	for (var i = 0; i < game.plateau.size; i++)
	{
		game.plateau.getCase(0,i).setUnplacable();
		game.plateau.getCase(i,0).setUnplacable();
		game.plateau.getCase(i,10).setUnplacable();
		game.plateau.getCase(10,i).setUnplacable();
	}

	switch (level)
	{
		case 5:
			for (var i = 0; i < game.plateau.size; i++)
			for (var j = 0; j < game.plateau.size; j++)
				game.plateau.getCase(i,j).setUnplacable();

			for (var i = 1; i < game.plateau.size-1; i++)
			{
				game.plateau.getCase(4,i).setPlacable();
				game.plateau.getCase(5,i).setPlacable();
				game.plateau.getCase(6,i).setPlacable();
			}
		break;


		case 6:
			for (var i = 0; i < game.plateau.size; i += 2)
			for (var j = 0; j < game.plateau.size; j++)
				game.plateau.getCase(i,j).setUnplacable();

			for (var i = 1; i < game.plateau.size - 1; i += 2)
			for (var j = 0; j < 5; j++)
				game.plateau.getCase(i,j).setUnplacable();
			break;

		case 7:
			var i;
			i = 3;
			for (var j = 0; j < game.plateau.size; j++)
				game.plateau.getCase(i,j).setUnplacable();

			i = 5;
			for (var j = 0; j < game.plateau.size; j++)
				game.plateau.getCase(i,j).setUnplacable();

			i = 4;
			for (var j = 5; j < game.plateau.size; j++)
				game.plateau.getCase(i,j).setUnplacable();

			game.plateau.getCase(5,5).setPlacable();


		break;

		case 4:
			for (var i = 1; i < game.plateau.size; i++)
				for (var j = i; j < game.plateau.size; j++)
				{
					game.plateau.getCase(i,j).setUnplacable();
				}
		break;
	}
}

