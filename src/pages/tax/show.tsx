import { useShow } from "@refinedev/core"
import { Show } from "@refinedev/antd";

import { Typography } from "antd";

const { Title, Text } = Typography;

export const TaxShow = () => {
    const { queryResult } = useShow();
    const record = queryResult?.data?.data;
    return (
        <Show isLoading={false}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Tax</Title>
            <Text>{record?.name}</Text>
            <Title level={5}>Percentage</Title>
            <Text>{record?.percentage}</Text>
        </Show>
    );
};