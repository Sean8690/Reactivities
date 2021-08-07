import { Button, Card } from 'semantic-ui-react'
import LoadingComponenet from '../../../app/layout/loadingComponent';
import { useStore } from '../../../app/stores/store';

export default function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

    if(!activity) return <LoadingComponenet />;
    
    return (
        <Card fluid>
            <img src={`/assets/categoryImages/${activity.category}.jpg`} alt={activity.category}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta><span>{activity.date}</span></Card.Meta>    
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                <   Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}


