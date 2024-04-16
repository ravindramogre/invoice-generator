import React, { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Button, Table } from "antd";
import { HttpError, useCreate, useList } from "@refinedev/core";
import { connect } from "http2";

export const ProductCreate = () => {
  const { formProps, saveButtonProps, onFinish } = useForm();
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Product"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter Invoice Number",
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
         <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: false,
              message: "Please enter Description",
            },
          ]}
        > 
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
