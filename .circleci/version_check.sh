#!/bin/bash

VERSION=$(cat package.json | jq '.version' | sed  s/"\""/""/g)

for f in `aws s3 ls artifactory.levendulabalatonmaria.info/static/`; do
  if [ "$f" == "$VERSION/" ] 
  then
    echo "$f"
    exit 0
  fi
done

exit -1