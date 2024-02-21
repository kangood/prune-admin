import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Upload, UploadFile, UploadProps, message } from 'antd';
import { useState } from 'react';

import { useImportStationExcel } from '@/services/station';

interface StationImportFormProps {
    onClose: (isReload?: boolean) => void;
}

export const StationImportForm: React.FC<StationImportFormProps> = ({ onClose }) => {
    // 文件上传处理
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const props: UploadProps = {
        // 删除文件的回调
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        // 上传之前的处理，返回false则停止上传动作，变为手动上传
        beforeUpload: (file) => {
            if (fileList.length === 0) {
                setFileList([...fileList, file]);
            } else {
                message.error('当前最多允许上传1个文件');
            }
            return false;
        },
        fileList,
    };
    // 表单提交处理
    const [form] = Form.useForm();
    const { mutateAsync } = useImportStationExcel();
    const submitHandle = async () => {
        const values = await form.validateFields();
        await mutateAsync(values.file.file);
        onClose(true);
    };
    return (
        <Modal
            open
            title="导入Excel"
            okText="提交"
            cancelText="取消"
            onCancel={() => onClose()}
            onOk={submitHandle}
        >
            <Form form={form}>
                <Form.Item name="file">
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>点击上传</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};
