import React, { createContext, useState } from 'react';

export interface IErrorContext {
  msg: string | undefined;
  display: boolean;
  showLoader: (display: boolean) => void;
  showError: (m: string | undefined) => void;
}

/** Context for error messages */
export const ErrorContext = createContext<IErrorContext>({
  msg: undefined,
  display: false,
  showLoader: (d) => console.log(d),
  showError: (m) => console.log(m),
});

export interface IErrorProvider {
  children?: React.ReactNode;
}

/** Provider for error message context */
function ErrorProvider(props: IErrorProvider): JSX.Element {
  const [msg, setMsg] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <ErrorContext.Provider
      value={{ msg, showError: setMsg, display: loader, showLoader: setLoader }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
}

export default ErrorProvider;
