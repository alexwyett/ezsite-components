import type { Meta, StoryObj } from '@storybook/react';
import Footer from '../components/Footer';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Footer',
  component: Footer
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <Footer />
  )
};

export const WithQuotes: Story = {
  render: (args) => (
    <Footer
      quotes={[
        {title: "Why another JSON editor?", description: "This is a personal project that will be used for my own projects and familiarity with the API and confidence in the data storage is what it was developed for."},
        {title: "How long will the JSON be stored?", description: "Links will be accessible for roughly 3 days with anonymous accounts or up to 365 days for premium accounts."},
        {title: "How do I get a premium account?", description: "Premium accounts and signup will be coming soon."},
        {title: "Is there an api i can use?", description: "Yes! You can use POST /api/create to store json files and GET /{id}/json to retrieve them.  Requests are allowed from anywhere so you can call them in the browser."}
      ]}
    />
  )
};