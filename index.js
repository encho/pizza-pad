'use strict';
const Launchpad = require( 'launchpad-mini' );
const pad = new Launchpad();
const Rx = require('rxjs');

// possible launchpad mini button states
// --------------------------------
// pad.red
// pad.green
// pad.amber
// pad.off
// pad.yellow

pad.connect().then( () => {     // Auto-detect Launchpad
    pad.reset( 2 );             // Make Launchpad glow yellow

    const colorButtonRedFromPerc = (percPassed) => {
      const totalButtons = 8;
      const buttonIx = Math.round((totalButtons - 1) * percPassed);
      console.log('***********');
      console.log('percPassed', percPassed);
      console.log('buttonIx', buttonIx);
      console.log('***********');
      pad.col(pad.green, { 0: buttonIx, 1: 1 });
    };

    const colorButtonRed = (i) => {
      pad.col(pad.red, { 0: i, 1: 5 });
    };

    const buttons = 8;
    Rx.Observable
      .timer(0, 500) // timer(firstValueDelay, intervalBetweenValues)
      .take(buttons)
      .subscribe(colorButtonRed);

    const percentagePoints = 100;
    Rx.Observable
      .timer(0, 100) // timer(firstValueDelay, intervalBetweenValues)
      .map(percentagePoint => percentagePoint / 100.0)
      .take(percentagePoints)
      .subscribe(colorButtonRedFromPerc);

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
