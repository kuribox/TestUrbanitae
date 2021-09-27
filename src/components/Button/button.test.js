import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react';
import Button from './index.js';

test('Snapshot check', () => {
  const component = renderer.create(
    <Button />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Check Label', () => {
  const { getByText } = render(
    <Button label="test" />,
  );

  expect(getByText("test")).toBeInTheDocument();
});

test('Check click', () => {
  let button = false;
  const component = renderer.create(
    <Button onClick={() => {
      button = true;
    }}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onClick();

  tree = component.toJSON();
  expect(button).toBe(true);
});
