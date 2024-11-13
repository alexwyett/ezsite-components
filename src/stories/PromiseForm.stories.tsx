import type { Meta, StoryObj } from '@storybook/react';
import PromiseForm from '../components/PromiseForm';
import Panel from '@/components/Panel';
import FormSpinner from '@/components/FormSpinner';
import Button from '@/components/Button';

const meta = {
  title: 'Example/PromiseForm',
  component: Panel
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSumbit = () => {
  return new Promise((res: Function) => {
    setTimeout(() => {
      res();
    }, 3000)
  })
}

export const Basic: Story = {
  render: (args) => (
    <Panel>
      <PromiseForm onSubmit={onSumbit} className='group'>
        <Button type="submit" className='relative'>
          Submit
          <FormSpinner />
        </Button>
      </PromiseForm>
    </Panel>
  )
};