#!/bin/bash

for f in `aws s3 ls artifactory.levendulabalatonmaria.info/static/`; do

    if [ "$f" == "$1/" ]
    then
      echo "$f"
      exit 0
    fi

done

exit 1
