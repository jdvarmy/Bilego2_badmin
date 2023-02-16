import { Editor } from '@tinymce/tinymce-react';
import { ITinyEvents } from '@tinymce/tinymce-react/lib/cjs/main/ts/Events';
import React, { memo, useEffect, useRef } from 'react';

import { useSetEventStateField } from '../../hooks/useSetEventStateField';

type Props = {
  text?: string;
};

const plugins = [
  // 'a11ychecker',
  // 'advcode',
  // 'casechange',
  // 'export',
  // 'formatpainter',
  // 'editimage',
  // 'linkchecker',
  // 'checklist',
  // 'mediaembed',
  // 'pageembed',
  // 'permanentpen',
  // 'powerpaste',
  // 'advtable',
  // 'tableofcontents',
  // 'tinycomments',
  // 'tinymcespellchecker',
  'image',
  'media',
  'autolink',
  'lists',
  'table',
  'anchor',
  'charmap',
  'codesample',
  'emoticons',
  'link',
  'searchreplace',
  'visualblocks',
  'wordcount',
];

const TextRedactor = ({ text }: Props) => {
  const editorRef = useRef(null);
  const timerRef = useRef<NodeJS.Timeout>(null);
  const handleChangeText = useSetEventStateField('text');

  const handleInit: ITinyEvents['onInit'] = (evt, editor) => {
    timerRef.current = setTimeout(() => {
      editor.setContent(text ?? '');
    }, 0);
    editorRef.current = editor;
  };

  const handleChange: ITinyEvents['onChange'] = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      handleChangeText(content);
    }
  };

  useEffect(() => () => clearTimeout(timerRef.current));

  console.log('render TextRedactor');

  return (
    <div>
      <Editor
        apiKey='mkbhjdmg9784ilfvaggoe0alboviospc5ch4sdz6e8yqqwic'
        // @ts-ignore
        onInit={handleInit}
        onChange={handleChange}
        init={{
          height: 350,
          menubar: false,
          plugins,
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          toolbar_mode: 'floating',
          tinycomments_mode: 'embedded',
        }}
      />
    </div>
  );
};

export default memo(TextRedactor);
