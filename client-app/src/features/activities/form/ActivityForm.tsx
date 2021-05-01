import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/layout/models/activity'

interface Props {
    activity : Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm(props: Props) {
    const {activity:  selectedActivity, closeForm, createOrEdit} = props;
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleInputChange}/>
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange}/>
                <Form.Input placeholder='Date' name='date' value={activity.date} onChange={handleInputChange}/>
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='submit' content='Cancel'/>
            </Form>
        </Segment>
    )   
}
