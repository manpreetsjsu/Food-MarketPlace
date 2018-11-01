import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const DropDownMenu =  ((props)=> {

    const options = [
        { key: 'fruits', text: 'fruits', value: 'Fruits' },
        { key: 'vegetables', text: 'vegetables', value: 'Vegetables' },
        { key: 'home-cooked', text: 'home-cooked', value: 'Home-Cooked' },
        { key: 'green-waste', text: 'green-waste', value: 'Green-Waste' },
        { key: 'other', text: 'other', value: 'other' },

    ];

    function onChangeHandler(e) {
      console.log(e.target.innerText);
      props.getCategoryValue(e.target.innerText);
    };

    return (
            <Dropdown placeholder='Category' fluid selection options={options} onChange={onChangeHandler} />

        );

});

export default React.memo(DropDownMenu);