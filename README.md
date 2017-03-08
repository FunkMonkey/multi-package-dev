# multi-package-dev

Simple, opinionated tool for developing multiple interconnected node packages with the help of [yarn](https://yarnpkg.com/en/), [local paths](https://docs.npmjs.com/files/package.json#local-paths) and symlinks. Comparable to [Lerna](https://github.com/lerna/lerna).

Goals:
- proper deduplication of `dependencies` (and `devDependencies`) of all packages when installing
- optional installation of `devDependencies` for in-development-packages
- optional symlinking of in-development-packages in order to develop and work within the same package directories / repositories

## Installation

```bash
$ npm install -g multi-package-dev
```

## Usage

`multi-package-dev` requires a workspace with a single `package.json`, which
specifies the in-development-packages using [local paths](https://docs.npmjs.com/files/package.json#local-paths) (`file:`) and contains the packages accordingly (e.g. in `my-workspace/packages`):

```json
{
  "name": "my-workspace",

  "dependencies": {
    "packageA": "file:packages/packageA",
    "packageB": "file:packages/packageB"
  }
}

```

### `install`

```bash
$ multi-package-dev install [installCommand] [--devDependencies]
```

Installs the dependencies by executing the `installCommand` in the working directory. `installCommand` defaults to `yarn install`, but can be configured as desired, e.g. for using `npm`:

```bash
$ multi-package-dev install "npm install"
```

Both `yarn` and `npm` will properly install packages specified using local paths (`file:`), thus creating copies of these directories in the `node_modules` directory (well, more or less, depending on `.npmignore` or `.gitignore`).

#### `--devDependencies`

```bash
$ multi-package-dev install --devDependencies
```

Specifying the `--devDependencies` parameter (or short `--dd`) will also install and dedupe the `devDependencies` of the in-development-packages. This works by temporarily rewriting the according `package.json` files (moving `devDependencies` into the `dependencies` section) before calling the `installCommand` and restoring the originals afterwards.

### `linklocal`

```bash
$ multi-package-dev linklocal
```

Creates symlinks for all in-development-packages from their installation directory in `node_modules` to the specified local paths. Before symlinking, the `node_modules` directories of the installed packages will be moved into their local directories.

If this command does not finish, it is probably waiting for a lock on the according directories. Close your file-browsers, etc.
