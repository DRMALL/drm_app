import 'react-native'
import React from 'react'
import Equipment from '../src/containers/Equipment'
import renderer from 'react-test-renderer';

test('Equipment test', () => {
  const navigation = {
    state: {
      params: {
        statuItemData: false,
      },
    },
  }
  const tree = renderer.create(
    <Equipment navigation={ navigation }/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})