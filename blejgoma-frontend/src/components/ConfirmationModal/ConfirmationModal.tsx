import React, { useEffect } from "react";

import { Modal } from "../shared/Modal/Modal";
import { useRouter } from "../../lib/hooks/useRouter";

import { Icon, IconDefinition } from "../shared/Icon/Icon";
import Button from "../shared/Button/Button";

import "./ConfirmationModal.scss";
export interface Props {
  showCloseButton?: boolean;
  confirmationData: {
    icon?: IconDefinition;
    title?: string;
    text?: string;
    isOpen: boolean;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  };
}

export default function ConfirmationModal(props: Props) {
  const router = useRouter();

  useEffect(() => {
    cancel();
  }, [router.location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const confirm = () => {
    if (props.confirmationData.onConfirm) {
      props.confirmationData.onConfirm();
    }
  };

  const cancel = () => {
    if (props.confirmationData.onCancel) {
      props.confirmationData.onCancel();
    }
  };

  return (
    <div className="ConfirmationModal">
      <Modal isOpen={props.confirmationData.isOpen} toggle={() => cancel()}>
        <div className="ConfirmationModal__content">
          {props.confirmationData.icon && (
            <Icon icon={props.confirmationData.icon} />
          )}
          {props.confirmationData.title && (
            <h5 className="ConfirmationModal__title">
              {props.confirmationData.title}
            </h5>
          )}
          <h6 className="ConfirmationModal__text">
            {props.confirmationData.text}
          </h6>
          <Button label="NË RREGULL" onClick={confirm} />
        </div>
      </Modal>
    </div>
  );
}
