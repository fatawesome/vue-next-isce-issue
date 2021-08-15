# Vue3 "Cannot read property 'isCE' of null" issue reproduction project.

## How to run?
`$ yarn && lerna bootstrap && yarn start`

Navigate to `http://localhost:3000`.

## Expected result.

You should see two lines of text
1. Host content
2. test remote component

## Actual result.
Server crashes on `renderSlot` function with `Cannot read property 'isCE' of null` error.

## P.S.
Removing `<slot />` from remote component fixes the issue, but of course we need slots in our code :)
