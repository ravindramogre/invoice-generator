import { Edit, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

export const CustomerEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              message: "Please enter material name",
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
              message: "Please enter rate",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter rate",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Pincode"
          name="pincode"
          rules={[
            {
              required: true,
              message: "Please enter state",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Addres Line 1"
          name="address_line_1"
          rules={[
            {
              required: true,
              message: "Please enter address line 1",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address Line 2"
          name="adress_line_2"
          rules={[
            {
              message: "Please enter address line 2",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[
            {
              required: true,
              message: "Please enter state",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};