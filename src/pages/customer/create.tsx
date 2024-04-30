import React, { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Button, Table } from "antd";
import { useCreate, useList } from "@refinedev/core";

export const CustomerCreate = () => {
  const { formProps, saveButtonProps } = useForm();
  //console.log(entries);
  
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter Name",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter Email",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
        <Form.Item
          label="Phone No"
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Please enter Phone No",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
        <Form.Item
          label="Address Line 1"
          name="address_line_1"
          rules={[
            {
              required: true,
              message: "Please enter address",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
        <Form.Item
          label="Address Line 2"
          name="address_line_2"
          rules={[
            {
              message: "Please enter address",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
        <Form.Item
          label="Pincode"
          name="pincode"
          rules={[
            {
              required: true,
              message: "Please enter rate",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[
            {
              required: true,
              message: "Please enter State",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
      </Form>
    </Create>
  );
};
