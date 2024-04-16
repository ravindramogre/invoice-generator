import { Edit, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

export const TaxEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Tax"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter Tax name",
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="Percentage"
          name="percentage"
          rules={[
            {
              required: true,
              message: "Please enter percentage",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};