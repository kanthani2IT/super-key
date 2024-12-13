import { Grid2 as Grid } from "@mui/material";
import mapImg from "assets/images/icons/map.png";
import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import AppLabelComponent from "components/AppComponents/AppLabelComponent";
import { Image } from "components/StyledComponents";
import { useState } from "react";
import { useDebounceFn } from "utils/helpers";
import { useLocationsQuery } from "hooks/useDropDown";
const options = [
  { label: "Phoenix North Estates, Phoenix, AZ 85023, USA", value: "AZ" },
  { label: "New York, Phoenix, NY 54321, USA", value: " " },
  { label: "India, Phoenix", value: "LA" },
  { label: "New ", value: " lj" },
];


const CommunityAddress = ({ handleChange, formValues, touched, errors }) => {
  const [address, setAddress] = useState("usa");
  
  const onSearch = useDebounceFn((searchString) => {
    if(searchString.length>=3)
    setAddress(searchString || "usa"); // Fallback to the initial static value
  }, 1000);

  const { data: addressList, isLoading:isAddressFetching } = useLocationsQuery(address);


  return (
    <Grid
      container
      textAlign={"center"}
      justifyContent={"center"}
      rowSpacing={4}
    >
      <Grid item size={{ xs: 10 }}>
        <Image height={"20vh"} src={mapImg} alt="map" />
      </Grid>
      <Grid item>
        <AppLabelComponent
          gap={2}
          variant="h4"
          label={"What is the address of your community?"}
        >
          <AppAutoComplete
            valueParam="description"
            nameParam="description"
            name="communityAddress"
            error={touched.communityAddress && errors.communityAddress}
            onChange={handleChange}
            value={formValues.communityAddress}
            options={addressList?.data?.predictions}
            placeholder="Enter your address"
            onSearch={onSearch}
            loading={isAddressFetching}
          />
        </AppLabelComponent>
      </Grid>
    </Grid>
  );
};

export default CommunityAddress;