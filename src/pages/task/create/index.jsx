import { AddCircle } from "@mui/icons-material";
import { Backdrop, Button, TextField } from "@mui/material";
import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import AppDatePicker from "components/AppComponents/AppDatePicker";
import AppGrid from "components/AppComponents/AppGrid";
import AppLabelComponent from "components/AppComponents/AppLabelComponent";
import AppModal from "components/AppComponents/AppModal";
import AppRowBox from "components/AppComponents/AppRowBox";
import AppTextField from "components/AppComponents/AppTextField";
import CircularLoader from "components/CircularLoader";
import dayjs from "dayjs";
import { useFormik } from "formik";
import {
  useCommunitiesQuery,
  useTaskPrioritiesQuery,
  useTaskStatusQuery,
  useTaskTypesQuery,
  useVerunaUsersQuery,
} from "hooks/useDropDown";
import { useTaskCreation } from "hooks/useTask";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import * as Yup from "yup";

const validationSchema = Yup.object({
  taskName: Yup.string().required("Task name is required"),
  type: Yup.object().required("Type is required"),
  assignedTo: Yup.object().required("Assigned to is required"),
  dueDate: Yup.date().required("Due date is required"),
  priority: Yup.object().required("Priority is required"),
  status: Yup.object().required("Status is required"),
  community: Yup.object().required("Community is required"),
  // comments: Yup.string().required("Comments are required"),
});

const initialValues = {
  taskName: "",
  type: null,
  assignedTo: null,
  dueDate: dayjs(),
  priority: null,
  status: null,
  community: null,
  comments: "",
};

const TaskCreation = ({ refetch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const modalOpen = Boolean(searchParams.get("task"));

  const [open, setOpen] = useState(false);

  const successHandler = () => {
    refetch();
    handleClose();
  };

  //API
  const { data: statusData, isLoading: statusLoading } = useTaskStatusQuery();
  const { data: typesData, isLoading: typesLoading } = useTaskTypesQuery();
  const { data: prioritiesData, isLoading: prioritiesLoading } =
    useTaskPrioritiesQuery();
  const { data: communitiesData, isLoading: communitiesLoading } =
    useCommunitiesQuery();
  const { data: assigneToData, isLoading: assigneToLoading } =
    useVerunaUsersQuery();
  const { mutate, isLoading: taskCreationLoading } =
    useTaskCreation(successHandler);

  console.log(communitiesData);
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
    resetForm();
  };

  const footer = () => {
    return (
      <AppRowBox justifyContent="end">
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="info"
          size="large"
        >
          Create Task
        </Button>
      </AppRowBox>
    );
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      let payload = {
        taskName: values?.taskName,
        type: values?.type?.name,
        assignedTo: values?.assignedTo?.Id,
        dueDate: values?.dueDate,
        priority: values?.priority?.name,
        status: values?.status?.name,
        comments: values?.comments,
        communityId: values?.community?.id || "0017x00000kF1kTAAS",
        name: "003bn00000B2haPAAR",
      };
      mutate(payload);
    },
  });

  const {
    values,
    dirty,
    errors,
    touched,
    resetForm,
    handleChange,
    handleSubmit,
  } = formik;

  return (
    <>
      <Button
        startIcon={<AddCircle />}
        size="large"
        color="info"
        variant="contained"
        onClick={handleOpen}
      >
        Create New Task
      </Button>

      <AppModal
        cardHeight={"60vh"}
        footer={footer()}
        confirmModal={dirty}
        title={"Create New Task"}
        enableCard
        open={open}
        onClose={handleClose}
      >
        <AppGrid container spacing={3}>
          <AppGrid item size={{ xs: 12 }}>
            <AppLabelComponent label={"Task Name"}>
              <AppTextField
                name="taskName"
                placeholder="Enter task name"
                value={values.taskName}
                onChange={handleChange}
                error={Boolean(touched.taskName && errors.taskName)}
                helperText={touched.taskName && errors.taskName}
                fullWidth
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <AppLabelComponent label={"Community"}>
              <AppAutoComplete
                freeSolo={false}
                placeholder="Select Community"
                name="community"
                valueParam="communityId"
                nameParam="name"
                options={communitiesData?.data}
                loading={communitiesLoading}
                value={values.community}
                onChange={handleChange}
                error={touched.community && errors.community}
              />
            </AppLabelComponent>
          </AppGrid>

          <AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <AppLabelComponent label={"Assigned to"}>
              <AppAutoComplete
                freeSolo={false}
                placeholder="Select"
                name="assignedTo"
                nameParam="Name"
                valueParam="Id"
                loading={assigneToLoading}
                options={assigneToData}
                value={values.assignedTo}
                onChange={handleChange}
                error={touched.assignedTo && errors.assignedTo}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <AppLabelComponent label={"Type"}>
              <AppAutoComplete
                freeSolo={false}
                filter={false}
                name="type"
                valueParam="name"
                loading={typesLoading}
                options={typesData}
                placeholder="Select type"
                value={values.type}
                onChange={handleChange}
                error={touched.type && errors.type}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <AppLabelComponent label={"Due Date"}>
              <AppDatePicker
                name="dueDate"
                placeholder="Select Due Date"
                value={values.dueDate}
                onChange={handleChange}
                error={touched.dueDate && errors.dueDate}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <AppLabelComponent label={"Priority"}>
              <AppAutoComplete
                freeSolo={false}
                placeholder="Select Priority"
                name="priority"
                loading={prioritiesLoading}
                options={prioritiesData}
                valueParam="name"
                value={values.priority}
                onChange={handleChange}
                error={touched.priority && errors.priority}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
            <AppLabelComponent label={"Status"}>
              <AppAutoComplete
                freeSolo={false}
                placeholder="Select Status"
                name="status"
                options={statusData}
                loading={statusLoading}
                valueParam="name"
                value={values.status}
                onChange={handleChange}
                error={touched.status && errors.status}
              />
            </AppLabelComponent>
          </AppGrid>

          <AppGrid item size={{ xs: 12 }}>
            <AppLabelComponent label={"Comments"}>
              <TextField
                minRows={4}
                multiline
                placeholder="Type your comments..."
                name="comments"
                value={values.comments}
                onChange={handleChange}
                fullWidth
              />
            </AppLabelComponent>
          </AppGrid>
        </AppGrid>

        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.modal + 1,
          }}
          open={taskCreationLoading}
        >
          <CircularLoader />
        </Backdrop>
      </AppModal>
    </>
  );
};

export default TaskCreation;
