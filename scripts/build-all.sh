#!/bin/bash

pids=''
code=0

# Build all of the services in parallel
for service_path in ./services/*; do
  if [[ -d "$service_path" && ! -L "$service_path" ]]; then
    npm run install-build --prefix "$service_path" &
    pids="$pids $!"
  fi
done

for job in $pids; do
  wait $job || let "code=1" # Set exit code to 1 if function build process fails
done


exit $code
