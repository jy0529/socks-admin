import { Edit } from "@refinedev/antd"
import { useParsed } from "@refinedev/core"
import { SkuForm } from "../../components"
import { useUpsertSku } from "../../domains/sku/hooks/useUpsertSku"
import { SkuUpsertType } from "../../domains/sku/interface"

export const SkuEdit: React.FC = () => {
    const { id } = useParsed()
    const type: SkuUpsertType = "edit"

    const { formProps, saveButtonProps, onFileListChange } = useUpsertSku({ type, id: id?.toString() })
    
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <SkuForm type={type} formProps={formProps} onFileListChange={onFileListChange} />
        </Edit>
    )
}
