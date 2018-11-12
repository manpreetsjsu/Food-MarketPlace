import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const DropDownMenu =  ((props)=> {

    const options = [
        { key: 'Fruits', text: 'Fruits', value: 'Fruits' },
        { key: 'Vegetables', text: 'Vegetables', value: 'Vegetables' },
        { key: 'HomeCooked', text: 'HomeCooked', value: 'Home-Cooked' },
        { key: 'GreenWaste', text: 'GreenWaste', value: 'Green-Waste' },
        { key: 'Other', text: 'Other', value: 'other' },

    ];

    function onChangeHandler(e) {
        e.persist();
      console.log(e.target.innerText);
      console.log(e.target.value);
      props.getCategoryValue(e.target.innerText);
    };

    return (
            <Dropdown placeholder='Category' fluid selection options={options} onChange={onChangeHandler} />

        );

});

export default React.memo(DropDownMenu);