import type { Meta, StoryObj } from '@storybook/react';
import Panel from '@/components/Panel';
import Plural from '@/components/Plural';

const meta = {
  title: 'Example/Plural',
  component: Panel
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUse: Story = {
  render: (args) => (
    <Panel>
      <Panel>
        2 <Plural count={2} plural="cups" single="cup" />
      </Panel>
      <Panel>
        1 <Plural count={1} plural="cups" single="cup" />
      </Panel>
    </Panel>
  )
};