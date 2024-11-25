import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import AppGrid from 'components/AppComponents/AppGrid'
import AppLabelComponent from 'components/AppComponents/AppLabelComponent'

const AddNewCommunity = ({ handleOnboardingType, onBoardingType }) => {
    console.log(onBoardingType)
    return (
        <AppGrid container justifyContent={'center'} rowSpacing={4} >
            <AppGrid item size={{ xs: 10 }} >
                <AppLabelComponent gap={2} variant="h4" label={'Do you want to add single community or multiple communities?'} >
                    <RadioGroup
                        row
                        value={onBoardingType}
                        onChange={(event) => handleOnboardingType(event.target.value)}
                    >
                        <FormControlLabel
                            value="single"
                            control={<Radio color='success' />}
                            label="Single Community"
                        />
                        <FormControlLabel
                            value="multiple"
                            control={<Radio color='success' />}
                            label="Multiple Communities"
                        />
                    </RadioGroup>

                </AppLabelComponent>


            </AppGrid>
        </AppGrid >
    )
}

export default AddNewCommunity