#! /bin/bash

VERSION=$1 #$(cat package.json | jq '.version' | sed  s/"\""/""/g)

#Delete if exists
aws s3 rm s3://dev.levendulabalatonmaria.info/static/$VERSION --recursive

#Copy the new content
aws s3 cp ../dist s3://dev.levendulabalatonmaria.info/static/$VERSION --recursive