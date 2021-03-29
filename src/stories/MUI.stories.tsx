import { Button, ButtonGroup, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';


export default {
  title: 'Material UI',
  component: Fab,
} as Meta;

type MuiExample = "fab" | "buttongroup" | "menu";
const Template: Story<{ page: MuiExample }> = (args) => {
  switch (args.page) {
    case "fab":

      return <>

        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit">
          <EditIcon />
        </Fab>
        <Fab variant="extended">
          <NavigationIcon />
        Navigate
      </Fab>
        <Fab disabled aria-label="like">
          <FavoriteIcon />
        </Fab>
      </>
    case "buttongroup":

      return <>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </>
    default:
      return <>unhandled</>
  }
}

/*

TODO:

find a way to mass-import a bunch of MUI components. start with their docs?

https://github.com/mui-org/material-ui/tree/next/docs/src/pages/components

https://github.com/mui-org/material-ui/blob/next/docs/src/pages.ts

 */

export const FloatingActionButtons = Template.bind({}, { page: "fab" });
export const ButtonGroups = Template.bind({}, { page: "buttongroup" });