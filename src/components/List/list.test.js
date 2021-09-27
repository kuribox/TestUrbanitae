import React from 'react';
import renderer from 'react-test-renderer';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import List from './index.js';

test('Snapshot check', () => {
  const component = renderer.create(
    <List />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

afterEach(cleanup);

test('Check init State', () => {
  const { queryByTestId, queryByText } =  render(
    <List 
      loading={false}
    />,
  );

  expect(queryByTestId('error')).toBeNull();
  expect(queryByText("No se encontraron resultados para su busqueda")).toBeNull();
  expect(queryByTestId('noResults')).toBeNull();
  expect(queryByTestId('results')).toBeNull();
});


test('Check no results', () => {
  const { queryByTestId, queryByText } = render(
    <List 
      loading={false}
      searchKey={"test"}
      elements={[]}
      errorMsg={null}
      isDirty={true}
    />,
  );

  expect(queryByTestId('error')).toBeNull();

  expect(queryByText("No se encontraron resultados para su busqueda")).toBeInTheDocument();
  expect(queryByTestId('noResults')).toBeInTheDocument();
  expect(queryByTestId('results')).toBeNull();
});

test('Check error message', () => {
  const { queryByTestId, queryByText } = render(
    <List 
      loading={false}
      searchKey={"test"}
      elements={[]}
      errorMsg="ERROR MESSAGE"
      isDirty={true}
    />,
  );

  expect(queryByTestId('error')).toBeInTheDocument();
  expect(queryByText("ERROR MESSAGE")).toBeInTheDocument();

  expect(queryByText("No se encontraron resultados para su busqueda")).toBeNull();
  expect(queryByTestId('noResults')).toBeNull();

  expect(queryByTestId('results')).toBeNull();
});


test('Check no error with no dirty list', () => {
  const { queryByTestId, queryByText } = render(
    <List 
      loading={false}
      searchKey={"test"}
      elements={[]}
      errorMsg="ERROR MESSAGE"
      isDirty={false}
    />,
  );

  expect(queryByTestId('error')).toBeNull();
  expect(queryByText("ERROR MESSAGE")).toBeNull();

  expect(queryByText("No se encontraron resultados para su busqueda")).toBeNull();
  expect(queryByTestId('noResults')).toBeNull();

  expect(queryByTestId('results')).toBeNull();
});


test('Check results list', () => {
  const { queryByTestId, queryByText } = render(
    <List 
      loading={false}
      searchKey={"test"}
      elements={[ { id: 1 }, { id: 2 } ]}
      errorMsg={null}
      isDirty={true}
    />,
  );

  expect(queryByTestId('error')).toBeNull();
  expect(queryByText("ERROR MESSAGE")).toBeNull();

  expect(queryByText("No se encontraron resultados para su busqueda")).toBeNull();
  expect(queryByTestId('noResults')).toBeNull();

  expect(queryByTestId('results')).toBeInTheDocument();
});

test('Check loading', () => {
  const { queryByTestId, queryByText } = render(
    <List 
      loading={true}
      searchKey={"test"}
      elements={[ { id: 1 }, { id: 2 } ]}
      errorMsg={null}
      isDirty={true}
    />,
  );

  expect(queryByTestId('error')).toBeNull();
  expect(queryByText("ERROR MESSAGE")).toBeNull();

  expect(queryByText("No se encontraron resultados para su busqueda")).toBeNull();
  expect(queryByTestId('noResults')).toBeNull();

  expect(queryByTestId('results')).toBeNull();
  expect(queryByTestId('loading')).toBeInTheDocument();
});

test('Check loading with Error', () => {
  const { queryByTestId, queryByText } = render(
    <List 
      loading={true}
      searchKey={"test"}
      elements={[ { id: 1 }, { id: 2 } ]}
      errorMsg="ERROR MESSAGE"
      isDirty={true}
    />,
  );

  expect(queryByTestId('error')).toBeNull();
  expect(queryByText("ERROR MESSAGE")).toBeNull();

  expect(queryByText("No se encontraron resultados para su busqueda")).toBeNull();
  expect(queryByTestId('noResults')).toBeNull();

  expect(queryByTestId('results')).toBeNull();

  expect(queryByTestId('loading')).toBeInTheDocument();
});

test('Check click element', () => {
  const handleClick = jest.fn();

  const { queryByTestId } = render(
    <List 
      loading={false}
      searchKey={"test"}
      elements={[ { id: 1 }, { id: 2 } ]}
      isDirty={true}
      onPress={handleClick}
    />,
  );

  expect(queryByTestId('results')).toBeInTheDocument();

  fireEvent.click(queryByTestId('results').firstChild)
});