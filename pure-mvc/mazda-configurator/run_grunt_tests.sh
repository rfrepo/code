#!/bin/bash

echo "Running Grunt Tests from WebStorm"

if [ `grunt test` == *Done* ]; then
   echo "ALL TESTS PASSED"
else
   echo "TESTS FAILED"
fi

echo "WebStorm finished"
