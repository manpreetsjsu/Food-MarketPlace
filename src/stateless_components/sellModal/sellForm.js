import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import AutoCompleteInput from '../GoogleAutocomplete/autoComplete';

const sellForm = (props) => (
    <Form>
        <AutoCompleteInput onChange={()=>{}} onPlaceSelected={props.location} value=''/>
        <Form.Field>
            <label></label>
            <input placeholder='What are you selling ?' />
        </Form.Field>
        <Form.Field>
            <label></label>
            <input placeholder='Price' />
        </Form.Field>

        <Button type='submit'>Post</Button>
    </Form>
)

export default sellForm