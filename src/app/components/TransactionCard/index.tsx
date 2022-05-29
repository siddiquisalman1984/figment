import {
  Transaction,
  TransactionType,
  TransactionTypeImage,
} from "../../types";
import Card from "../../../design-system/organisms/Card";
import InputGroup from "../../../design-system/molecules/InputGroup";
import Input from "../../../design-system/atoms/Input";

export interface TransactionCardProps {
  readonly transaction: Transaction;
  readonly transactionType: TransactionType;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  transactionType,
}) => {
  return (
    <Card
      key={`card_${transaction.id}`}
      side="lg"
      className="w-full bg-gray-900"
    >
      <Card.Image
        src={TransactionTypeImage.get(transactionType)}
        alt={transactionType}
      />
      <Card.Body className="items-center text-center bg-gray-800">
        <>
          <InputGroup className="w-full">
            <span>Sender</span>
            <Input
              type="text"
              placeholder="10"
              bordered
              className="w-full"
              disabled
              value={transaction?.sender}
            />
          </InputGroup>
          <InputGroup className="w-full">
            <span>Receiver</span>
            <Input
              type="text"
              placeholder="10"
              bordered
              className="w-full"
              disabled
              value={transaction?.receiver}
            />
          </InputGroup>
          {transaction?.actions?.map((action) => {
            return (
              <InputGroup
                className="w-full"
                key={`${transaction.id}_${action.type}`}
              >
                <Input
                  type="text"
                  placeholder="10"
                  bordered
                  className="w-full"
                  disabled
                  value={
                    "deposit" in action?.data
                      ? Number(action?.data?.deposit) * 10 ** -24
                      : "-"
                  }
                />
                <span>{transactionType.toLocaleUpperCase()}</span>
              </InputGroup>
            );
          })}
          <InputGroup className="w-full">
            <span className="w-32">Gas Burnt</span>
            <Input
              type="text"
              placeholder="10"
              bordered
              className="w-full"
              disabled
              value={transaction?.gas_burnt}
            />
          </InputGroup>
        </>
      </Card.Body>
    </Card>
  );
};
