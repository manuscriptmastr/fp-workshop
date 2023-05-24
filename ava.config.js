export default {
  environmentVariables: {
    API: 'http://www.tightenyourcorsetandyourtypes.example',
    USERNAME: 'edward_ferrars',
    PASSWORD: 'eyeheartd@$hw0od1811'
  },
  match: [
    // Comment out to progressively build your containers
    // "!*.map*",
    // "!*.ap*",
    // "!*.of*",
    // "!*.chain*",
    // "!*.concat*",
    // "!*.empty*",
    // "!*.rejected*",
    // "!*.reduce*"
  ],
  nodeArguments: [
    '--experimental-specifier-resolution=node'
  ]
};
