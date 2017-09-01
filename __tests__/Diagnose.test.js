import 'react-native'
import React from 'react'
import Diagnose from '../src/containers/Diagnose'
import renderer from 'react-test-renderer';

test('Diagnose test', () => {
  const tree = renderer.create(
    <Diagnose />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})