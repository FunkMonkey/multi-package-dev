import Rx from 'rx';

export default function ( tasks ) {
  return Rx.Observable.fromArray( tasks )
    .concatMap( o => o )
    .last();
}
