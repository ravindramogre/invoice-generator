import { Edit, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

export const TypeEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  return (
    <Edit saveButtonProps={saveButtonProps}>
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
          <Input disabled={true} />
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
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};