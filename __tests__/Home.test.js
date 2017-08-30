import 'react-native'
import React from 'react'
import Home from '../src/containers/Home'
import renderer from 'react-test-renderer';

test('Home test', () => {
  const tree = renderer.create(
    <Home />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})