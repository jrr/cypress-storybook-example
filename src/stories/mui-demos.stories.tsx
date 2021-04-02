
import { storiesOf } from '@storybook/react';
import { muiComponentDemos } from './muiComponentDemos';

/**
 * This story contains a whole bunch of Material UI component demos
 * from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/components
 * as a stress test for Cypress.
 * 
 * Adjust NUM_COMPONENTS below to choose how many individual stories to use.
 * (there are 313 available)
 */
const NUM_COMPONENTS = 50;

const subset = muiComponentDemos.slice(0, NUM_COMPONENTS);

const builder = storiesOf(`MUI Demos (${NUM_COMPONENTS})`, module);

subset.reduce((accum, item) => accum.add(item.name, item), builder);
