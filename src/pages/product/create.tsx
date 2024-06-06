import React, { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Button, Table } from "antd";
import { useCreate, useList } from "@refinedev/core";

export const ProductCreate = () => {
  const { formProps, saveButtonProps, onFinish } = useForm();
  const createProductTypes = useCreate();
  const { data: typesList, isLoading } = useList({
    resource: "types"
  })

  console.log(typesList);
  const handleOnFinish = async (values: any) => {
    const {name, description, manufacturer} = values;
    try {
        //console.log(values);
        const response = await onFinish({
          name,
          description,
          manufacturer
        });
        handleCreateProductTypes(response?.data?.data?.id);
        if (typeof response === 'undefined') {
            throw new Error('Received undefined response from onFinish');
        }
        console.log('Form submitted successfully');
      } catch (error: any) {
        console.error('Error submitting form:', error.message);
      }
  };
  //console.log(entries);
  const handleCreateProductTypes = async (productId: number) => {
    try {
      typesList?.data?.forEach(async (item) => {
        await createProductTypes.mutate({
            resource: "producttypes", 
            values: {
                product: {
                    connect: [productId],
                },
                type: {
                    connect: [item?.id]
                },
                //hsn: (productId.toString() + item?.id?.toString()).padStart(6, '0')
                hsn: '7113'
            },
            successNotification: false,
            errorNotification: false
          });
      });
    } catch (error) {
      console.error("Error creating Product Types:", error);
    }
  };
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
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
        <Form.Item
          label="Manufacturer"
          name="manufacturer"
          rules={[
            {
              required: false,
              message: "Please enter Manufacturer",
            },
          ]}
        > 
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
