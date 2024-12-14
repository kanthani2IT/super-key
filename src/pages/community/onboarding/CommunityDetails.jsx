import { Typography } from "@mui/material";
import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import AppGrid from "components/AppComponents/AppGrid";
import AppLabelComponent from "components/AppComponents/AppLabelComponent";
import AppTextField from "components/AppComponents/AppTextField";
import { StyledTypography } from "components/StyledComponents";
import {
  useCommunityManagersQuery,
  usePropertyManagersQuery,
} from "hooks/useDropDown";
import { useEffect, useState } from "react";
import { countryPhoneCodes } from "utils/constants";
import { useDebounceFn } from "utils/helpers";


const initialState = {
  communityManager: {
    username: "",
    email: "",
    phone: "",
    region: "+1",
    address: "",
  },
  propertyManager: {
    username: "",
    email: "",
    phone: "",
    region: "+1",
    address: "",
  },
}
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

  const [values, setValues] = useState(initialState);

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
              readOnly
              name={`${key}.region`}
              freeSolo={false}
              onChange={handleChange}
              onBlur={handleBlur}
              nameParam="label"
              valueParam="value"
              value={values?.region || ""}
              options={countryPhoneCodes}
              placeholder="+1"
              disableClearable
              focused={false}
              filter
            />
          </AppLabelComponent>
        </AppGrid>
        <AppGrid item size={mobileSize}>
          <AppLabelComponent label={"Mobile Number"}>
            <AppTextField
              type="number"
              focused={false}
              placeholder="+123423355"
              required
              fullWidth
              name={`${key}.phone`}
              value={values?.phone ? Number(values?.phone) : ""}
              onChange={(event) => handleChange(event)}
              onBlur={handleBlur}
              error={Boolean(mobileError)}
              helperText={mobileError}
              inputProps={{
                readOnly: true,

              }}
            />
          </AppLabelComponent>
        </AppGrid>
      </AppGrid>
    );
  };

  const handleManger = (event) => {
    const { name, value } = event.target;
    const [id] = name.split(".");
    let exitingValue = formValues[id];

    if (value) {
      value.region = value.region ?? initialState[id].region;
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
      setFieldValue(id, initialState[id]);
      setValues((prevState) => ({
        ...prevState,
        [id]: initialState[id],
      }));
    }
  };
  return (
    <AppGrid container spacing={4}>
      <AppGrid item size={{ xs: 12 }}>
        <StyledTypography variant="h5">Add details about your community </StyledTypography>
      </AppGrid>

      <AppGrid item container size={{ xs: 12 }} rowSpacing={3}>
        <AppGrid item container spacing={2}>
          <AppGrid item size={{ xs: 12 }}>
            <Typography variant="h4">Community Manager</Typography>
          </AppGrid>
          <AppGrid item size={size}>
            <AppLabelComponent label={"Name"}>
              <AppAutoComplete
                name="communityManager.username"
                freeSolo={false}
                error={
                  touched.communityManager?.username &&
                  errors.communityManager?.username
                }
                onChange={handleManger}
                nameParam="username"
                valueParam="managerId"
                searchKey="communityManager"
                loading={communityManagerFetching}
                value={values?.communityManager?.username || ""}
                options={communityManagerList?.data}
                placeholder="Select Manager"
                onSearch={onSearch}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={size}>
            <AppLabelComponent label={"Email"}>
              <AppTextField
                inputProps={{ readOnly: true }}
                required
                id="communityManager"
                placeholder="CommunityManager@gmail.com"
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
                focused={false}

              />
            </AppLabelComponent >
          </AppGrid >

          {
            Mobile({
              key: "communityManager",
              values: values.communityManager,
              mobileError:
                touched?.communityManager?.phone &&
                errors?.communityManager?.phone,
              handleBlur,
              handleChange,
            })}
        </AppGrid >
      </AppGrid >

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
              <AppTextField
                inputProps={{ readOnly: true }}
                focused={false}

                required
                placeholder="PropertyManager@gmail.com"
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
            </AppLabelComponent >
          </AppGrid >

          {
            Mobile({
              key: "propertyManager",
              values: values.propertyManager,
              mobileError:
                touched?.propertyManager?.phone && errors?.propertyManager?.phone,
              handleBlur,
              handleChange,
            })}
        </AppGrid >
      </AppGrid >

      {/* <AppGrid item container size={{ xs: 12 }} rowSpacing={3}>
        <AppGrid item container spacing={2}>
          <AppGrid item size={{ xs: 12 }}>
            <Typography variant="h4">Insurance Details</Typography>
          </AppGrid>
          <AppGrid item size={size}>
            <AppLabelComponent label={"Insurance Premium"}>
              <TextField
                required
                placeholder="1000000"
                fullWidth
                name="insurance.premium"
                value={values.insurance?.premium}
                onChange={(event) => handleChange(event)}
                onBlur={handleBlur}
                error={Boolean(
                  touched.insurance?.premium &&
                  errors.insurance?.premium
                )}
                helperText={
                  touched.insurance?.premium &&
                  errors.insurance?.premium
                }

              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={size}>
            <AppLabelComponent label={"Insurance Coverage"}>
              <TextField

                required
                placeholder="1000000"
                fullWidth
                name="insurance.coverage"
                value={values.insurance?.coverage}
                onChange={(event) => handleChange(event)}
                onBlur={handleBlur}
                error={Boolean(
                  touched.insurance?.coverage &&
                  errors.insurance?.coverage
                )}
                helperText={
                  touched.insurance?.coverage &&
                  errors.insurance?.coverage
                }
              />
            </AppLabelComponent>
          </AppGrid>

        </AppGrid>
      </AppGrid> */}
    </AppGrid >
  );
};

export default CommunityDetails;
