import Rx from 'rx';

export default function () {
  return Rx.Observer.create(
    ( el ) => {
      console.log( el );
    },
    ( el ) => {
      console.error( el );
    },
    ( ) => {
    }
  );
}
