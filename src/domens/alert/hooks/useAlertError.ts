import { useAppDispatch } from '../../store';
import { addAlertErrorAsync } from '../store/alertThunk';
import { ServerErrorStatus, isServerErrorStatusGuard } from '../types/types';

class RejectWithValue<Payload, RejectedMeta> {
  constructor(public readonly payload: Payload, public readonly meta: RejectedMeta) {}
}

export function useAlertError(error: unknown, rejectWithValue: (value: unknown) => RejectWithValue<unknown, unknown>) {
  const dispatch = useAppDispatch();

  if (isServerErrorStatusGuard(error)) {
    dispatch(addAlertErrorAsync(error as ServerErrorStatus));
    return rejectWithValue(error);
  }
}
