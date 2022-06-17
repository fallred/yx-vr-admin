import React, { FC, useEffect, useState, useRef } from "react";
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { ImageUtils } from 'braft-finder';
import Icon, {PictureOutlined} from '@ant-design/icons';
import { Upload } from "antd";
import 'braft-editor/dist/index.css';

interface EditorProps {
    content: string;
}

const UEditor: FC<EditorProps> = props => {
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ];
    const {content, handleChange: handleChange1} = props;
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(content));
    
    const handleChange = (editorState) => {
        setEditorState(editorState);
        handleChange1(editorState.toHTML());
    };
    const uploadHandler = (param) => {
        if (!param.file) {
          return false;
        }
        const eState = ContentUtils.insertMedias(editorState, [{
            type: 'IMAGE',
            url: URL.createObjectURL
        }]);
        setEditorState(eState);
    
    };
    const getValue = () => {
    };
    useEffect(()=> {
        const editorContent = BraftEditor.createEditorState(content);
        setEditorState(editorContent);
    }, [content]);
    const extendControls = [
        {
          key: 'antd-uploader',
          type: 'component',
          component: (
            <Upload
              accept="image/*"
              showUploadList={false}
              customRequest={uploadHandler}
            >
              {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
              <button type="button" className="control-item button upload-button" data-title="插入图片">
                {/* <Icon type="picture" theme="filled" /> */}
                <PictureOutlined />
              </button>
            </Upload>
          )
        }
    ];
    return (
        <BraftEditor
            className="my-editor"
            placeholder="请输入正文内容"
            value={editorState}
            onChange={handleChange}
            controls={controls}
            extendControls={extendControls}
        />
    );
};
export default UEditor;