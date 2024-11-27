import { useState } from 'react';

import AppAutoComplete from 'components/AppComponents/AppAutoComplete';
import AppGrid from 'components/AppComponents/AppGrid';
import AppLabelComponent from 'components/AppComponents/AppLabelComponent';
import { useCommunitiesQuery } from 'hooks/useDropDown';
import { useDebounceFn } from 'utils/helpers';


const options = [
    {
        communityId: "808c6301479c40b8b4a039bae45d1465",
        name: "Green Valley Community"
    },
    {
        communityId: "1",
        name: "Desert Eagle"
    },
    {
        communityId: "2",
        name: "Naples"
    },
    {
        communityId: "3",
        name: "Sarasota"
    },
    {
        communityId: "4",
        name: "Tampa"
    },
    {
        communityId: "5",
        name: "Orlando"
    },
    {
        communityId: "6",
        name: "Miami"
    },
    {
        communityId: "7",
        name: "Jacksonville"
    },
    {
        communityId: "8",
        name: "St. Petersburg"
    },
    {
        communityId: "9",
        name: "Fort Lauderdale"
    },
    {
        communityId: "10",
        name: "Palm Beach"
    }
];




const CommunityName = ({ handleChange, formValues, touched, errors }) => {

    const [name, setName] = useState('')

    const onSearch = useDebounceFn((searchString) => {
        setName(searchString)
    }, 500)

    const { data: communityList, isLoading } = useCommunitiesQuery()

    return (
        <AppGrid container textAlign={'center'} justifyContent={'center'} rowSpacing={4} >
            <AppGrid item >
                <AppLabelComponent gap={2} variant="h4" label={'What is the name of your community?'}>
                    <AppAutoComplete valueParam='communityId' nameParam='name' name='communityName' error={touched.communityName && errors.communityName} loading={!communityList?.data?.length && isLoading} onChange={handleChange} value={formValues.communityName} options={communityList?.data} placeholder='Search your Community' onSearch={onSearch} />
                </AppLabelComponent>

            </AppGrid>
        </AppGrid>
    )
}

export default CommunityName