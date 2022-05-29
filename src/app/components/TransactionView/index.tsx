import { TransactionType, Transaction } from "../../types";
import React, { useState } from "react";
import { getTransactions } from "../../api";
import useInterval from "../../hooks/useInterval";
import { POLLING_DELAY } from "../../constants";
import {
  comparator,
  condition,
  filterAndSortTransaction,
  getDifference,
} from "../../utils";
import Carousel from "../../../design-system/molecules/Carousel";
import CarouselItem from "../../../design-system/molecules/Carousel/CarouselItem";
import Spinner from "../../../design-system/atoms/Spinner";
import { useNotifications } from "../../providers/NotificationsContext";
import { TransactionCard } from "../TransactionCard";
import Button from "../../../design-system/atoms/Button";
import { NotificationManager } from "../NotificationManager";

export interface TransactionViewType {
  readonly transactionType: TransactionType;
}

const buttonStyle = (value: string) => {
  return <Button color="primary">{value}</Button>;
};

export const TransactionView: React.FC<TransactionViewType> = ({
  transactionType,
}) => {
  const [transactions, setTransaction] = useState<Transaction[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setNotification } = useNotifications();

  useInterval(
    () => {
      setIsLoading(true);

      getTransactions(transactionType)
        .then((response) => {
          const data = filterAndSortTransaction(
            response?.data,
            condition,
            comparator
          );
          if (
            data &&
            data.length > 0 &&
            transactions &&
            transactions.length > 0
          ) {
            if (
              getDifference(data, transactions).length > 0 ||
              getDifference(transactions, data).length > 0
            ) {
              setNotification({
                message: "Transactions updated",
                variant: "info",
              });
            }
          }
          setTransaction(data);
          if (data && data.length === 0) {
            setNotification({
              message: "No transactions were found",
              variant: "warning",
            });
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setNotification({
            message: error.message,
            variant: "error",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    // Delay in milliseconds or null to stop it
    transactionType ? POLLING_DELAY : null
  );
  return (
    <>
      <NotificationManager />
      {isLoading && !transactions && (
        <div className="flex items-center justify-center h-1/3">
          <Spinner />
        </div>
      )}
      {transactions && transactions.length > 0 && (
        <Carousel
          className="rounded-box"
          display="sequential"
          buttonStyle={buttonStyle}
        >
          {transactions?.map((transaction) => {
            return (
              <CarouselItem key={`carousel_${transaction.id}`}>
                <TransactionCard
                  transaction={transaction}
                  transactionType={transactionType}
                />
              </CarouselItem>
            );
          })}
        </Carousel>
      )}
    </>
  );
};
