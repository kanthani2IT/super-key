import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import AppAutoComplete from 'components/AppComponents/AppAutoComplete';
import AppDocumentUploader from 'components/AppComponents/AppDocumentUploader';
import AppGrid from 'components/AppComponents/AppGrid';
import AppLabelComponent from 'components/AppComponents/AppLabelComponent';
import AppModal from 'components/AppComponents/AppModal';
import AppRowBox from 'components/AppComponents/AppRowBox';
import { StyledTypography } from 'components/StyledComponents';
import { useFormik } from 'formik';
import { useCommunitiesQuery } from 'hooks/useDropDown';
import * as Yup from "yup";


const validationSchema = Yup.object({

    community: Yup.object().required("Community is required"),
});

const initialValues = {
    documents: [],
    community: null,
    activePolicy: "yes"
}

const CommunityDocUploads = ({ open }) => {
    const { data: communitiesData, isLoading: communitiesLoading } = useCommunitiesQuery()


    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values)

        },
    })
    const { values, dirty, errors, touched, resetForm, handleChange, handleSubmit, setFieldValue } = formik

    const footer = () => {
        return (
            <AppRowBox justifyContent="end">
                <AppGrid item size={{ xs: 2 }}>
                    <Button
                        fullWidth
                        size="large"
                        color="info"
                        type="submit"
                        // onClick={() => handleSubmit()} // Trigger Formik handleSubmit here
                        variant="contained"
                    >
                        {"Save"}
                    </Button>
                </AppGrid>
            </AppRowBox>
        );
    };

    const handleDocUpload = (docs) => {
        console.log(docs);
        setFieldValue('documents', docs)
    }
    console.log(values)

    return (
        <AppModal width={'60%'} enableCard open={open} title={'Upload Documents'} footer={footer()}>
            <AppGrid container spacing={4} >
                <AppGrid item size={{ xs: 12 }}>
                    <StyledTypography variant='h5'>Which Community does this document belong to?</StyledTypography>
                </AppGrid>
                <AppGrid item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                    <AppLabelComponent variant='body1' label={'Community'}>
                        <AppAutoComplete freeSolo={false} placeholder='Select Community'
                            name="community"
                            valueParam="communityId"
                            nameParam="name"
                            options={communitiesData?.data}
                            loading={communitiesLoading}
                            value={values.community}
                            onChange={handleChange}
                            error={touched.community && errors.community} />
                    </AppLabelComponent>
                </AppGrid>
                <AppGrid item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                    <AppLabelComponent variant='body1' label={' Is this document a part of current active policy ?'} >
                        <RadioGroup
                            sx={{ gap: 5 }}
                            name='activePolicy'
                            row
                            value={values.activePolicy}
                            onClick={handleChange}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio color='success' />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio color='success' />}
                                label="No"
                            />
                        </RadioGroup>
                    </AppLabelComponent>
                </AppGrid>
                <AppGrid item size={{ xs: 12 }}>
                    <AppDocumentUploader selectedFiles={values?.documents} setSelectedFiles={handleDocUpload} />
                </AppGrid>
            </AppGrid>
        </AppModal>
    )
}

export default CommunityDocUploads