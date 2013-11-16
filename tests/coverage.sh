
rm -r ./coverage

set -e

./node_modules/istanbul/lib/cli.js cover ./node_modules/mocha/bin/_mocha -- -R spec ./tests/*.js

./node_modules/istanbul/lib/cli.js check-coverage --statement 100

