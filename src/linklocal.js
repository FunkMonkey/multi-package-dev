import path from 'path';
import Rx from 'rx';

import getLocalPackageInfos from './package/get-infos';
import moveNodeModules from './package/move-node-modules';
import { readFile, remove, symlink } from './utils/fs-rx';
import executeInSequence from './utils/execute-in-sequence';
import print from './utils/print';

export default function yarnInstallWithDevDependencies( workingDir ) {
  const workspacePackageJSON$ = readFile( path.join( workingDir, 'package.json' ), 'utf8' )
                                  .map( JSON.parse );

  const localPackageInfos$ = workspacePackageJSON$
    .map( packageJSON => getLocalPackageInfos( packageJSON, workingDir ) )
    .shareReplay( 1 )
    .flatMap( Rx.Observable.fromArray );

  const tasks = [
    // TODO: check if symlinks first

    localPackageInfos$
      .tap( pkgInfo => print( `Moving node_modules from '${pkgInfo.installedPath}' to '${pkgInfo.localPath}'` ) )
      .flatMap( pkgInfo => moveNodeModules( pkgInfo.installedPath, pkgInfo.localPath ) ),

    // remove created folder structure
    localPackageInfos$
      .tap( pkgInfo => print( `Removing directory '${pkgInfo.installedPath}'` ) )
      .flatMap( pkgInfo => remove( pkgInfo.installedPath ) ),

    // re-create symlinks
    localPackageInfos$
      .tap( pkgInfo => print( `Creating symlink from '${pkgInfo.installedPath}' to '${pkgInfo.localPath}'` ) )
      .flatMap( pkgInfo => symlink( pkgInfo.localPath, pkgInfo.installedPath, 'junction' ) ),
  ];

  return executeInSequence( tasks );
}
