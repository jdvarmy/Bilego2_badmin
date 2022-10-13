import React, { ChangeEvent, FC, LegacyRef, memo, ReactElement, useRef } from 'react';

type UploadProps = {
  children: ReactElement;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  multiple?: boolean;
};

const UploadFiles: FC<UploadProps> = ({ onChange, accept = 'image/*', multiple = true, children }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div onClick={() => ref.current?.click()}>
      <input
        accept={accept}
        ref={ref as LegacyRef<HTMLInputElement> | null}
        multiple={multiple}
        type='file'
        style={{ display: 'none' }}
        onChange={onChange}
      />
      {children}
    </div>
  );
};

export default memo(UploadFiles);
