import linklocal from '../../linklocal';
import createCLIObserver from '../../utils/create-cli-observer';

export const command = 'linklocal';
export const desc = 'Links local packages';

export const builder = {
  command: { default: 'linklocal' }
};

export function handler( ) {
  linklocal( process.cwd() ).subscribe( createCLIObserver() );
}
