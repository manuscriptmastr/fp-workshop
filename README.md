# :nerd_face: Functional Programming Workshop

**:warning: WARNING: :warning: Please do not look at the `/solutions` directory before attempting the recipes yourself. The forest comes _before_ the machete.**

## :floppy_disk: Installation

1. Download repo

```bash
git clone git@github.com:manuscriptmastr/fp-workshop.git
cd fp-workshop
```

2. Install Node 14 (this package uses modules)

```bash
nvm install 14
nvm use 14
```

3. Install package dependencies

```bash
npm install
```

## :keyboard: Scripts

```bash
# Run test suite
npm run test

# Run only contents of playground.js
npm run playground
```

## :test_tube: Experiment

`playground.js` is just a blank "notepad" for you can follow along the workshop or jot down ideas/experiments. You can execute it with `npm run playground`.

## :runner: Practice

To practice a recipe, navigate to `{recipe}/index.test.js` and replace the line `import {recipe} from '../solutions/{recipe}'` with `import {recipe} from '.'` Run `npm run test` and tests should fail. Define your recipe in `{recipe}/index.js` until all tests pass!

If you get stumped, you can always refer to `solutions/{recipe}.js`. But who does that help :man_shrugging:?

## :information_source: Library Documentation

- [Ramda](https://ramdajs.com/docs/) is an auto-curried utility library
- [Sanctuary](https://sanctuary.js.org/) is another FP utility library (stricter than Ramda) that includes containers like `Maybe` and `Either`
- [Assert](https://nodejs.org/api/assert.html) is a super chill testing library built into Node.js
- [AVA](https://github.com/avajs/ava) is a highly _explicit_ and _concurrent_ testing framework
- [Nock](https://github.com/nock/nock) is a sweet library for mocking highly specific HTTP responses

## :question: FAQ

- What's with comments like `add :: Number -> Number -> Number`?
  - This is a [style of writing type signatures](https://github.com/ramda/ramda/wiki/Type-Signatures) widely adopted in the functional programming community. Don't worry if it looks bizarre now — we'll see this syntax many, many times!
- An example or test is incorrect.
  - Submit an issue so we can keep this workbook up to date for posterity!
- How do I slowly build my containers without having all these failing tests?
  - In `ava.config.js`, uncomment all but the container method(s) you're testing. For instance, if you're trying to make `Identity` pass the Functor tests, you will leave only `!*.map*` commented out. Restart `npm run test` and it will pick up only tests that call `SomeContainer.map(...)`.

## :heart_eyes: More FP please!

- Books
  - [Professor Frisby's Mostly Adequate Guide to Functional Programming](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/) covers a generous amount of FP theory, like containers, category theory, and natural transformations
  - [JavaScript Allongé](https://leanpub.com/javascriptallongesix/read) is basically _the_ dictionary of functional recipes
- Libraries
  - [Fantasy Land](https://github.com/fantasyland/fantasy-land/) is the official JS spec for FP libraries. Fun fact: the name of the spec was coined [during a GitHub debate](https://github.com/promises-aplus/promises-spec/issues/94#issuecomment-16176966) on whether `Promise`s should follow the definition of a Monad (such as the `Task` container). Because the final `Promise` spec was a compromise between category theory and imperative flow, `Promise`s cannot be cancelled unlike a `Task`.
  - [Fluture](https://github.com/fluture-js/Fluture) is a Fantasy Land compliant implementation of the `Task` or `Future` container.
  - [Haxl](https://github.com/facebook/Haxl) is an open source Haskell library that Facebook uses to process some 1 million post requests for spam... _per second_. To simplify spam definitions, the team took advantage of FP's natural cacheability and parallelism to hide concurrency logic from the developer writing a spam rule. [They wrote a paper](http://simonmar.github.io/bib/papers/haxl-icfp14.pdf) on the container type that inspired this framework.
- Talks
  - [Hey Underscore, You're Doing it Wrong!](https://www.youtube.com/watch?v=m3svKOdZijA) shows off how currying and composition can drastically reduce boilerplate (and bugs) while increasing reusability
  - [2016 React Rally — "Oh Composable World!"](https://www.youtube.com/watch?v=SfWR3dKnFIo) experiments with FP and ReactJS
  - [Classroom Coding with Professor Frisby](https://www.youtube.com/watch?v=h_tkIpwbsxY) is an _almost_ adorable video series based on [Mostly Adequate Guide](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/)
  - [JavaScript and Our Obsession with Speed](https://www.youtube.com/watch?v=0wgDGTgOPds) offers insights on the JS performance vs. maintainability discussion around declarative code
  - [A Million Ways to Fold in JS](https://www.youtube.com/watch?v=JZSoPZUoR58) explores looping alternatives via recursion, reduction, folding, and catamorphisms
