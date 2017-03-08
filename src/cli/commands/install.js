import install from '../../install';
import createCLIObserver from '../../utils/create-cli-observer';

export const command = 'install [installCommand]';
export const desc = 'Installs the package\'s dependencies';

export const builder = {
  command: { default: 'install' },

  installCommand: {
    type: 'string',
    default: 'yarn install'
  },

  devDependencies: {
    alias: ['devdependencies', 'dd'],
    type: 'boolean',
    default: false
  }
};

export function handler( parsedArgs ) {
  const options = {
    installCommand: parsedArgs.installCommand,
    devDependencies: parsedArgs.devDependencies
  };

  install( process.cwd(), options ).subscribe( createCLIObserver() );
}
