import { useShow, useOne, useMany, HttpError } from "@refinedev/core"
import { PdfLayout } from './InvoicePdf';
import { Show } from "@refinedev/antd";

import { Typography } from "antd";
import { log } from "console";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

export const InvoiceShow = () => {
    const { queryResult } = useShow({
        meta: {
            populate: ["taxes", "invoiceitems", "invoiceitems.purity", "invoiceitems.product_type", 
            "invoiceitems.product_type.product",
            "invoiceitems.product_type.type", "customer"]
        }
    });

    const { data, isLoading, isError } = queryResult;
    const record = queryResult?.data?.data;
    if (isLoading) {
        return <p>Loading..</p>;
    }
    return (
        <Show isLoading={false}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Invoice Number</Title>
            <Text>{record?.invoice_no}</Text>
            <Title level={5}>Name of Customer</Title>
            <Text>{record?.customer?.name}</Text>
            <PdfLayout record={record}/>
        </Show>
    );
};