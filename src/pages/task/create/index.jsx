import { AddCircle } from '@mui/icons-material'
import { Button, TextField, Typography } from '@mui/material'
import AppAutoComplete from 'components/AppComponents/AppAutoComplete'
import AppDatePicker from 'components/AppComponents/AppDatePicker'
import AppGrid from 'components/AppComponents/AppGrid'
import AppLabelComponent from 'components/AppComponents/AppLabelComponent'
import AppModal from 'components/AppComponents/AppModal'
import AppRowBox from 'components/AppComponents/AppRowBox'
import AppTextField from 'components/AppComponents/AppTextField'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { cManagers, pManagers, priority, status, type } from 'utils/constants'
import { compareeJson } from 'utils/helpers'
import * as Yup from "yup"


const validationSchema = Yup.object({
    taskName: Yup.string().required("Task name is required"),
    type: Yup.object().required("Type is required"),
    assignedTo: Yup.object().required("Assigned to is required"),
    dueDate: Yup.date().required("Due date is required"),
    priority: Yup.object().required("Priority is required"),
    status: Yup.object().required("Status is required"),
    relatedTo: Yup.object().required("Related to is required"),
    // comments: Yup.string().required("Comments are required"),
});

const initialValues = {
    taskName: '',
    type: null,
    assignedTo: null,
    dueDate: dayjs(),
    priority: null,
    status: null,
    relatedTo: null,
    comments: '',
}

const TaskCreation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const modalOpen =
        Boolean(searchParams.get("task"));

    const [open, setOpen] = useState(modalOpen || false)
    const handleOpen = () => {
        setOpen(true);
        let queryParams = "?task=true";
        navigate({
            pathname: location.pathname,
            search: !open ? queryParams : "",
        });
    };

    const handleClose = () => {
        setOpen(false);
        navigate({
            pathname: location.pathname,
            search: "",
        });
        resetForm()

    };

    const footer = () => {
        return (
            <AppRowBox justifyContent='end' >
                <Button onClick={handleSubmit} type='submit' variant="contained" color="info" size='large' >Create Task</Button>
            </AppRowBox>)

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values)
        },
    })

    const { values, dirty, errors, touched, resetForm, handleChange, handleSubmit } = formik

    return (
        <>
            <Button startIcon={<AddCircle />} size='large' color='info' variant='contained' onClick={handleOpen}>
                Create New Task
            </Button>
            <AppModal cardHeight={'50vh'} footer={footer()} confirmModal={dirty} title={'Create New Task'} enableCard open={open} onClose={handleClose}>
                <AppGrid container spacing={3}>
                    <AppGrid item size={{ xs: 12 }}>
                        <AppLabelComponent label={'Task Name'}>
                            <AppTextField name="taskName"
                                placeholder="Enter task name"
                                value={values.taskName}
                                onChange={handleChange}
                                error={Boolean(touched.taskName && errors.taskName)}
                                helperText={touched.taskName && errors.taskName}
                                fullWidth />
                        </AppLabelComponent>
                    </AppGrid>
                    <AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <AppLabelComponent label={'Type'}>

                            <AppAutoComplete
                                freeSolo={false}
                                name="type"
                                options={type}
                                nameParam='label'
                                placeholder="Select type"
                                value={values.type}
                                onChange={handleChange}
                                error={touched.type && errors.type}
                            />
                        </AppLabelComponent>
                    </AppGrid>
                    <AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <AppLabelComponent label={'Assigned to'}>
                            <AppAutoComplete
                                freeSolo={false}
                                placeholder='Select'
                                name="assignedTo"
                                options={pManagers}
                                nameParam="username"
                                valueParam="managerId"
                                value={values.assignedTo}
                                onChange={handleChange}
                                error={touched.assignedTo && errors.assignedTo} />
                        </AppLabelComponent>
                    </AppGrid>
                    <AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <AppLabelComponent label={'Due Date'}>
                            <AppDatePicker
                                name="dueDate"
                                placeholder="Select Due Date"
                                value={values.dueDate}
                                onChange={handleChange}
                                error={touched.dueDate && errors.dueDate}

                            />
                        </AppLabelComponent>
                    </AppGrid><AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <AppLabelComponent label={'Priority'}>
                            <AppAutoComplete freeSolo={false} placeholder='Select Priority'
                                name="priority"
                                options={priority}

                                value={values.priority}
                                onChange={handleChange}
                                error={touched.priority && errors.priority} />
                        </AppLabelComponent>
                    </AppGrid><AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <AppLabelComponent label={'Status'}>
                            <AppAutoComplete freeSolo={false} placeholder='Select Status'
                                name="status"
                                options={status}
                                value={values.status}
                                onChange={handleChange}
                                error={touched.status && errors.status} />
                        </AppLabelComponent>
                    </AppGrid><AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                        <AppLabelComponent label={'Related to'}>
                            <AppAutoComplete freeSolo={false} placeholder='Select'
                                name="relatedTo"
                                options={cManagers}
                                nameParam="username"
                                valueParam="managerId"
                                value={values.relatedTo}
                                onChange={handleChange}
                                error={touched.relatedTo && errors.relatedTo} />
                        </AppLabelComponent>
                    </AppGrid>
                    <AppGrid item size={{ xs: 12 }}>
                        <AppLabelComponent label={'Comments'}>
                            <TextField minRows={4} multiline placeholder='Type your comments...'
                                name='comments'
                                value={values.comments}
                                onChange={handleChange}

                                fullWidth />
                        </AppLabelComponent>
                    </AppGrid>
                </AppGrid>
            </AppModal>
        </>
    )
}

export default TaskCreation