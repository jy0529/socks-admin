import { useForm } from "@refinedev/antd"
import { ISku } from "../interface"
import { ResourceName } from "../constant"
import { supabaseClient } from "../../../utility"
import { RcFile, UploadFile } from "antd/es/upload"
import { useState } from "react"

type UpsertType = "create" | "edit"

interface UseUpsertSkuProps {
    type: UpsertType
    id?: string
}

export const useUpsertSku = ({ type, id }: UseUpsertSkuProps) => {
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const { formProps, saveButtonProps } = useForm<ISku>({
        resource: ResourceName,
        action: type,
        id: id,
    })

    // 在保存时上传图片
    const handleSave = async (values: ISku) => {
        try {
            const uploadedUrls: string[] = []
            
            // 处理新上传的图片
            for (const file of fileList) {
                if (file.originFileObj) {
                    // 新上传的文件
                    const rcFile = file.originFileObj as RcFile
                    const fileType = rcFile.type.split('/')[1]
                    const fileName = `${rcFile.name.slice(0, 20)}}.${fileType}`
                    
                    await supabaseClient.storage
                        .from('images')
                        .upload(`sku_images/${fileName}`, rcFile, {
                            cacheControl: '3600',
                            upsert: true,
                        })

                    const { data } = await supabaseClient.storage
                        .from('images')
                        .getPublicUrl(`sku_images/${fileName}`)

                    uploadedUrls.push(data.publicUrl)
                } else if (file.url) {
                    // 已存在的图片（编辑模式）
                    uploadedUrls.push(file.url)
                }
            }

            // 将上传的图片URL设置到表单中
            formProps.form?.setFieldsValue({
                image_urls: uploadedUrls
            })

            // 返回包含图片URL的完整数据
            return {
                ...values,
                image_urls: uploadedUrls
            }
            
        } catch (error) {
            console.error('上传图片失败:', error)
            throw error
        }
    }


     const customSaveButtonProps = {
        ...saveButtonProps,
        onClick: async () => {
            try {
                const values = await formProps.form?.validateFields()
                if (values) {
                    const dataWithImages = await handleSave(values as ISku)
                    console.log('保存数据（包含图片URL）:', dataWithImages)
                    // 调用原始的保存逻辑
                    saveButtonProps.onClick?.()
                }
            } catch (error) {
                console.error('保存失败:', error)
            }
        }
    }


    return {
        formProps,
        saveButtonProps: customSaveButtonProps,
        onFileListChange: setFileList
    }
}