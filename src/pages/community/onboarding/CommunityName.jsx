import { useState } from 'react';

import AppAutoComplete from 'components/AppComponents/AppAutoComplete';
import AppGrid from 'components/AppComponents/AppGrid';
import AppLabelComponent from 'components/AppComponents/AppLabelComponent';
import { useCommunitiesQuery } from 'hooks/useDropDown';
import { useDebounceFn } from 'utils/helpers';


const options = [
    {
        id: "808c6301479c40b8b4a039bae45d1465",
        name: "Green Valley Community"
    },
    {
        id: "1",
        name: "Desert Eagle"
    },
    {
        id: "2",
        name: "Naples"
    },
    {
        id: "3",
        name: "Sarasota"
    },
    {
        id: "4",
        name: "Tampa"
    },
    {
        id: "5",
        name: "Orlando"
    },
    {
        id: "6",
        name: "Miami"
    },
    {
        id: "7",
        name: "Jacksonville"
    },
    {
        id: "8",
        name: "St. Petersburg"
    },
    {
        id: "9",
        name: "Fort Lauderdale"
    },
    {
        id: "10",
        name: "Palm Beach"
    }
];




const CommunityName = ({ handleChange, formValues, touched, errors }) => {

    const [name, setName] = useState('')

    const onSearch = useDebounceFn((searchString) => {
        setName(searchString)

    }, 500)

    const { data: communityList } = useCommunitiesQuery(name)

    return (
        <AppGrid container textAlign={'center'} justifyContent={'center'} rowSpacing={4} >
            <AppGrid item >
                <AppLabelComponent gap={2} variant="h4" label={'What is the name of your community?'}>
                    <AppAutoComplete valueParam='communityId' nameParam='name' name='communityName' error={touched.communityName && errors.communityName} onChange={handleChange} value={formValues.communityName} options={options} placeholder='Search your Community' onSearch={onSearch} />
                </AppLabelComponent>

            </AppGrid>
        </AppGrid>
    )
}

export default CommunityName