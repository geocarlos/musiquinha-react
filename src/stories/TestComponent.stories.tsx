import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TestComponent } from '../lib';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TestComponent/Examples',
  component: TestComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TestComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TestComponent> = (args) => <TestComponent {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  theme: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  theme: 'secondary',
};

