import React, { useState, useEffect } from "react";
import axios from "axios";

import PropTypes from "prop-types";
import AppAppBar from "../layout/AppAppBar";
import AppTheme from "../shared-theme/AppTheme";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DetailsForm from "./components/DetailsForm";
import PasswordForm from "./components/PasswordForm";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Profile(props) {
  const [tab, setTab] = useState(0);
  const [profile, setProfile] = useState({});

  const loadProfile = async () => {
    const res = await axios.get("/profile");
    if (res.data.success) {
      setProfile(res.data.profile);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <div>
        <Container sx={{ py: { xs: 8, sm: 16 } }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Details" value={0} />
              <Tab label="Password" value={1} />
              <Tab label="Attempts" value={2} />
            </Tabs>
          </Box>
          <CustomTabPanel value={tab} index={0}>
            <DetailsForm profile={profile} />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
            <PasswordForm />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={2}>
            Item Three
          </CustomTabPanel>
        </Container>
      </div>
    </AppTheme>
  );
}
