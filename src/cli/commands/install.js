import install from '../../install';

export const command = 'install [installCommand]';
export const desc = 'Installs the package\'s dependencies';

export const builder = {
  command: { default: 'install' },

  devDependencies: {
    alias: ['devdependencies', 'dd'],
    type: 'boolean',
    default: false
  }
};

export function handler( parsedArgs ) {
  console.log( parsedArgs );

  // const logObserver = Rx.Observer.create(
  //   ( el ) => {
  //     console.log( el );
  //   },
  //   ( el ) => {
  //     console.error( el );
  //   },
  //   ( ) => {
  //     console.log( 'DONE' );
  //   }
  // );
  //
  // install( process.cwd() ).subscribe( logObserver );
}
