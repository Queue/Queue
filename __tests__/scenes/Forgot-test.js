//
// Forgot scene test

import React from 'react';
import Forgot from '../../app/scenes/Forgot';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Forgot />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
