import type { Meta, StoryObj } from '@storybook/react';
import Panel from '@/components/Panel';
import Dialog from '@/components/Dialog';
import DialogProvider from '@/context/Dialog';
import { useState } from 'react';
import Button from '@/components/Button';

const meta = {
  title: 'Example/Dialog',
  component: Panel
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    defaultChecked: false
  },
  render: (args) => {
    return (
      <DialogProvider>
        <Dialog isOpen={args.defaultChecked === true}>Open</Dialog>
      </DialogProvider>
    )
  }
};

export const WithButton: Story = {
  args: {
    defaultChecked: false
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <DialogProvider>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Dialog isOpen={open} onClose={() => setOpen(false)} closeElement={<Button>Close</Button>}>Open</Dialog>
      </DialogProvider>
    )
  }
};