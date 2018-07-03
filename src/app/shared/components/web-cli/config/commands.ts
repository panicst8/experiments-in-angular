const commands = [
  {
    name: 'cls',
    synopsys: 'clear terminal',
    description: `
       ${name} clears your screen if this is possible.  It looks in the environment for the terminal type
       and then in the terminfo database to figure out how to clear the screen.

       ${name} ignores any command-line parameters that may be present.`,
    seeAlso: `clear`,
  },
];
