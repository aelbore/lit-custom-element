import es6Transform from './es6-transform';
 
 export default function karmaConfig(config) {
  config.set({
    basePath: '../',

    frameworks: [ 'jasmine', 'karma-typescript' ],
    
    files: [
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
      compilerOptions: {
        baseUrl: ".",
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        module: "commonjs",
        moduleResolution: "node",
        target: "es2015",
        paths: {
          "lit-custom-element": [ "src/index" ]
        },
        lib :[
          "dom",
          "es2015",
          "es2017"
        ]
      },
      coverageOptions: {
        exclude: /((.*\.(spec|module))|index)\.ts/
      },
      reports: {
        "html": {
          "directory": "coverage",
          "subdirectory": "."
        },
        "text-summary": "",
        'lcovonly': {
          'directory': 'coverage',
          'subdirectory': '.'
        }
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