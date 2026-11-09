#!/bin/bash
# scripts/validate.sh
set -e

echo "Lint"
npm run --silent lint

echo "Format"
npm run --silent format

echo "Test"
npm run --silent test

echo "All checks passed."
