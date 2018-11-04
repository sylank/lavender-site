#!/bin/bash

export DEVURL='s3://dev.levendulabalatonmaria.info'
export PRODURL='s3://levendulabalatonmaria.info'

VERSION=$(cat package.json | jq '.version' | sed  s/"\""/""/g)

destination=""

case "$1" in
"dev")
    echo "Deploy to DEV"
    destination=$DEVURL
    ;;
"prod")
    echo "Deploy to PROD"
    destination=$PRODURL
    ;;
*)
    echo "Error did not mach environment"
    exit -1
    ;;
esac

aws s3 rm $destination --recursive

aws s3 cp s3://artifactory.levendulabalatonmaria.info/static/$VERSION $destination --recursive