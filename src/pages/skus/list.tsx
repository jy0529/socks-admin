import React from "react";
import { ISku } from "../../interfaces";
import {
    List,
    useTable,
} from "@refinedev/antd";
import { Button, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

export const SkusList: React.FC = () => {

    const navigate = useNavigate()

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

    const renderActions = (record: ISku) => {
        return (
            <Button type="link" icon={<EditOutlined />} onClick={(e) => {
                e.preventDefault()
                navigate(`/skus/edit/${record.id}`)
            }} title="Edit"></Button>
        )
    }

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column key="id" dataIndex="id" title="ID" />
                <Table.Column key="actions" render={renderActions}></Table.Column>
            </Table>
        </List>
    )

}