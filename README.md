# node-samples
repo for learning nodejs

#### How to prepare your workflow for typescript with nodejs

- `npm init -y` for quick package init
- `npm install typescript --save-dev`
- `npm install @types/node --save-dev` for ts types
- `tsc init` if you already installed typescript package globally otherwise you need to specify your package location

##### if you'd like to live-compile your typescript code into js
- `npm install ts-node --save-dev`
- `npm install nodemon --save-dev`
- in package.json: `"scripts" : {"start" : "npm run build:live",
"build:live" : "nodemon --exec ./node_modules/.bin/ts-node --./app.ts"}`

##### creating modules

in `tsconfig.json` :
`compilerOptions: {"outDir" : "lib",
"declaration" : true }
`
in `package.json` : `"main" : "lib/app.js", "types" : "lib/app"`
