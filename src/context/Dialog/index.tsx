import { createContext, useReducer, Dispatch, Reducer } from 'react';
import DialogReducer from './dialogReducer';

export enum DialogAction {
  ADD_DIALOG = 'ADD_DIALOG',
  OPEN_DIALOG = 'OPEN_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG'
}

export type DialogState = {
  open: string[];
  closed: string[];
}

export type DialogPayload = {
  type: DialogAction;
  payload: string;
}

const initialState = {
  open: [],
  closed: [],
} as DialogState;

export const DialogContext = createContext<DialogState>(initialState);
export const SetDialogContext = createContext<Dispatch<DialogPayload>>(() => {});

/**
 * @param  {object}  props The component attributes as props.
 * @return {Element}       The child elements wrapped in a context provider.
 */
export default function DialogProvider(props: any) {
  const { children } = props;

  const [dialogState, updateDialogs] = useReducer<Reducer<any, any>>(
    DialogReducer,
    initialState
  );

  return (
    <DialogContext.Provider value={dialogState}>
      <SetDialogContext.Provider value={updateDialogs}>
        {children}
      </SetDialogContext.Provider>
    </DialogContext.Provider>
  );
}
