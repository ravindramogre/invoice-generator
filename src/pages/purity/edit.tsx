import { Edit, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

export const PurityEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Percentage"
          name="purity_percentage"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={false} />
        </Form.Item>
      </Form>
    </Edit>
  );
};