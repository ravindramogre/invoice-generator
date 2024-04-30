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
            populate: ["taxes", "invoiceitems", "invoiceitems.purity", "invoiceitems.producttype", 
            "invoiceitems.producttype.product",
            "invoiceitems.producttype.type", "customer"]
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