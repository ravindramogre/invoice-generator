import React, { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Button, Table } from "antd";
import { useCreate, useList } from "@refinedev/core";

export const TypeCreate = () => {
  const { formProps, saveButtonProps, onFinish} = useForm();
  const createProductTypes = useCreate();
  const { data: productsList, isLoading } = useList({
    resource: "products"
  })

  const handleOnFinish = async (values: any) => {
    const {type, rate} = values;
    try {
        //console.log(values);
        const response = await onFinish({
          type,
          rate
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
  const handleCreateProductTypes = async (typeId: number) => {
    try {
      productsList?.data?.forEach(async (item) => {
        await createProductTypes.mutate({
            resource: "producttypes", 
            values: {
                product: {
                    connect: [item?.id],
                },
                type: {
                    connect: [typeId]
                },
                //hsn: (item?.id?.toString() + typeId.toString()).padStart(6, '0')
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
