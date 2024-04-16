import { useShow, useOne, useMany, HttpError } from "@refinedev/core"
import { PdfLayout } from './InvoicePdf';
import { Show, MarkdownField } from "@refinedev/antd";

import { Typography } from "antd";
import { log } from "console";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

export const InvoiceShow = () => {
    const { queryResult } = useShow({
        meta: {
            populate: ["taxes", "invoice_items", "invoice_items.purity", "invoice_items.product_type", 
            "invoice_items.product_type.product",
            "invoice_items.product_type.type", "customer"]
        }
    });

    console.log(queryResult);
    const record = queryResult?.data?.data;
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