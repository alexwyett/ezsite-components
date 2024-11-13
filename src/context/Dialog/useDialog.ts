import { useContext, useEffect } from "react";
import { DialogContext, SetDialogContext, DialogAction } from ".";

/**
 * @return {Function} Context
 */
export function useReadDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error(
      'useReadDialog must be used within a DialogContext'
    );
  }

  return context;
}

/**
 * @return {Function} Set Context
 */
export function useSetDialog() {
  const context = useContext(SetDialogContext);
  if (context === undefined) {
    throw new Error(
      'useSetDialog must be used within a SetDialogContext'
    );
  }

  return context;
}

/**
 * @param {string} id 
 * @param {boolean} open 
 * 
 * @returns {boolean}
 */
export function useWatchDialog(id: string, open: boolean) {
  const setter = useSetDialog();
  const data = useReadDialog();

  useEffect(() => {
    if (id) {
      setter({ type: DialogAction.ADD_DIALOG, payload: id });
    }
  }, [setter, id]);

  useEffect(() => {
    if (id) {
      if (data.closed.includes(id) && open) {
        setter({ type: DialogAction.OPEN_DIALOG, payload: id });
      }
      if (data.open.includes(id) && !open) {
        setter({ type: DialogAction.CLOSE_DIALOG, payload: id });
      }
    }
  }, [open, data, setter, id]);

  return {
    dialogOpen: data.open.includes(id) && !data.closed.includes(id),
    isOnTop: data.open.length > 0 ? data.open[data.open.length - 1] === id : false
  }
}