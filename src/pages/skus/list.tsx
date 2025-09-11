import React from "react";
import { ISku } from "../../interfaces";
import {
    List,
    useTable,
} from "@refinedev/antd";
import { Table } from "antd";

export const SkusList: React.FC = () => {
    const { tableProps, sorter } = useTable<ISku>({
        sorters: {
            initial: [
                {
                    field: "created_at",
                    order: "desc"
                }
            ]
        },
        meta: {
            select: '*'
        }
    })

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
            </Table>
        </List>
    )

}