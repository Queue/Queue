//
// EmailField component test

import React from 'react';
import EmailField from '../../app/components/EmailField';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <EmailField
      placeholder='test'
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
