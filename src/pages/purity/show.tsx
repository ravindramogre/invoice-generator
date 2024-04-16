import { useShow } from "@refinedev/core"
import { Show } from "@refinedev/antd";

import { Typography } from "antd";

const { Title, Text } = Typography;

export const PurityShow = () => {
    const { queryResult } = useShow();
    const record = queryResult?.data?.data;
    return (
        <Show isLoading={false}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Purity</Title>
            <Text>{record?.purity_percentage}</Text>
            {/* <Title level={5}>Description</Title>
            <Text>{record?.description}</Text> */}
        </Show>
    );
};