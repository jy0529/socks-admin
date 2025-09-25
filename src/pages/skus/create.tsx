import { Create } from "@refinedev/antd"
import { SkuForm } from "../../components"
import { useUpsertSku } from "../../domains/sku/hooks/useUpsertSku"
import { SkuUpsertType } from "../../domains/sku/interface"

export const SkuCreate: React.FC = () => {
    const type: SkuUpsertType = "create"
    const { formProps, saveButtonProps, onFileListChange } = useUpsertSku({ type, })

    return (
        <Create saveButtonProps={saveButtonProps}>
            <SkuForm type={type} formProps={formProps} onFileListChange={onFileListChange} />
        </Create>
    )
}