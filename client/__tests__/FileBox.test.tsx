import React from 'react';
import { mount } from 'enzyme';
import { FileBox } from '../components/FileBox';

describe('FileBox', () => {
  let fileBox;
  let props;

  beforeEach( () =>  {
      props = {
          deleteFile: jest.fn(),
          file: {
              id: Math.random().toString(32).substring(2),
              name: Math.random().toString(32).substring(2),
              size: 9600,
              type: "image/jpeg",
              content: "data:image/jpeg;base64,R0lGODlhyAAiALM"
          }
      };
      fileBox = mount(<FileBox {...props} />);
  } );

  it('renders an image', () => {
    expect(fileBox.find('img').exists()).toBe(true);
  });
});