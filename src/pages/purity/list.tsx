import { DeleteButton, EditButton, List, SaveButton, ShowButton, TextField, useTable } from '@refinedev/antd'
import { Form, Input, Space, Table } from 'antd';
import React from 'react'

export const PurityList = () => {
    const { tableProps, searchFormProps } = useTable();
    console.log(tableProps);
  return (
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title="ID"
            render={(value) => <TextField value={value} />}
          />
          <Table.Column
            dataIndex="purity_percentage"
            title="Percentage"
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
                {/* <DeleteButton hideText size="small" recordItemId={record.id} /> */}
              </Space>
            )}
          />
        </Table>
      </List>
  )
}
