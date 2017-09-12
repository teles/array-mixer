#!/usr/bin/env bash
#!/bin/bash

dir=CLONED
git clone https://github.com/teles/array-mixer.git $dir
cd $dir
git checkout master
npm install
npm run release
git add release
ls
git commit -m "no-issue - updates release files"
git status
git push "${GH_REFERENCE}" master:master