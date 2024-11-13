import { cloneElement, PropsWithChildren, ReactElement, useCallback, useEffect, useId, useState } from "react"
import classNames from "classnames";
import Portal from "./Portal"
import { useWatchDialog } from "@/context/Dialog/useDialog";

export type DialogType = {
  isOpen: boolean, 
  disabled?: boolean, 
  forceReveal?: boolean, 
  onClose?: Function,
  wrapperId?: string,
  type?: string,
  className?: string,
  closeElement?: ReactElement
} & PropsWithChildren;

function Dialog({ 
  children, 
  isOpen, 
  onClose, 
  forceReveal = false,
  disabled = false,
  wrapperId,
  type = "confirm",
  className,
  closeElement
}: DialogType) {

  const [reveal, setReveal] = useState(false);
  const dialogId = useId();
  const { isOnTop } = useWatchDialog(dialogId, isOpen);

  const handleClose = useCallback((e: any) => {
    if (onClose && isOnTop) {
      onClose(e);
    }
  }, [onClose, isOnTop]);

	useEffect(() => {
		const closeOnEscapeKey = (e: any) => {
      if (e.key === "Escape" && !disabled) {
        handleClose(e);
      }
    }

		document.body.addEventListener("keydown", closeOnEscapeKey);
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, [handleClose, disabled, isOnTop]);

  useEffect(() => {
    setReveal(isOpen);
  }, [isOpen]);

	return (
		<Portal wrapperId={wrapperId}>
      <div 
        className={
          classNames(
            "dialog",
            "dialog--" + type,
            'transition-all duration-300',
            {
              'opacity-0 pointer-events-none': !isOpen,
              'opacity-100 pointer-events-all': isOpen,
            }
          )
        }
      >
        <div className="dialog-content">
          {onClose && closeElement && <>{cloneElement(closeElement, { onClick: handleClose }) }</>}
          <div 
            className={
              classNames(
                "dialog-content-inner",
                className || ''
              )
            }
          >
            {(reveal || forceReveal) && children}
          </div>
        </div>
      </div>
    </Portal>
	);
}

export default Dialog;