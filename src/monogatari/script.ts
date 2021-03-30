/* global Monogatari */
import Monogatari from '@monogatari/core'

Monogatari.storage ({
	player: {
		name: 'Salah'
	}
});

// Define the messages used in the game.
Monogatari.action ('message').messages ({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.Monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://Monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	}
});

// Define the notifications used in the game
Monogatari.action ('notification').notifications ({

});

// Define the Particles JS Configurations used in the game
Monogatari.action ('particles').particles ({

});

// Define the canvas objects used in the game
Monogatari.action ('canvas').objects ({

});

// Credits of the people involved in the creation of this awesome game
Monogatari.configuration ('credits', {

});


// Define the images that will be available on your game's image gallery
Monogatari.assets ('gallery', {

});

// Define the music used in the game.
Monogatari.assets ('music', {

});

// Define the voice files used in the game.
Monogatari.assets ('voices', {

});

// Define the sounds used in the game.
Monogatari.assets ('sounds', {

});

// Define the videos used in the game.
Monogatari.assets ('videos', {

});

// Define the images used in the game.
Monogatari.assets ('images', {

});

// Define the backgrounds for each scene.
Monogatari.assets ('scenes', {

});


// Define the Characters
Monogatari.characters ({
	'y': {
		name: 'Yui',
		color: '#5bcaff'
	}
});

Monogatari.script ({
	// The game starts here.
	'Start': [
		'show scene #f7f6f6',

		'y Hi {{player.name}} Welcome to Monogatari!',
		{
			'Choice': {
				'Dialog': 'y Have you already read some documentation?',
				'Yes': {
					'Text': 'Yes',
					'Do': 'jump Yes'
				},
				'No': {
					'Text': 'No',
					'Do': 'jump No'
				}
			}
		}
	],

	'Yes': [
		'y Thats awesome!',
		'y Then you are ready to go ahead and create an amazing Game!',
		'y I can’t wait to see what story you’ll tell!',
		'end'
	],

	'No': [

		'y You can do it now.',

		'show message Help',

		'y Go ahead and create an amazing Game!',
		'y I can’t wait to see what story you’ll tell!',
		'end'
	]
});
