import AppGrid from 'components/AppComponents/AppGrid'
import { ButtonGroup, RadiusStyledButton } from 'components/StyledComponents'
import React from 'react'
import TaskTable from './TaskTable'
import TaskCreation from './create'

const Task = () => {
    return (
        <AppGrid container spacing={4}>

            <AppGrid
                item
                size={{ xs: 12 }}
                container
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
            >
                <ButtonGroup>
                    <RadiusStyledButton variant="contained">
                        Created
                    </RadiusStyledButton>
                    <RadiusStyledButton variant="contained">
                        Completed
                    </RadiusStyledButton>
                    <RadiusStyledButton variant="contained">
                        Over Due
                    </RadiusStyledButton>
                </ButtonGroup>
                <ButtonGroup>
                    <TaskCreation refetch={() => console.log('add refetch here')} />

                </ButtonGroup>
            </AppGrid>
            <AppGrid item size={{ xs: 12 }}>
                <TaskTable
                    height={"80vh"}
                />
            </AppGrid>
        </AppGrid>
    )
}

export default Task