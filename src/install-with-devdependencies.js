import child_process from 'child_process';
import path from 'path';
import compareVersions from 'compare-versions';
import Rx from 'rx';

import getLocalPackageInfos from './package/get-infos';
import backupPackageJSON from './package/backup-package-json';
import rewritePackageJSON from './package/rewrite-package-json';
import restorePackageJSON from './package/restore-package-json';
import { readFile } from './utils/fs-rx';
import executeInSequence from './utils/execute-in-sequence';
import print from './utils/print';

const isWin = /^win/.test( process.platform );
const isNodeBelow_5_7 = compareVersions( process.versions.node, '5.7.0' ) < 0;

// TODO: don't log to the console
/**
 * Spawns the `npm dedupe` process in the given directory. Logs to the console.
 *
 * @param  {string}                     workingDir
 * @return {Observable.<ChildProcess>}           Observable with single element
 */
function spawnYarnInstall( workingDir ) {
  return Rx.Observable.create( ( observer ) => {
    print( 'yarn install', workingDir );

    // we need 'shell' for windows ( only works in node >= 5.7.0 )
    const commandName = ( isWin && isNodeBelow_5_7 ) ? 'yarn.cmd' : 'yarn';
    const ls = child_process.spawn( commandName, ['install'], { cwd: workingDir, env: process.env, shell: true } );
    observer.onNext( ls );

    ls.stdout.on( 'data', ( data ) => {
      print( data.toString() );
    } );

    ls.stderr.on( 'data', ( data ) => {
      console.error( data.toString() );
    } );

    ls.on( 'close', ( code ) => {
      print( `'yarn install' exited with code ${code}` );
      if ( code === 0 )
        observer.onCompleted();
      else
        observer.onError( new Error( code ) );
    } );
  } );
}

export default function yarnInstallWithDevDependencies( workingDir ) {
  const workspacePackageJSON$ = readFile( path.join( workingDir, 'package.json' ), 'utf8' )
                                  .map( JSON.parse );

  const localPackageInfos$ = workspacePackageJSON$
    .map( packageJSON => getLocalPackageInfos( packageJSON, workingDir ) )
    .shareReplay( 1 )
    .flatMap( Rx.Observable.fromArray );

  const tasks = [
    localPackageInfos$
      .tap( pkgInfo => print( `Backing up 'package.json' of local package '${pkgInfo.name}'` ) )
      .flatMap( pkgInfo => backupPackageJSON( pkgInfo.localPath ) ),

    localPackageInfos$
      .tap( pkgInfo => print( `Rewriting 'package.json' of local package '${pkgInfo.name}'` ) )
      .flatMap( pkgInfo => rewritePackageJSON( pkgInfo.localPath ) ),

    spawnYarnInstall( workingDir ),

    localPackageInfos$
      .tap( pkgInfo => print( `Restoring 'package.json' of local package '${pkgInfo.name}'` ) )
      .flatMap( pkgInfo => restorePackageJSON( pkgInfo.localPath ) )
  ];

  return executeInSequence( tasks );
}
