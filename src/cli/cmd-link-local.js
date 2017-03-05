import Rx from 'rx';
import linkLocal from '../link-local';

const logObserver = Rx.Observer.create(
  ( el ) => {
    console.log( el );
  },
  ( el ) => {
    console.error( el );
  },
  ( ) => {
    console.log( 'completed' );
  }
);

linkLocal( process.cwd() ).subscribe( logObserver );
