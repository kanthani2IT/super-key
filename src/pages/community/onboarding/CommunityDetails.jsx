import { TextField, Typography } from "@mui/material";
import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import AppGrid from "components/AppComponents/AppGrid";
import AppLabelComponent from "components/AppComponents/AppLabelComponent";
import {
  useCommunityManagersQuery,
  usePropertyManagersQuery,
} from "hooks/useDropDown";
import { useEffect, useState } from "react";
import { countryPhoneCodes } from "utils/constants";
import { useDebounceFn } from "utils/helpers";

const CommunityDetails = ({ formValues, errors, touched, setFieldValue }) => {
  const size = { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 };

  //phone number
  const countryCodeSize = { xs: 2.5, sm: 2.5, md: 2.5, lg: 2, xl: 2 };
  const mobileSize = { xs: 9.5, sm: 9.5, md: 9.5, lg: 4, xl: 4 };

  const { communityManager, propertyManager } = formValues;

  const [seachString, setSearchString] = useState({
    communityManager: "",
    propertyManager: "",
  });
  const { data: communityManagerList, isLoading: communityManagerFetching } =
    useCommunityManagersQuery();
  const { data: propertyManagerList, isLoading: propertyManagerFetching } =
    usePropertyManagersQuery();

  const [values, setValues] = useState({
    communityManager: {
      name: "",
      email: "",
      phone: "",
      countryCode: "",
      address: "",
    },
    propertyManager: {
      username: "",
      email: "",
      phone: "",
      countryCode: "",
      address: "",
    },
  });

  useEffect(() => {
    setValues({ communityManager, propertyManager });
  }, []);

  //handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    const [id, key] = name.split(".");
    setValues((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [key]: value,
      },
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };

  const onSearch = useDebounceFn((searchString, key) => {
    setSearchString((prev) => ({
      ...prev,
      [key]: searchString,
    }));
  });
  //For Mobile Number
  const Mobile = ({ key, values, mobileError, handleChange, handleBlur }) => {
    return (
      <AppGrid item size={{ xs: 12 }} container spacing={2}>
        <AppGrid item size={countryCodeSize}>
          <AppLabelComponent label={"Code"}>
            <AppAutoComplete
              name={`${key}.countryCode`}
              freeSolo={false}
              onChange={handleChange}
              onBlur={handleBlur}
              nameParam="label"
              valueParam="value"
              value={values?.countryCode || ""}
              options={countryPhoneCodes}
              placeholder="+1"
              disableClearable
              filter
              disabled
            />
          </AppLabelComponent>
        </AppGrid>
        <AppGrid item size={mobileSize}>
          <AppLabelComponent label={"Mobile Number"}>
            <TextField
              placeholder="+123423355"
              required
              fullWidth
              name={`${key}.phone`}
              value={values?.phone}
              onChange={(event) => handleChange(event)}
              onBlur={handleBlur}
              error={Boolean(mobileError)}
              helperText={mobileError}
            />
          </AppLabelComponent>
        </AppGrid>
      </AppGrid>
    );
  };

  const handleManger = (event) => {
    const { name, value } = event.target;
    const [id, key] = name.split(".");
    let exitingValue = formValues[id];

    if (!value?.isCustom) {
      exitingValue = {
        ...exitingValue,
        ...value,
      };
      setValues((prevState) => ({
        ...prevState,
        [id]: exitingValue,
      }));
      setFieldValue(id, exitingValue);
    } else {
      handleChange(event);
    }
  };
  return (
    <AppGrid container spacing={4}>
      <AppGrid item container size={{ xs: 12 }} rowSpacing={3}>
        <AppGrid item container spacing={2}>
          <AppGrid item size={{ xs: 12 }}>
            <Typography variant="h4">Community Manager</Typography>
          </AppGrid>
          <AppGrid item size={size}>
            <AppLabelComponent label={"Name"}>
              <AppAutoComplete
                name="communityManager.name"
                freeSolo={false}
                error={
                  touched.communityManager?.name &&
                  errors.communityManager?.name
                }
                onChange={handleManger}
                nameParam="name"
                valueParam="managerId"
                searchKey="communityManager"
                loading={communityManagerFetching}
                value={values?.communityManager?.name || ""}
                options={communityManagerList?.data}
                placeholder="Select Manager"
                onSearch={onSearch}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={size}>
            <AppLabelComponent label={"Email"}>
              <TextField
                required
                id="communityManager"
                placeholder="communityManager@gmail.com"
                fullWidth
                name="communityManager.email"
                value={values.communityManager?.email}
                onChange={(event) => handleChange(event)}
                onBlur={handleBlur}
                error={Boolean(
                  touched.communityManager?.email &&
                    errors.communityManager?.email
                )}
                helperText={
                  touched.communityManager?.email &&
                  errors.communityManager?.email
                }
              />
            </AppLabelComponent>
          </AppGrid>

          {Mobile({
            key: "communityManager",
            values: values.communityManager,
            mobileError:
              touched?.communityManager?.phone &&
              errors?.communityManager?.phone,
            handleBlur,
            handleChange,
          })}
        </AppGrid>
      </AppGrid>

      <AppGrid item container size={{ xs: 12 }} rowSpacing={3}>
        <AppGrid item container spacing={2}>
          <AppGrid item size={{ xs: 12 }}>
            <Typography variant="h4">Property Manager</Typography>
          </AppGrid>
          <AppGrid item size={size}>
            <AppLabelComponent label={"Name"}>
              <AppAutoComplete
                name="propertyManager.username"
                freeSolo={false}
                error={
                  touched.propertyManager?.username &&
                  errors.propertyManager?.username
                }
                onChange={handleManger}
                nameParam="username"
                valueParam="userId"
                searchKey="propertyManager"
                loading={propertyManagerFetching}
                value={values?.propertyManager?.username || ""}
                options={propertyManagerList?.data}
                placeholder="Select Property Manager"
                onSearch={onSearch}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={size}>
            <AppLabelComponent label={"Email"}>
              <TextField
                required
                placeholder="propertyManager@gmail.com"
                fullWidth
                name="propertyManager.email"
                value={values.propertyManager.email}
                onChange={(event) => handleChange(event)}
                onBlur={handleBlur}
                error={Boolean(
                  touched.propertyManager?.email &&
                    errors.propertyManager?.email
                )}
                helperText={
                  touched.propertyManager?.email &&
                  errors.propertyManager?.email
                }
              />
            </AppLabelComponent>
          </AppGrid>

          {Mobile({
            key: "propertyManager",
            values: values.propertyManager,
            mobileError:
              touched?.propertyManager?.phone && errors?.propertyManager?.phone,
            handleBlur,
            handleChange,
          })}
        </AppGrid>
      </AppGrid>
    </AppGrid>
  );
};

export default CommunityDetails;
