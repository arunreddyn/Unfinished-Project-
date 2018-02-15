import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters'; 
import {filters,altFilters} from '../fixtures/filters';
import moment from 'moment';
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate,wrapper;

beforeEach(()=>{
    setTextFilter=jest.fn();
    sortByDate=jest.fn();
    sortByAmount=jest.fn();
    setStartDate=jest.fn();
    setEndDate=jest.fn();
    wrapper=shallow(<ExpenseListFilters filters={filters} 
    setTextFilter={setTextFilter} sortByDate={sortByDate}
    sortByAmount={sortByAmount} 
    setStartDate={setStartDate} 
    setEndDate={setEndDate}/>)
})
test('Expense list filters',()=>{
        expect(wrapper).toMatchSnapshot();
})
test('Expense list filters2',()=>{
    
    wrapper.setProps({filters:altFilters})
    expect(wrapper).toMatchSnapshot();

})
test('Expense text filters',()=>{
    const value='rent';
        wrapper.find('input').simulate('change',{target:{value}});
        expect(setTextFilter).toHaveBeenLastCalledWith(value);
})
test('sortByDate',()=>{
    const value='date'
    wrapper.find('select').simulate('change',{target:{value}})
    expect(sortByDate).toHaveBeenLastCalledWith();
})
test('sort by amount is working',()=>{
    const value='amount'
    wrapper.find('select').simulate('change',{target:{value}})
    expect(sortByAmount).toHaveBeenLastCalledWith();
})
test('should handle date changes', () => {
    const startDate=moment(0).add(4,'years')
    const endDate=moment(0).add(8,'years')
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate,endDate})
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
  });
  
  test('hould handle date focus changes', () => {
      const calenderFocused='startDate'
    wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused)
    expect(wrapper.state('calendarFocused')).toBe(calenderFocused)
  });