import { DialogAction, DialogPayload, DialogState } from ".";

export default function DialogReducer(state: DialogState, action: DialogPayload) {
  if (action.type === DialogAction.OPEN_DIALOG) {
    const open = [...state.open].filter(id => id !== action.payload).concat([action.payload]);
    const closed = [...state.closed].filter(id => id !== action.payload);
    
    return {
      open,
      closed
    }
  }
  if (action.type === DialogAction.CLOSE_DIALOG) {
    const open = [...state.open].filter(id => id !== action.payload);
    const closed = [...state.closed].filter(id => id !== action.payload).concat([action.payload]);
    
    return {
      open,
      closed
    }
  }
  if (action.type === DialogAction.ADD_DIALOG) {
    const closed = [...state.closed].filter(id => id !== action.payload).concat([action.payload]);
    
    return {
      ...state,
      closed
    }
  }
}