import React from "react";

import {
  Paper,
  Divider,
  Tooltip,
  IconButton,
} from "@material-ui/core";

import {
  PanelStyled,
  PanelHeader,
  PanelHeaderTitle,
  PanelHeaderActions,
  PanelContent,
  PanelFooter,
} from "./styles";

function Panel(props) {
  console.log(props.actions);
  return (
    <PanelStyled>
      <Paper>
        <PanelHeader>
          <PanelHeaderTitle>
            <span>{props.title}</span>
          </PanelHeaderTitle>
          <PanelHeaderActions>
            {props.actions
              ? props.actions.map((act) => {
                  return (
                    <Tooltip title={act.title}>
                      <IconButton onClick={() => act.onClick()}>
                          {act.icon}
                      </IconButton>
                    </Tooltip>
                  );
                })
              : null}
          </PanelHeaderActions>
        </PanelHeader>
        <Divider light />
        <PanelContent>{props.children}</PanelContent>
      </Paper>
    </PanelStyled>
  );
}

export default Panel;
