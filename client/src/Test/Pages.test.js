import React from 'react';
import { configure, mount } from 'enzyme';
import Pages from '../Components/6.Pages.jsx';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import '@testing-library/jest-dom'

configure({ adapter: new Adapter() });

describe('Pages', ()=>{
    let wrapper;
    beforeEach(() =>{
        wrapper = mount(<Pages videogamesPerPage='5' allVideogames='20' paginado=' ' />)
    })
    it('should render a div tag', () => {
        expect(wrapper.find('div')).toHaveLength(1)
    });
    it('should render an ul tag', () => {
        expect(wrapper.find('ul')).toHaveLength(1)
    });
    it('should render 4 li tags', () => {
        expect(wrapper.find('li')).toHaveLength(4)
    });
    it('should render 4 button tags', () => {
        expect(wrapper.find('button')).toHaveLength(4)
    });
  });