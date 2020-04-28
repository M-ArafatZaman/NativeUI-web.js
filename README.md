# NativeUI-web.js
> **By Mohammad Arafat Zaman**

NativeUI-web.js is lightweight easy to use library which enables native UI effects on web.

## Documentation
_Coming soon_

## Developers note
Setting up the development environment.

***
#### Installing packages

1. `git clone` the development branch of this repository

2. Setting up babel _(optional)_
   - `npm install --save-dev @babel/core @babel/cli`
   - `npm install @babel/preset-env --save-dev`
   - `npm install babel-preset-minify --save-dev`
   
3. Setting up browserify _(optional)_
   - `npm install browserify`
   
***
#### .babelrc configuration

```json
{
    "presets": [
        ["@babel/preset-env"], 
        ["minify", {
            "builtIns": false
        }]
    ],
    "comments": false
}
```

***
#### package.json

```json
{ 
  "scripts": {
    "build": "babel src -d lib",
    "browserify": "browserify lib/NativeUI-web.js -o app.bundle.js"
  },
  "devDependencies": {
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.9.0",
    "@babel/preset-env": "^7.9.5",
    "babel-preset-minify": "^0.5.1"
  },
  "dependencies": {
    "browserify": "^16.5.1"
  }
}
```

***
#### Commands
- `npm run build` - Minifies and converts code to ES2015.
- `npm run browserify` - Bundles the code to one file
