import { DeleteButton, EditButton, List, SaveButton, ShowButton, TextField, useTable } from '@refinedev/antd'
import { Form, Input, Space, Table } from 'antd';
import React from 'react'

export const CustomerList = () => {
    const { tableProps, searchFormProps } = useTable();
  return (
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title="ID"
            render={(value) => <TextField value={value} />}
          />
          <Table.Column
            dataIndex="name"
            title="Name"
            render={(value, record) => <TextField value={value} />}
          />
          <Table.Column
            dataIndex="email"
            title="Email"
            render={(value, record) => <TextField value={value} />}
          />
          <Table.Column
            dataIndex="phone_number"
            title="Phone No"
            render={(value, record) => <TextField value={value} />}
          />
          <Table.Column
            title="Actions"
            dataIndex="actions"
            render={(_: any, record: any) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
                {/* <DeleteButton hideText size="small" recordItemId={record.id} /> */}
              </Space>
            )}
          />
        </Table>
      </List>
  )
}
