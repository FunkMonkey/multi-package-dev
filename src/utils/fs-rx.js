import fs from 'fs-extra';
import Rx from 'rx';
import observableFromNodeCallback from './from-node-callback';

// TODO: move to fs-rx
export const copy = observableFromNodeCallback( fs.copy );
export const lstat = observableFromNodeCallback( fs.lstat );
export const move = observableFromNodeCallback( fs.move );
export const realpath = observableFromNodeCallback( fs.realpath );
export const readdir = observableFromNodeCallback( fs.readdir );
export const readFile = observableFromNodeCallback( fs.readFile );
export const remove = observableFromNodeCallback( fs.remove );
export const symlink = observableFromNodeCallback( fs.symlink );
export const writeFile = observableFromNodeCallback( fs.writeFile );

 // TODO check for EOENT
export const exists = path =>
  Rx.Observable.fromCallback( fs.stat, fs, ( err, result ) => result != null )( path );
