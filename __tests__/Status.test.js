import 'react-native'
import React from 'react'
import Status from '../src/containers/Status'
import renderer from 'react-test-renderer';

test('Status test', () => {
  const tree = renderer.create(
    <Status />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})