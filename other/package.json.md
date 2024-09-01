An alternative way of running node tests would have been:
```
"test:units": "node --import ./test/setup.units.mjs --test './src/**/*.spec.*'"
```