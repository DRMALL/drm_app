import 'react-native';
import React from 'react';
import Routes from '../src/containers/Home';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('android', () => {
  const tree = renderer.create(
    <Routes />
  );
});
