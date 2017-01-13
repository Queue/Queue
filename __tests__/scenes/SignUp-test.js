//
// SignUp scene test

import React from 'react';
import SignUp from '../../app/scenes/SignUp';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <SignUp />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
