import React, { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Button, Table } from "antd";

export const TypeCreate = () => {
  const { formProps, saveButtonProps} = useForm();
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Material"
          name="type"
          rules={[
            {
              required: true,
              message: "Please enter material name",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
        <Form.Item
          label="Rate"
          name="rate"
          rules={[
            {
              required: true,
              message: "Please enter rate",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
      </Form>
    </Create>
  );
};
