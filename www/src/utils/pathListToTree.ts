// Adapted from https://github.com/pthm/node-path-list-to-tree. Thanks!

import { capitalize } from "lodash"

export interface TreeNode {
  name: string
  formattedName: string
  path: string
  data: object
  children: TreeNode[]
}

function createNode(
  path: string[],
  tree: TreeNode[],
  fullPath?: string,
  data?: object
): void {
  const name = path.shift()
  const idx = tree.findIndex((e: TreeNode) => {
    return e.name === name
  })

  if (idx < 0) {
    tree.push({
      name,
      formattedName: capitalize(name),
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

export function pathListToTree(
  pathList: [{ path: string; data: object }]
): TreeNode[] {
  const tree: TreeNode[] = []
  for (const { path, data } of pathList) {
    const split: string[] = path.split("/")
    createNode(split, tree, path, data)
  }
  return tree
}
