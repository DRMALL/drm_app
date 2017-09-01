import 'react-native'
import React from 'react'
import Login from '../src/containers/Login'
import renderer from 'react-test-renderer';

test('Login test', () => {
  const tree = renderer.create(
    <Login />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})