import path from 'path';
import { copy } from '../utils/fs-rx';

export default function ( packagePath ) {
  return copy( path.join( packagePath, 'package.json' ), path.join( packagePath, 'orig_package.json' ) );
}
