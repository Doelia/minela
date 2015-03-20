<html>
<head>
	<title>Minelia</title>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script type="text/javascript" src="http://www.bitstorm.org/jquery/color-animation/jquery.animate-colors-min.js"></script>

	
	<script type="text/javascript" src="js/main.js"></script>

	<script type="text/javascript" src="js/Game.js"></script>
	<script type="text/javascript" src="js/Plateau.js"></script>
	<script type="text/javascript" src="js/Interfac.js"></script>
	<script type="text/javascript" src="js/Element.js"></script>
	<script type="text/javascript" src="js/Case.js"></script>
	<script type="text/javascript" src="js/Levels.js"></script>

	<link href="css/style.css" media="screen" rel="stylesheet" type="text/css">
	<link href="css/plato.css" media="screen" rel="stylesheet" type="text/css">
	<link href="css/menuDroite.css" media="screen" rel="stylesheet" type="text/css">

	<audio preload="auto" id="boom"><source src="snd/1.mp3" type="audio/mp3"><source src="snd/1.ogg" type="audio/ogg"></audio>
	<audio preload="auto" id="leveln"><source src="snd/2.mp3" type="audio/mp3"><source src="snd/2.ogg" type="audio/ogg"></audio>
	<audio preload="auto" id="startn"><source src="snd/3.mp3" type="audio/mp3"><source src="snd/3.ogg" type="audio/ogg"></audio>

	<link rel="icon" type="image/png" href="favicon.ico" />
</head>

<body onselectstart="return false;">

	<p style="text-align: center; color: white;">
		Minelia. Développé en 48h par <a href="http://doelia.fr" style="color: white; text-decoration: none">Doelia</a> pour le Ludum Dare 25
	</p>

	<div id="game"
	onContextMenu="return false;"
	>

		<div id="announce">Niveau 1</div>
		<div id="menuDroite">
			<div class="level"></div>
			<div class="minesDispos"></div>
			<div id="points"></div>
			<div id="objectif"></div>
			<div id="points"><value></value></div>
			<div id="ciblesRestantes"><value></value></div>
			<div id="finPreparation">Lancer</div>
		</div>
	</div>

		<p style="text-align: center; color: white; font-size: 11px">
		Compatible Google Chrome uniquement
	</p>

	



</body>
</html>

