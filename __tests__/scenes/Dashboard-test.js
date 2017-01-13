//
// Dashboard scene test

import React from 'react';
import Dashboard from '../../app/scenes/Dashboard';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Dashboard />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
