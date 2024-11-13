import type { Meta, StoryObj } from '@storybook/react';
import Panel from '@/components/Panel';
import Plural from '@/components/Plural';
import MinuteCountdown from '@/components/MinuteCountdown';

const meta = {
  title: 'Example/MinuteCountdown',
  component: Panel
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

const date = new Date();
date.setUTCMinutes(date.getUTCMinutes() + 59);

export const Basic: Story = {
  render: (args) => (
    <Panel>
      <MinuteCountdown date={date} />
    </Panel>
  )
};