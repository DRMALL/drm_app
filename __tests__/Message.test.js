import 'react-native'
import React from 'react'
import Message from '../src/containers/Message'
import renderer from 'react-test-renderer';

test('Message test', () => {
  const navigation = {
    setParams: () => 'ok',
  }
  const tree = renderer.create(
    <Message navigation={ navigation }/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})