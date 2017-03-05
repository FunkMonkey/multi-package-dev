import path from 'path';
import R from 'ramda';

const isLocalPackage = ( [ , packagePath ] ) =>
  packagePath.startsWith( 'file:' );

const getLocalPackageInfo = ( packageName, packagePath, workingDir ) => ( {
  name: packageName,
  localPath: path.join( workingDir, packagePath.substring( 5 ) ),
  installedPath: path.join( workingDir, 'node_modules', packageName )
} );

export default function ( packageJSON, workingDir ) {
  return R.pipe( R.toPairs,
                 R.filter( isLocalPackage ),
                 R.map( ( [ packageName, packagePath ] ) =>
                   getLocalPackageInfo( packageName, packagePath, workingDir ) ) )( packageJSON.dependencies );
}
