import { useShow } from "@refinedev/core"
import { Show } from "@refinedev/antd";

import { Typography } from "antd";

const { Title, Text } = Typography;

export const TypeShow = () => {
    const { queryResult } = useShow();
    const record = queryResult?.data?.data;
    return (
        <Show isLoading={false}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Material</Title>
            <Text>{record?.type}</Text>
            <Title level={5}>Rate</Title>
            <Text>{record?.rate}</Text>
        </Show>
    );
};