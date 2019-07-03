import React from 'react';
import { mount } from 'enzyme';
import { FileManager } from '../components/FileManager';
import { FileBox } from '../components/FileBox';

jest.mock( '../asyncOps' );

describe('FileBox', () => {
  let fileManager;

  beforeEach( () =>  {
      fileManager = mount(<FileManager  />);
      fileManager.setState({
          files: [
              {
                id: Math.random().toString(32).substring(2),
                name: Math.random().toString(32).substring(2),
                size: 9600,
                type: "image/jpeg",
                content: "data:image/jpeg;base64,R0lGODlhyAAiALM"
              },
              {
                id: Math.random().toString(32).substring(2),
                name: Math.random().toString(32).substring(2),
                size: 3600,
                type: "image/png",
                content: "data:image/png;base64,R0lGODlhyAAiALM"
              },
          ]
      });
  } );

  describe('constructor', () => {
      it('should have name FileManager', () => {
          const instance = fileManager.instance();
          expect( instance.constructor.name ).toBe( 'FileManager' );
         
      });
  });

  describe('render', () => {
      it('renders a file input', () => {
        expect(fileManager.find('input[type="file"]').exists()).toBe(true);
      });

      it('renders array of FileBox components', () => {
        expect( fileManager.find( FileBox ).length ).toBe( 2 );
      });
  });

  describe('behavior', () => {
      it('calls getFiles operation on text input change', () => {
          const instance = fileManager.instance();
          instance.getFiles = jest.fn();
          fileManager.find('input.search').simulate('change');
          expect(instance.getFiles).toHaveBeenCalledTimes( 1 );
      });

      it('calls uploadFile operation on file input change', () => {
          const instance = fileManager.instance();
          instance.uploadFile = jest.fn();
          fileManager.find('input[type="file"]').simulate('change');
          expect(instance.uploadFile).toHaveBeenCalledTimes( 1 );
      });
  });
});