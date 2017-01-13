//
// TextButton component test

import React from 'react';
import TextButton from '../../app/components/TextButton';
import renderer from 'react-test-renderer';

let testFunc = () => {
  console.warn('');
};

it('renders correctly', () => {
  const tree = renderer.create(
    <TextButton
      press={testFunc}
      text={'Log In'}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
