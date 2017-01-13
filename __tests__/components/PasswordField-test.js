//
// PasswordField component test

import React from 'react';
import PasswordField from '../../app/components/PasswordField';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <PasswordField
      placeholder='test'
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
