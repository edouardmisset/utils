import { assertEquals } from 'asserts'
import {
  searchTree,
  searchTreeList,
  SearchTreeListParameters,
  SearchTreeParameters,
} from './find-node-in-tree.ts'

Deno.test('searchTree', async (t) => {
  await t.step('should find a node in the tree', () => {
    const tree = {
      id: 1,
      name: 'Node 1',
      children: [{ id: 2, name: 'Node 2' }],
    }
    const params: SearchTreeParameters = {
      node: tree,
      searchTerm: 'Node 2',
      subItemsField: 'children',
      searchItemField: 'name',
    }
    assertEquals(searchTree(params), { id: 2, name: 'Node 2' })
  })

  await t.step('should return undefined if no node is found', () => {
    const tree = {
      id: 1,
      name: 'Node 1',
      children: [{ id: 2, name: 'Node 2' }],
    }
    const params: SearchTreeParameters = {
      node: tree,
      searchTerm: 'Node 3',
      subItemsField: 'children',
      searchItemField: 'name',
    }
    assertEquals(searchTree(params), undefined)
  })
})

Deno.test('searchTreeList', async (t) => {
  await t.step('should find a node in the list', () => {
    const nodes = [{
      id: 1,
      name: 'Node 1',
      children: [{ id: 2, name: 'Node 2' }],
    }]
    const params: SearchTreeListParameters = {
      nodeList: nodes,
      searchTerm: 'Node 2',
      subItemsField: 'children',
      searchItemField: 'name',
    }
    assertEquals(searchTreeList(params), { id: 2, name: 'Node 2' })
  })

  await t.step('should return undefined if no node is found', () => {
    const nodes = [{
      id: 1,
      name: 'Node 1',
      children: [{ id: 2, name: 'Node 2' }],
    }]
    const params: SearchTreeListParameters = {
      nodeList: nodes,
      searchTerm: 'Node 3',
      subItemsField: 'children',
      searchItemField: 'name',
    }
    assertEquals(searchTreeList(params), undefined)
  })
})
