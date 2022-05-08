import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {Button, Grid} from 'semantic-ui-react';
import { PagingParams } from '../../../app/layout/models/pagination';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadingActivities, activityRegistry, setPagingParams, pagination} = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);
    
    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        //No need to pass params because it's
        //getting it from store itself
        loadingActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
      if (activityRegistry.size <= 1) loadingActivities();
    }, [activityRegistry.size, loadingActivities]) 
  

    return (
        <Grid>
            <Grid.Column width="10">
            {activityStore.loadingInitial && !loadingNext ? (
                <>
                    <ActivityListItemPlaceholder />
                    <ActivityListItemPlaceholder />
                </>
            ) : (
                <>
                   <ActivityList />
                    <Button
                            floated='right'
                            content='More...'
                            positive
                            onClick={handleGetNext}
                            loading={loadingNext}
                            disabled={pagination?.totalPages === pagination?.currentPage}
                        >
                    </Button> 
                </>
            )}    
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    ) 
})