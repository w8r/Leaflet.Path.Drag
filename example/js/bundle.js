console.error("SyntaxError: {\n  \"name\": \"leaflet-path-drag\",\n  \"version\": \"1.1.0\",\n  \"description\": \"Drag functionality for Leaflet vector layers\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"test1\": \"browserify --transform [ babelify --presets [ es2015 ] ] ./test/*.test.js | tape-run --render=\"tap-spec\"\",\n    \"test\": \"browserify --transform [ babelify --presets [ es2015 ] ] ./test/*.test.js | tape-puppet\",\n    \"start\": \"npm run watch & npm run server\",\n    \"server\": \"http-server -p 3002\",\n    \"lint\": \"eslint ./src/\",\n    \"watch\": \"watchify -v -d example/js/app.js -o example/js/bundle.js\",\n    \"build-js\": \"mkdir -p dist && cat ./src/Path.Transform.js ./src/Path.Drag.js ./src/SVG.js ./src/SVG.VML.js ./src/Canvas.js > ./dist/L.Path.Drag-src.js\",\n    \"compress\": \"uglifyjs ./dist/L.Path.Drag-src.js -o ./dist/L.Path.Drag.js -m --comments\",\n    \"build\": \"npm run lint && npm run build-js && npm run compress\",\n    \"release\": \"git push origin master && git checkout gh-pages && git merge master && git push origin gh-pages && git checkout master && npm publish\"\n  },\n  \"keywords\": [\n    \"leaflet\",\n    \"path\",\n    \"polyline\",\n    \"drag\",\n    \"polygon\"\n  ],\n  \"author\": \"Alexander Milevski <info@w8r.name>\",\n  \"license\": \"MIT\",\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"git://github.com/w8r/Leaflet.Path.Drag.git\"\n  },\n  \"bugs\": {\n    \"url\": \"https://github.com/w8r/Leaflet.Path.Drag/issues\"\n  },\n  \"prettier\": {\n    \"singleQuote\": true\n  },\n  \"devDependencies\": {\n    \"babel-core\": \"^6.26.3\",\n    \"babel-eslint\": \"^10.1.0\",\n    \"babel-preset-es2015\": \"^6.24.1\",\n    \"babelify\": \"^8.0.0\",\n    \"browserify\": \"^14.4.0\",\n    \"eslint\": \"^8.18.0\",\n    \"faucet\": \"0.0.1\",\n    \"http-server\": \"^0.12.3\",\n    \"leaflet\": \"^1.8.0\",\n    \"prosthetic-hand\": \"^1.3.1\",\n    \"smokestack\": \"^3.6.0\",\n    \"tap-closer\": \"^1.0.0\",\n    \"tap-status\": \"^1.0.1\",\n    \"tape\": \"^5.5.3\",\n    \"tape-puppet\": \"^0.3.0\",\n    \"tape-run\": \"^10.0.0\",\n    \"uglify-js\": \"^3.0.21\",\n    \"watchify\": \"^3.9.0\"\n  }\n}\n : Unexpected token t in JSON at position 266");