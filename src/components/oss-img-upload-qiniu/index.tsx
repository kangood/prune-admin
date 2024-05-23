import { useQuery } from '@tanstack/react-query';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { service } from '@/http/axios/service';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

interface OSSDataType {
    host: string;
    dir: string;
    token: string;
    expire: number;
}

interface OSSUploadProps {
    value?: UploadFile;
    onChange?: (file?: UploadFile) => void;
}

export const OSSImageUploadQiniu = ({ value, onChange }: OSSUploadProps) => {
    // 处理value，查询的时候传过来是一个URL字符串，所以需要把URL转换成Upload识别的对象
    if (typeof value === 'string') {
        value = { name: 'image', uid: `__AUTO__${Date.now()}_0__`, url: value, status: 'done' };
    }
    // 获取七牛OSS信息
    const { data: OSSData, refetch } = useQuery<OSSDataType>(['getQiniuOSSInfo'], () =>
        service.get('/oss-middleware/getQiniuOSSInfo').then((res) => res.data),
    );

    /**
     * 文件被修改时的回调处理，去更新文件信息
     */
    const handleChange: UploadProps['onChange'] = ({ file }) => {
        if (file.status === 'removed') {
            onChange?.();
            return;
        }
        const newFile = {
            ...file,
            url: getKey(file).url,
        };
        onChange?.(newFile);
    };

    /**
     * 预览文件的操作，应该是读取后下载下来
     */
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    /**
     * 组装key & url
     */
    const getKey = (file: UploadFile) => {
        const suffix = file.name.slice(file.name.lastIndexOf('.'));
        const key = `${OSSData?.dir}${file.uid}${suffix}`;
        const url = `${OSSData?.host}/${key}`;
        return { key, url };
    };

    /**
     * 传入七牛云OSS上传信息
     */
    const getExtraData: UploadProps['data'] = (file) => ({
        token: OSSData?.token,
        key: getKey(file).key,
    });

    /**
     * 上传之前对OSSData做检查，过期则刷新
     */
    const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
        if (!OSSData) return false;

        if (OSSData.expire < Date.now()) {
            await refetch();
        }
        return file;
    };

    return (
        <ImgCrop rotationSlider>
            <Upload
                name="file"
                listType="picture-card"
                action="https://up-z2.qiniup.com"
                fileList={value ? [value] : []}
                data={getExtraData}
                onChange={handleChange}
                onPreview={onPreview}
                beforeUpload={beforeUpload}
            >
                + 更新头像
            </Upload>
        </ImgCrop>
    );
};

OSSImageUploadQiniu.defaultProps = {
    value: null,
    onChange: () => {},
};
