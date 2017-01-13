//
// SignIn scene test

import React from 'react';
import SignIn from '../../app/scenes/SignIn';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <SignIn />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
