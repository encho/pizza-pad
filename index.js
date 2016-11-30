'use strict';
const Launchpad = require( 'launchpad-mini' );
const pad = new Launchpad();

// possible launchpad mini button states
// --------------------------------
// pad.red
// pad.green
// pad.amber
// pad.off
// pad.yellow

pad.connect().then( () => {     // Auto-detect Launchpad
    pad.reset( 2 );             // Make Launchpad glow yellow
    pad.on( 'key', key => {
      const { x, y, pressed } = key;
      console.log('key pressed:');
      console.log('------------');
      console.log(x);
      console.log(y);
      console.log(pressed);
      pad.col( pad.green, key );  // Turn on buttons on press
    } );
} );
