import { useState } from "react";

import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import AppGrid from "components/AppComponents/AppGrid";
import AppLabelComponent from "components/AppComponents/AppLabelComponent";
import { useCommunitiesQuery } from "hooks/useDropDown";
import { useDebounceFn } from "utils/helpers";


const CommunityName = ({ handleChange, formValues, touched, errors }) => {
  const [name, setName] = useState("");

  const onSearch = useDebounceFn((searchString) => {
    setName(searchString);
  }, 500);

  const { data: communityList, isLoading } = useCommunitiesQuery();

  return (
    <AppGrid
      container
      textAlign={"center"}
      justifyContent={"center"}
      rowSpacing={4}
    >
      <AppGrid item>
        <AppLabelComponent
          gap={2}
          variant="h4"
          label={"What is the name of your community?"}
        >
          <AppAutoComplete
            size="medium"
            valueParam="communityId"
            nameParam="name"
            name="communityName"
            error={touched.communityName && errors.communityName}
            loading={isLoading}
            onChange={handleChange}
            value={formValues.communityName}
            options={communityList?.data || []}
            placeholder="Enter your Community Name"
            onSearch={onSearch}
          />
        </AppLabelComponent>
      </AppGrid>
    </AppGrid>
  );
};

export default CommunityName;
