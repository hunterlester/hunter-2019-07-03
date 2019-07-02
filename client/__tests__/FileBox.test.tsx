import React from 'react';
import { mount, shallow } from 'enzyme';
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

  describe('render', () => {
     beforeEach( () =>  {
         fileBox = shallow(<FileBox {...props} />);
     } );
     it('renders an image', () => {
       expect(fileBox.find('img').exists()).toBe(true);
     });

     it('renders name text', () => {
       expect(fileBox.find('p.text--large').text()).toEqual( props.file.name );
     });

     it('renders file size text', () => {
       expect(fileBox.find('p.text--small').text()).toEqual( `${props.file.size}kB` );
     });
  });

  describe('behavior', () => {
      it('Calls deleteFile on button click', () => {
        fileBox.find('button').simulate('click');
        expect(props.deleteFile.mock.calls.length).toEqual(1);
      } );
  });
});