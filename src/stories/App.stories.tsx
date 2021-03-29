

import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import App from '../App';


export default {
  title: 'CRA starter page',
  component: App,
} as Meta;

const Template: Story<{}> = (args) => <App />;

export const StarterPage = Template.bind({});
StarterPage.args = {
  user: {},
};
