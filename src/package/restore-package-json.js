import path from 'path';
import { move } from '../utils/fs-rx';

export default function ( packagePath ) {
  return move( path.join( packagePath, 'orig_package.json' ),
               path.join( packagePath, 'package.json' ),
               { overwrite: true } );
}
