import path from 'path';
import R from 'ramda';
import { readFile, writeFile } from '../fs-rx';

export default function ( packagePath ) {
  const packageJSONPath = path.join( packagePath, 'package.json' );
  const packageJSON$ = readFile( packageJSONPath, 'utf8' ).map( JSON.parse );

  const alteredPackageJSON$ = packageJSON$
    .map( ( packageJSON ) => {
      const alteredPackageJSON = R.clone( packageJSON );
      alteredPackageJSON.dependencies = R.merge( packageJSON.dependencies,
                                                 packageJSON.devDependencies );
      alteredPackageJSON.devDependencies = {};
      return alteredPackageJSON;
    } );

  return alteredPackageJSON$.flatMap( alteredPackageJSON =>
    writeFile( packageJSONPath, JSON.stringify( alteredPackageJSON, null, 2 ) ) );
}
