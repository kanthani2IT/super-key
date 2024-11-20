// material-ui
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';

// assets
import AppModal from 'components/AppComponents/AppModal';
import MainTabs from 'components/MainTabs';
import { useGetUsers } from 'hooks/useOnboard';
import { ColorBox } from 'pages/component-overview/color';
import { useState } from 'react';
import RenewalPieChart from './RenewalPieChart';
import TaskTable from './TaskTable';
import UserTable from './UserTable';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //
const tabs = [{ label: 'Active Task', value: "active" }, { label: 'Completed', value: "completed" }]

export default function DashboardDefault() {

  const [selectedTab, setSelectedTab] = useState(tabs[0].value)


  const [open, setOpen] = useState(false)
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleClose = () => {
    setOpen(false)
  }
  const { data, isLoading } = useGetUsers()
  console.log(data)
  return (
    <Grid container rowSpacing={3} columnSpacing={2}>


      <Grid size={{ xs: 12 }}>

        <MainCard title='Alerts' secondary={'Full View'} sx={{ mt: 2 }} contentSX={{ maxHeight: "9rem" }}  >
          <Stack rowGap={2}>

            <ColorBox bgcolor="error.lighter" title="Rose Dale s Boiler room coverage is expiring on 25 th October due to non payment of new quote." duration='1hr' dark />
            <ColorBox bgcolor="grey.300" title="2 Assets in GRT Layout are not covered yet. Cost impact is $60,000" duration='2hr ago' dark />
          </Stack>
        </MainCard>

      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 6 }} >
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid size={{ xs: 12 }}>

            <MainCard title='Communities' secondary={'Full View'} secondaryAction={() => setOpen(true)} >
              <Stack spacing={2} >
                <Typography variant='h6' >Community Users</Typography>
                <Typography variant='subtitle2' color='success' >{data?.data?.totalSize ?? data?.data?.length ?? 0}</Typography>
              </Stack>
            </MainCard>
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <MainCard >
              <Stack rowGap={4} textAlign={'center'}>
                <Typography variant='h6' >Communities<br /> Insured</Typography>
                <Typography variant='subtitle2' color='success' >30 of 40</Typography>
              </Stack>
            </MainCard>
          </Grid><Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <MainCard   >
              <Stack rowGap={4} textAlign={'center'}>
                <Typography variant='h6' >Insurance <br /> Worth</Typography>
                <Typography variant='subtitle2' color='success' >$10,000,000</Typography>
              </Stack>
            </MainCard>
          </Grid><Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <MainCard   >
              <Stack rowGap={4} textAlign={'center'}>
                <Typography variant='h6' >Maintenance<br /> Pending</Typography>
                <Typography variant='subtitle2' color='success' >2</Typography>
              </Stack>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 6 }}>
        <MainCard title={'Upcoming Renewals'}>
          <Grid size={{ xs: 12 }} justifyItems={'center'}  >
            <RenewalPieChart />
          </Grid>
        </MainCard>
      </Grid>
      <AppModal
        open={open}
        onClose={handleClose}
        height='auto'
        width='70%'
      >
        <MainCard noStyles={true} title={'Community Users'} count={data?.data?.totalSize ?? data?.data?.length} >

          <UserTable tableData={data?.data?.records ?? data?.data} isLoading={isLoading} />
        </MainCard>
      </AppModal >
      <Grid size={{ xs: 12 }}>
        <MainCard title={'Task Assigned'} secondary={'Full View'} >
          <MainTabs handleChange={handleChange} value={selectedTab} tabs={tabs} />
          <TaskTable />
        </MainCard>
      </Grid>
    </Grid >
  );
}
