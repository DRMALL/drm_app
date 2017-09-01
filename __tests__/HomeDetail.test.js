import 'react-native'
import React from 'react'
import HomeDetail from '../src/containers/HomeDetail'
import renderer from 'react-test-renderer';

jest.unmock('ScrollView')    //RN WebView(TypeError: Cannot read property 'decelerationRate' of undefined)

test('HomeDetail test', () => {
  const navigation = {
    state: {
      params: {
        newsId: 'id',
      },
    },
  }
  const tree = renderer.create(
    <HomeDetail navigation={ navigation } />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})