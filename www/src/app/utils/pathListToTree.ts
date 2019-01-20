// Adapted from https://github.com/pthm/node-path-list-to-tree. Thanks!

/**
 * Takes an array of path-like strings and creates a tree from the result.
 *
 * @example
 *
 * const paths = [{path: 'foo' }, {path: 'foo/bar', data: { hello: 'world' }}]
 * const tree = pathListToTree(paths)
 * // => [{
 *   name: 'foo',
 *   formattedName: 'Foo',
 *   path: 'foo',
 *   data: undefined
 *     children: [
 *       {
 *         name: 'bar',
 *         formattedName: 'Bar',
 *         path: 'foo/bar',
 *         data: { hello: 'world' }
 *       }
 *     ]
 *  ]
 * }]
 */

interface PathListProps {
  path: string
  data: object
}

export function pathListToTree(pathList: PathListProps[]): TreeNode[] {
  const tree: TreeNode[] = []
  for (const { path, data } of pathList) {
    const split: string[] = path.split("/")
    createNode(split, tree, path, data)
  }
  return tree
}

export interface TreeNode {
  name: string
  formattedName: string
  path: string
  data: any
  children: TreeNode[]
}

function createNode(
  path: string[],
  tree: TreeNode[],
  fullPath?: string,
  data?: any
): void {
  const name = path.shift()
  const idx = tree.findIndex((e: TreeNode) => {
    return e.name === name
  })

  if (idx < 0) {
    tree.push({
      name,
      // TODO: Pass in transformer callback
      formattedName: data.name,
      path: fullPath,
      data,
      children: [],
    })
    if (path.length !== 0) {
      createNode(path, tree[tree.length - 1].children, fullPath, data)
    }
  } else {
    createNode(path, tree[idx].children, fullPath, data)
  }
}
