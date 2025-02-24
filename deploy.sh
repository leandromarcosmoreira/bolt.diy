#!/bin/bash

cd "$(dirname "$0")"
wrangler pages deploy ./build/client --project-name bolt-ia
