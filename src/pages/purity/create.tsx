import React, { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Button, Table } from "antd";
import { HttpError, useCreate, useList } from "@refinedev/core";
import { connect } from "http2";

export const PurityCreate = () => {
  const { formProps, saveButtonProps, onFinish } = useForm();
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Percentage"
          name="purity_percentage"
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
