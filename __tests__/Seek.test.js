import 'react-native'
import React from 'react'
import Seek from '../src/containers/Seek'
import renderer from 'react-test-renderer';

test('Seek test', () => {
  const tree = renderer.create(
    <Seek />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})