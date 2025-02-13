import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SitemarkIcon } from "./CustomIcon";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [authUser, setAuthUser] = React.useState(false);

  React.useEffect(() => {
    getAuthUser();
  }, []);

  const getAuthUser = async () => {
    const res = await axios.get("/getAuthUser");
    if (res.data.data) {
      setAuthUser(res.data.data);
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <SitemarkIcon />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link to="/">
                <Button variant="text" color="info" size="small">
                  Quiz
                </Button>
              </Link>
              <Link to="/articles">
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  sx={{ minWidth: 0 }}
                >
                  Articles
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {authUser ? (
              <>
                <Link to="/profile">
                  <Button color="secondary" variant="outlined" size="small">
                    Profile
                  </Button>
                </Link>
                <form method="post" action="/signout">
                  <Button
                    color="primary"
                    variant="outlined"
                    size="small"
                    type="submit"
                  >
                    Sign out
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button color="secondary" variant="outlined" size="small">
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button color="primary" variant="outlined" size="small">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Link to="/quizzes">
                  <Button variant="text" color="info" size="small">
                    Quiz
                  </Button>
                </Link>
                <Link to="/articles">
                  <Button variant="text" color="info" size="small">
                    Articles
                  </Button>
                </Link>
                <Divider sx={{ my: 3 }} />
                {authUser ? (
                  <>
                    <Link to="/profile">
                      <MenuItem>
                        <Button
                          color="secondary"
                          variant="outlined"
                          size="small"
                          fullWidth
                        >
                          Profile
                        </Button>
                      </MenuItem>
                    </Link>
                    <form method="post" action="/signout">
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="outlined"
                          size="small"
                          type="submit"
                          fullWidth
                        >
                          Sign out
                        </Button>
                      </MenuItem>
                    </form>
                  </>
                ) : (
                  <>
                    <Link to="/signip">
                      <MenuItem>
                        <Button color="secondary" variant="outlined" fullWidth>
                          Sign in
                        </Button>
                      </MenuItem>
                    </Link>
                    <Link to="/signin">
                      <MenuItem>
                        <Button color="primary" variant="outlined" fullWidth>
                          Sign up
                        </Button>
                      </MenuItem>
                    </Link>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
