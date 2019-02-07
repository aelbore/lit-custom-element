import es6Transform from './es6-transform';
 
 export default function karmaConfig(config) {
  config.set({
    frameworks: [ 'jasmine', 'karma-typescript' ],
    
    files: [
      { pattern: 'base.spec.ts' },
      { pattern: 'src/**/*.ts' },
      { pattern: 'tests/**/*.ts' }
    ],

    proxies: {
    },

    preprocessors: {
      "**/*.ts": "karma-typescript"
    },

    karmaTypescriptConfig: {
      exclude: [ ],
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
        transforms: [ es6Transform({}) ]
      },
      tsconfig: './tsconfig.json',
      coverageOptions: {
        exclude: /((.*\.(spec|module))|index)\.ts/
      },
      reports: {
        "html": {
          "directory": "coverage",
          "subdirectory": "."
        },
        "text-summary": ""
      },
    }, 
    
    reporters: [ 'mocha', 'karma-typescript' ],

    browsers: ['ChromeHeadlessNoSandbox'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    mime: {
      "text/x-typescript": ["ts"],
    }

  })
}