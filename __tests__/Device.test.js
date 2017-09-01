import 'react-native'
import React from 'react'
import Device from '../src/containers/Device'
import renderer from 'react-test-renderer';

test('Device test', () => {
  const tree = renderer.create(
    <Device />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})