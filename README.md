# simple-services

A sample repo with nodejs service(s).

## Install/Build
In order to setup project in root directory run:
```bash
make all
```
That should install dependency for all of the projects in `services/` directory build ` TypeScript` and run services locally.

## Description

### image-processor

This service exposes single `POST` endpoint `/images/resize`. It requires `width` and `height` query parameters to be specified for resize. Image is expected to be provided as `file` field in `multipart/form-data` request.
