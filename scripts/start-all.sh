#!/bin/bash

# start all of the services
for service_path in ./services/*; do
  if [[ -d "$service_path" && ! -L "$service_path" ]]; then
    npm start --prefix "$service_path"
  fi
done
