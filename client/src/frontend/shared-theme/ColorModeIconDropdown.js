import * as React from "react";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useColorScheme } from "@mui/material/styles";

export default function ColorModeIconDropdown(props) {
  const { mode, systemMode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [fontEl, setFontEl] = React.useState(null);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const open = Boolean(anchorEl);
  const fontOpen = Boolean(fontEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMode = (targetMode) => () => {
    setMode(targetMode);
    handleClose();
  };

  const handleFontClick = (event) => {
    setFontEl(event.currentTarget);
  };
  const handleFontClose = () => {
    setFontEl(null);
  };

  const handleEnlarge = () => setZoomLevel((prev) => prev + 0.1);
  const handleShrink = () => setZoomLevel((prev) => prev - 0.1);
  const handleReset = () => setZoomLevel(1);

  React.useEffect(() => {
    document.getElementById(
      "scaleble-content"
    ).style.transform = `scale(${zoomLevel})`;
    document.getElementById("scaleble-content").style.transformOrigin =
      "top center";
  }, [zoomLevel]);

  if (!mode) {
    return (
      <Box
        data-screenshot="toggle-mode"
        sx={(theme) => ({
          verticalAlign: "bottom",
          display: "inline-flex",
          width: "2.25rem",
          height: "2.25rem",
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: "1px solid",
          borderColor: (theme.vars || theme).palette.divider,
        })}
      />
    );
  }
  const resolvedMode = systemMode || mode;
  const icon = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
  }[resolvedMode];
  return (
    <React.Fragment>
      <IconButton
        data-screenshot="toggle-mode"
        onClick={handleClick}
        disableRipple
        size="small"
        aria-controls={open ? "color-scheme-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        {...props}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="mode-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            variant: "outlined",
            sx: {
              my: "4px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem selected={mode === "system"} onClick={handleMode("system")}>
          System
        </MenuItem>
        <MenuItem selected={mode === "light"} onClick={handleMode("light")}>
          Light
        </MenuItem>
        <MenuItem selected={mode === "dark"} onClick={handleMode("dark")}>
          Dark
        </MenuItem>
      </Menu>

      <IconButton
        data-screenshot="toggle-mode"
        onClick={handleFontClick}
        disableRipple
        size="small"
        aria-controls={fontOpen ? "font-scheme-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={fontOpen ? "true" : undefined}
        {...props}
      >
        <FormatColorTextIcon />
      </IconButton>
      <Menu
        anchorEl={fontEl}
        id="font-menu"
        open={fontOpen}
        onClose={handleFontClose}
        slotProps={{
          paper: {
            variant: "outlined",
            sx: {
              my: "4px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleEnlarge}>
          <TextIncreaseIcon />
        </MenuItem>
        <MenuItem onClick={handleShrink}>
          <TextDecreaseIcon />
        </MenuItem>
        {/* <MenuItem onClick={handleReset}>
          <RestartAltIcon />
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}
