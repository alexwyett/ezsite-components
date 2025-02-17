import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header';
import Logo from '../components/Logo';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Header',
  component: Header
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <Header {...args}>
      <Logo />
    </Header>
  )
};