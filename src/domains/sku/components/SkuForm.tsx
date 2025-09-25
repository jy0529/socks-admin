import { Form, FormProps, InputNumber, Upload } from "antd"
import { UploadFile } from "antd/es/upload"
import { useState, useEffect, useCallback } from "react"
import { SkuUpsertType } from "../interface"
import { getImageName } from "../../../utility"

interface SkuFormProps {
    type: SkuUpsertType
    formProps: FormProps,
    onFileListChange: (fileList: UploadFile[]) => void
}

export const SkuForm: React.FC<SkuFormProps> = ({ type, formProps, onFileListChange }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const isEditMode = type === "edit"

    // 处理文件选择，但不立即上传
    const handleFileChange = useCallback(({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList as UploadFile[])
        onFileListChange(newFileList)
    }, [onFileListChange])

    // 在编辑模式下，初始化已有的图片
    useEffect(() => {
        if (isEditMode && formProps.initialValues?.image_urls) {
            const existingImages = formProps.initialValues.image_urls.map((url: string) => ({
                uid: url,
                name: getImageName(url),
                thumbUrl: url,
                status: 'done' as const,
                url: url,
                originFileObj: null
            }))
            handleFileChange({
                fileList: existingImages
            })
        }
    }, [isEditMode, formProps.initialValues, handleFileChange])

    return (
        <Form {...formProps} layout="vertical">
            <Form.Item label="成本价" name='cost_price'> 
                <InputNumber />
            </Form.Item>
            <Form.Item label="建议售价" name='suggested_price'> 
                <InputNumber />
            </Form.Item>
            <Form.Item label="图片" name="image_urls">
                <Upload.Dragger 
                    name="file" 
                    listType="picture" 
                    multiple
                    fileList={fileList}
                    onChange={handleFileChange}
                    beforeUpload={() => false} // 阻止自动上传
                    showUploadList={{
                        showPreviewIcon: true,
                        showRemoveIcon: true,
                    }}
                >
                    <p className="ant-upload-text">拖拽文件到此区域上传</p>
                </Upload.Dragger>
            </Form.Item>
        </Form>
    )
}
