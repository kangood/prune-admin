import { Form, FormItemProps } from 'antd';
import composeProps from 'rc-util/es/composeProps';
import React from 'react';

interface MyFormItemProps extends FormItemProps {
    render?: (children: React.ReactNode) => React.ReactElement;
}

interface MyFormItemChildrenProps {
    render?: MyFormItemProps['render'];
    children: React.ReactElement;
}

function MyFormItemChildren(props: MyFormItemChildrenProps) {
    const { render, children, ...rest } = props;
    // composeProps 合并执行 Form.Item 传的 onChange 以及组件本身的方法
    const newChildren = React.cloneElement(children, composeProps(children.props, rest, true));
    if (render) {
        return render(newChildren);
    }
    return newChildren;
}

/**
 * 自定义封装 Form.Item 增加 render API，用于DatePicker、Switch、Select 等不支持addonBefore、addonAfter API的组件
 */
export const MyFormItem = (props: MyFormItemProps) => {
    const { render, children, ...rest } = props;

    return (
        <Form.Item {...rest}>
            {React.isValidElement(children) ? (
                <MyFormItemChildren render={render}>{children}</MyFormItemChildren>
            ) : (
                children
            )}
        </Form.Item>
    );
};
