
rm -r ./coverage

set -e

echo 'Running server coverage...'

./node_modules/istanbul/lib/cli.js cover ./node_modules/mocha/bin/_mocha -- -R spec ./tests/server/*.js

./node_modules/istanbul/lib/cli.js check-coverage --statement 100

echo 'Running client  coverage...'
rm -r ./coverage

./node_modules/karma/bin/karma start ./tests/client/karma.conf

./node_modules/istanbul/lib/cli.js report text-summary --dir client --root ./coverage

./node_modules/istanbul/lib/cli.js check-coverage --statement 100 --dir client --root ./coverage

