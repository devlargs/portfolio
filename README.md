# NextJS, Typescript, Chakra UI Boilerplate

A simple repository that bootstraps application. npm packages will be updated from time to time.

## Setup

- git clone this repo
- npm install
- npm run dev

```
*if ever you encounter errors during npm install, you can try to run `npm i --legacy-peer-deps`
```

## Directory Structure

The boilerplate has basic default folders. The top level directory structure will be as follows:

- .vscode - A default vscode configuration to help organize imports
- components - This is where we put global shared/reusable components, such as layout (wrappers, navigation), form components, buttons
- pages - NextJS page files
- public - folder for self hosted assets
- store - Global state management tool

## Path aliasing

Added path aliasing **(@folder-name)** is used to easily determine which files were imported locally and from library, this is very helpful for better organization of imports. Library imports should come first then local.

## We use this tools

- [ESLint](https://eslint.org/docs/user-guide/configuring/)
- [Husky](https://typicode.github.io/husky/#/)
- [Prettier](https://prettier.io/)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)

### [Structure reference](https://www.taniarascia.com/react-architecture-directory-structure)
