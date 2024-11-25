import { useState } from 'react';

import AppAutoComplete from 'components/AppComponents/AppAutoComplete';
import AppGrid from 'components/AppComponents/AppGrid';
import AppLabelComponent from 'components/AppComponents/AppLabelComponent';


const options = [
    { label: "Desert Eagle" },
    { label: "Naples" },
    { label: "Sarasota" },
    { label: "Tampa" },
    { label: "Orlando" },
    { label: "Miami" },
    { label: "Jacksonville" },
    { label: "St. Petersburg" },
    { label: "Fort Lauderdale" },
    { label: "Palm Beach" }
];



const CommunityName = ({ setFieldValue, formValues, touched, errors }) => {

    const [address, setAddress] = useState('')
    const onSearch = (searchString) => {
        setAddress(searchString)
    }


    return (
        <AppGrid container textAlign={'center'} justifyContent={'center'} rowSpacing={4} >
            <AppGrid item >
                <AppLabelComponent gap={2} variant="h4" label={'What is the name of your community?'}>
                    <AppAutoComplete name='communityName' freesolo error={touched.communityName && errors.communityName} onChange={setFieldValue} searchString={address} value={formValues.communityName} options={options} placeholder='Search your Community' onSearch={onSearch} />
                </AppLabelComponent>

            </AppGrid>
        </AppGrid>
    )
}

export default CommunityName