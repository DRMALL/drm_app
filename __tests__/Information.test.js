import 'react-native'
import React from 'react'
import Information from '../src/containers/Information'
import renderer from 'react-test-renderer';

test('Information test', () => {
  const navigation = {
    state: {
      params: {
        recordMsgRed: '',
      },
    },
  }
  const tree = renderer.create(
    <Information navigation={ navigation } />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})