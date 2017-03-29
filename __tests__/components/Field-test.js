//
// Field component test

import React from 'react';
import Field from '../../app/components/Field';
import renderer from 'react-test-renderer';

let testFunc = () => {
  console.warn('');
};

it('renders correctly', () => {
  const tree = renderer.create(
    <Field
      onPress={testFunc}
      label={'Log In'}
      type={'text'}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
