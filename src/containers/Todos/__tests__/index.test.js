import React from 'react';
import { shallow, mount } from 'enzyme';
import styled from 'styled-components';
import 'jest-styled-components';

import { Todos } from '../index';

describe('<Todos />', () => {
  it('should render title', () => {
    const title = 'My dummy title';
    const props = {
      changePage: jest.fn(),
      fetchTodos: jest.fn(),
      refresh: jest.fn(),
      todos: [],
      isFething: false,
      title,
      lastUpdated: 1546003385534,
      error: '',
    };

    const wrapper = shallow(<Todos {...props} />);
    expect(wrapper.find('h1').text()).toBe(title);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Check styled button', () => {
  const Button = styled.button`
    color: red;
  `;

  test('it works', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchSnapshot();
  });
});
