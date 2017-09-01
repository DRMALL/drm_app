import 'react-native'
import React from 'react'
import Information from '../src/containers/Information'
import renderer from 'react-test-renderer';

test('Information test', () => {
  const tree = renderer.create(
    <Information />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})