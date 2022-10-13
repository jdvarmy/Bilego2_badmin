import React, { useRef, memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TextField } from '@mui/material';
import { useChangeFnEventField } from '../../../hooks/useChangeFnEventField';

type Props = {
  title?: string;
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

const TextRedactor = ({ title }: Props) => {
  const editorRef = useRef(null);

  const handleChange = useChangeFnEventField('title');

  const log = () => {
    if (editorRef.current) {
      // @ts-ignore
      console.log(editorRef.current.getContent());
    }
  };

  console.log('render TextRedactor');

  return (
    <div>
      <TextField
        label='Заголовок'
        type='text'
        fullWidth
        sx={{ mb: 2 }}
        value={title || ''}
        focused={!!title}
        onChange={handleChange}
      />
      <Editor
        apiKey='mkbhjdmg9784ilfvaggoe0alboviospc5ch4sdz6e8yqqwic'
        // @ts-ignore
        onInit={(evt, editor) => (editorRef.current = editor)}
        onChange={log}
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
