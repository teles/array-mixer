#!/usr/bin/env bash
#!/bin/bash

dir=CLONED
git clone https://github.com/teles/array-mixer.git $dir
cd $dir
git checkout master
sed --in-place '/release\//d' .gitignore || exit 0
git rm bundle.js
cat ./.gitignore
npm install
npm run release
git add release
ls
git commit -m "Atualizando gh-pages via travis-ci"
git status
git push --force "${GH_REFERENCE}" master:master