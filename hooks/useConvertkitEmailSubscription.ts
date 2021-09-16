import { useState } from "react";

export const STATUS_INITIAL = "initial";
export const STATUS_SUCCESS = "success";
export const STATUS_ERROR = "error";

type Status =
  | typeof STATUS_INITIAL
  | typeof STATUS_SUCCESS
  | typeof STATUS_ERROR;

interface UseConvertkitEmailSubscriptionConfig {
  endpoint: string;
}

export const useConvertkitEmailSubscription = ({
  endpoint,
}: UseConvertkitEmailSubscriptionConfig) => {
  const [status, setStatus] = useState<Status>(STATUS_INITIAL);
  const [email, setEmail] = useState("");

  const FORM_URL = endpoint;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData(e.target);

    try {
      const response = await fetch(FORM_URL, {
        method: "post",
        body: data,
        headers: {
          accept: "application/json",
        },
      });
      setEmail("");
      const json = await response.json();

      if (json.status === "success") {
        setStatus(STATUS_SUCCESS);
      } else if (json.status === 'failed') {
        setStatus(STATUS_ERROR);
      }
    } catch (err) {
      setStatus(STATUS_ERROR);
    }
  };

  const handleChangeEmail = (event: any) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleTryAgain = () => {
    setStatus(STATUS_INITIAL);
  };

  return {
    email,
    handleSubmit,
    handleChangeEmail,
    handleTryAgain,
    FORM_URL,
    status
  };
};

