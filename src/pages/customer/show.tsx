import { useShow } from "@refinedev/core"
import { Show } from "@refinedev/antd";

import { Typography } from "antd";

const { Title, Text } = Typography;

export const CustomerShow = () => {
    const { queryResult } = useShow();
    const record = queryResult?.data?.data;
    return (
        <Show isLoading={false}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Name</Title>
            <Text>{record?.name}</Text>
            <Title level={5}>Phone No</Title>
            <Text>{record?.phone_number}</Text>
            <Title level={5}>Email</Title>
            <Text>{record?.email}</Text>
            <Title level={5}>Pincode</Title>
            <Text>{record?.pincode}</Text>
            <Title level={5}>Address Line 1</Title>
            <Text>{record?.address_line_1}</Text>
            <Title level={5}>Address Line 2</Title>
            <Text>{record?.address_line_2}</Text>
            <Title level={5}>State</Title>
            <Text>{record?.state}</Text>
        </Show>
    );
};