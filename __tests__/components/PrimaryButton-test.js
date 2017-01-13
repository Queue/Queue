//
// PrimaryButton component test

import React from 'react';
import PrimaryButton from '../../app/components/PrimaryButton';
import renderer from 'react-test-renderer';

let testFunc = () => {
  console.warn('');
};

it('renders correctly', () => {
  const tree = renderer.create(
    <PrimaryButton
      press={testFunc}
      name={'Log In'}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
