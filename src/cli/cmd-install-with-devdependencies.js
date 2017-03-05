import Rx from 'rx';
import installWithDevdependencies from '../install-with-devdependencies';

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

installWithDevdependencies( process.cwd() ).subscribe( logObserver );
