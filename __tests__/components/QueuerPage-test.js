//
// QueuerPage component test

import React from 'react';
import QueuerPage from '../../app/components/QueuerPage';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <QueuerPage
      queuer={{name: 'fred'}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
