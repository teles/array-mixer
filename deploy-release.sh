#!/usr/bin/env bash
#!/bin/bash

dir=CLONED
git clone https://github.com/teles/array-mixer.git $dir
cd $dir
git checkout master
sed --in-place '/release/d' .gitignore || exit 0
cat ./.gitignore
npm install
npm run release
git add release
ls
git commit -m "no-issue - updates release files"
git status
git push --force "${GH_REFERENCE}" master:master