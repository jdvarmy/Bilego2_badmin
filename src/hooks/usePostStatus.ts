import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BaseRecordStatus } from '../typings/enum';

export function usePostStatus(): { status: BaseRecordStatus; uid?: string } {
  const location = useLocation();
  const { state, pathname } = location;
  const [status, setStatus] = useState<BaseRecordStatus.create | BaseRecordStatus.edit>(BaseRecordStatus.create);

  useEffect(() => {
    // @ts-ignore
    if (state?.edit || pathname.includes(BaseRecordStatus.edit)) {
      setStatus(BaseRecordStatus.edit);
    }
  }, [location]);

  return { status, uid: status === BaseRecordStatus.edit ? pathname.split('/').at(-1) : undefined };
}
