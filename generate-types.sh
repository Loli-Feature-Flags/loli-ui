#!/bin/sh

# Unfortunately the command "vue-tsc --declaration --emitDeclarationOnly"
# proposed by vue-tsc does not work.
# The current workaround: Run vue-tsc --build --force
# with a modified tsconfig that only emits type declarations

# The reason for swapping out the tsconfig.app.json by
# the tsconfig.app.types.json temporarily is that the
# "-p" argument is not recognized by "vue-tsc".

mv tsconfig.app.json tsconfig.app.original.json
mv tsconfig.app.types.json tsconfig.app.json

{
  bun vue-tsc --build --force &&
  mv dist/src/* dist/ &&
  rm -rf dist/src/
}

mv tsconfig.app.json tsconfig.app.types.json
mv tsconfig.app.original.json tsconfig.app.json
