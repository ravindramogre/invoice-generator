import { EditButton, List, SaveButton, ShowButton, TextField, useTable } from '@refinedev/antd'
import { Form, Input, Space, Table } from 'antd';
import React from 'react'

export const InvoiceList = () => {
    const { tableProps, searchFormProps } = useTable({
      meta: {
        populate: ["taxes", "invoice_items", "customer"]
      },
      sorters: {
        initial: [
          {
            field: "createdAt",
            order: "desc",
          },
        ],
      },
        onSearch: (values: any) => {
            return [
              {
                field: "invoice_no",
                operator: "contains",
                value: values.invoice_no,
              },
            ];
          },
    });
   // console.log(tableProps);
  return (
    <div>
     <Form {...searchFormProps} layout="inline">
        <Form.Item name="invoice_no">
          <Input placeholder="Search by invoice no" />
        </Form.Item>
        <SaveButton icon={<></>} onClick={searchFormProps.form?.submit}> 
            Search
        </SaveButton>
      </Form>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title="ID"
            render={(value) => <TextField value={value} />}
          />
          <Table.Column
            dataIndex="invoice_no"
            title="Invoice Number"
            render={(value, record) => <TextField value={value} />}
          />
          {/* <Table.Column
            dataIndex="salesman"
            title="Salesman"
            render={(value, record) => <TextField value={value} />}
          /> */}
          <Table.Column
            title="Actions"
            dataIndex="actions"
            render={(_: any, record: any) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </div>
  )
}
