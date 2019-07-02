import React from 'react';
import { mount } from 'enzyme';
import { FileManager } from '../components/FileManager';

jest.mock( '../asyncOps' );

describe('FileBox', () => {
  let fileManager;
  let props;

  beforeEach( () =>  {
      props = {};
      fileManager = mount(<FileManager {...props} />);
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
  });
});