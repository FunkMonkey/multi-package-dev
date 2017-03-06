# multi-package-dev

Simple, opinionated tool for developing multiple interconnected node packages. Comparable to [Lerna](https://github.com/lerna/lerna).

Features:
- installation of `devDependencies` for developed packages
- deduplication of `dependencies` and `devDependencies`
- symlinking developed packages

## Installation

```bash
npm install -g multi-package-dev
```

## Usage

`multi-package-dev` requires a workspace with a single `package.json`, which
specifies the development packages using [local paths](https://docs.npmjs.com/files/package.json#local-paths) (`file:`) and contains the packages accordingly (e.g. in `my-workspace/packages`):

```json
{
  "name": "my-workspace",

  "dependencies": {
    "packageA": "file:packages/packageA",
    "packageB": "file:packages/packageB"
  }
}

```

### install
