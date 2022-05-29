import React from "react";
import { Story, Meta } from "@storybook/react";

import InputGroup, { InputGroupProps } from ".";
import Input from "../../atoms/Input";

export default {
  title: "Layout/InputGroup",
  component: InputGroup,
} as Meta;

export const Default: Story<InputGroupProps> = (args) => {
  return (
    <InputGroup {...args}>
      <span>Price</span>
      <Input type="text" placeholder="10" bordered />
      <span>USD</span>
    </InputGroup>
  );
};

Default.args = {};
