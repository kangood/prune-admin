import { useQuery } from '@tanstack/react-query';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { service } from '@/http/axios/service';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

interface OSSDataType {
    host: string;
    dir: string;
    expire: string; // 采用默认失效时间，24 小时
    accessId: string;
    policy: string;
    signature: string;
}

interface OSSUploadProps {
    value?: UploadFile;
    onChange?: (file?: UploadFile) => void;
}

export const OSSImageUploadAli = ({ value, onChange }: OSSUploadProps) => {
    // 处理value，查询的时候传过来是一个URL字符串，所以需要把URL转换成Upload识别的对象
    if (typeof value === 'string') {
        value = { name: 'image', uid: `__AUTO__${Date.now()}_0__`, url: value, status: 'done' };
    }
    // 获取阿里OSS信息
    const { data: OSSData, refetch } = useQuery<OSSDataType>(['getAliOSSInfo'], () =>
        service.get('/oss-middleware/getAliOSSInfo').then((res) => res.data),
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
     * 传入Antd定义的阿里OSS上传信息
     */
    const getExtraData: UploadProps['data'] = (file) => ({
        key: getKey(file).key,
        OSSAccessKeyId: OSSData?.accessId,
        policy: OSSData?.policy,
        Signature: OSSData?.signature,
    });

    /**
     * 上传之前对OSSData做检查，过期则刷新
     */
    const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
        if (!OSSData) return false;

        const expire = Number(OSSData.expire) * 1000;

        if (expire < Date.now()) {
            await refetch();
        }
        return file;
    };

    return (
        <ImgCrop rotationSlider>
            <Upload
                name="file"
                listType="picture-card"
                action={OSSData?.host}
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

OSSImageUploadAli.defaultProps = {
    value: null,
    onChange: () => {},
};
