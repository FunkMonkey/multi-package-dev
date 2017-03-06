import * as yargs from 'yargs';

const argv = yargs
  .demandCommand( 1 )
  .commandDir( 'commands' )
  .help();

argv.argv;
