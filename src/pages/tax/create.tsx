import React, { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Button, Table } from "antd";

export const TaxCreate = () => {
  const { formProps, saveButtonProps} = useForm();
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Taxes"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter Tax name",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
        <Form.Item
          label="Percentage"
          name="percentage"
          rules={[
            {
              required: true,
              message: "Please enter Percentage",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
      </Form>
    </Create>
  );
};
