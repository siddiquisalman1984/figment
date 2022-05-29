import { TransactionType, Transaction } from "../../types";
import React, { useState } from "react";
import { getTransactions } from "../../api";
import useInterval from "../../hooks/useInterval";
import { POLLING_DELAY } from "../../constants";
import { comparator, condition, filterAndSortTransaction } from "../../utils";
import Carousel from "../../../design-system/molecules/Carousel";
import CarouselItem from "../../../design-system/molecules/Carousel/CarouselItem";
import Spinner from "../../../design-system/atoms/Spinner";
import { useNotifications } from "../../providers/NotificationsContext";
import { TransactionCard } from "../TransactionCard";
import Button from "../../../design-system/atoms/Button";

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
          const transactions = filterAndSortTransaction(
            response?.data,
            condition,
            comparator
          );
          setTransaction(transactions);
          if (transactions && transactions.length === 0) {
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
      {isLoading && !transactions && <Spinner />}
      {transactions && transactions.length > 0 && (
        <Carousel
          className="rounded-box"
          display="sequential"
          buttonStyle={buttonStyle}
        >
          {transactions?.map((transaction) => {
            return (
              <CarouselItem key={`${transaction.id}`}>
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
