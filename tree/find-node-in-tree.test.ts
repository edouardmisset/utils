import { assertEquals } from '@std/assert'
import {
  searchTree,
  searchTreeList,
  SearchTreeListParameters,
  SearchTreeParameters,
} from './find-node-in-tree.ts'

const tree = {
  id: 1,
  name: 'Node 1',
  children: [{ id: 2, name: 'Node 2' }],
}

Deno.test('searchTree', async (t) => {
  await t.step('should find a node in the tree', () => {
    const parameters: SearchTreeParameters = {
      node: tree,
      searchTerm: 'Node 2',
      subItemsField: 'children',
      searchItemField: 'name',
    }
    assertEquals(searchTree(parameters), { id: 2, name: 'Node 2' })
  })

  await t.step('should return undefined if no node is found', () => {
    const parameters: SearchTreeParameters = {
      node: tree,
      searchTerm: 'Node 3',
      subItemsField: 'children',
      searchItemField: 'name',
    }
    assertEquals(searchTree(parameters), undefined)
  })
})

const nodes = [{
  id: 1,
  name: 'Node 1',
  children: [{ id: 2, name: 'Node 2' }],
}]

Deno.test('searchTreeList', async (t) => {
  await t.step('should find a node in the list', () => {
    const parameters: SearchTreeListParameters = {
      nodeList: nodes,
      searchTerm: 'Node 2',
      subItemsField: 'children',
      searchItemField: 'name',
    }
    assertEquals(searchTreeList(parameters), { id: 2, name: 'Node 2' })
  })

  await t.step('should return undefined if no node is found', () => {
    const parameters: SearchTreeListParameters = {
      nodeList: nodes,
      searchTerm: 'Node 3',
      subItemsField: 'children',
      searchItemField: 'name',
    }
    assertEquals(searchTreeList(parameters), undefined)
  })
})
