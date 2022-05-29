import React from "react";
import { Story, Meta } from "@storybook/react";

import Alert from ".";
import Spinner from ".";

export default {
  title: "Atoms/Spinner",
  component: Alert,
  argTypes: {
    icon: {
      control: false,
    },
  },
} as Meta;

export const Default: Story = () => {
  return <Spinner />;
};
