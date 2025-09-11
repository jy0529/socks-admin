import { Create, useForm } from "@refinedev/antd"
import { ISku } from "../../interfaces"
import { Form, InputNumber, Upload } from "antd"
import { RcFile } from "antd/es/upload"
import { supabaseClient } from "../../utility"

export const SkuCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<ISku>()

    const handleCustomRequest = async ({ file, onError, onSuccess }) => {
        try {
            const rcFile = file as RcFile
            await supabaseClient.storage
                .from('images')
                .upload(`sku_images/${rcFile.name}`, file, {
                    cacheControl: '3600',
                    upsert: true,
                })

                const { data } = await supabaseClient.storage
                    .from('images')
                    .getPublicUrl(`sku_images/${rcFile.name}`)

                const xhr = new XMLHttpRequest()
                onSuccess && onSuccess({
                    url: data.publicUrl
                }, xhr)

        } catch (error) {
            onError && onError(new Error(error))
        }
    }

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="成本价" name='cost_price'> 
                    <InputNumber />
                </Form.Item>
                <Form.Item label="建议售价" name='suggested_price'> 
                    <InputNumber />
                </Form.Item>
                <Form.Item label="图片" name="image_urls">
                    <Upload.Dragger name="file" listType="picture" multiple customRequest={handleCustomRequest}>
                        <p className="ant-upload-text">Drag & drop a file in this area</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form>
        </Create>
    )
}