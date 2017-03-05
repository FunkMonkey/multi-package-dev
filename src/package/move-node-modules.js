import path from 'path';
import Rx from 'rx';
import { exists, move } from '../fs-rx';

/**
 * Moves the `node_modules` sub-folder from one directory to another
 * @param  {string}      from
 * @param  {string}      to
 * @return {Observable}        Empty or trash.
 */
export default function ( from, to ) {
  const fromPath = path.join( from, 'node_modules' );
  const toPath = path.join( to, 'node_modules' );

  // using clobber, because fs-extra otherwise uses fs.link which will just copy on windows
  return exists( fromPath )
    .flatMap( doesExist => ( doesExist ? move( fromPath, toPath, { clobber: true } )
                                     : Rx.Observable.empty() ) );
}
