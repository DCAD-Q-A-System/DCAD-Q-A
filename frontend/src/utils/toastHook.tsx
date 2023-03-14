import { useMemo } from "react";
import { useAppDispatch } from "../store/hooks";
import { setContent, setShow, setTitle, setVariant } from "../store/toastSlice";

export function toastHook() {
  const dispatch = useAppDispatch();
  const actions = useMemo(
    () => ({
      setToast(
        title: string,
        content: string,
        variant: string,
        isShow: boolean
      ) {
        dispatch(setContent(content));
        dispatch(setTitle(title));
        dispatch(setVariant(variant));
        dispatch(setShow(isShow));
      },
    }),
    [dispatch]
  );
  return actions;
}
