import { MOCK_TRANSACTIONS } from "../mock/transactions.mock";
import { comparator, condition, filterAndSortTransaction } from "./";

describe("filterSuccessfulTransactionByType()", () => {
  test("should fire the callback function (3)", async () => {
    const callback = jest.fn();
    const sort = jest.fn();

    filterAndSortTransaction(MOCK_TRANSACTIONS, callback, sort);
    expect(callback).toHaveBeenCalledTimes(4);
    expect(sort).toHaveBeenCalledTimes(0);

    const actual = filterAndSortTransaction(
      MOCK_TRANSACTIONS,
      condition,
      comparator
    );
    expect(actual.length).toBe(2);
    expect(actual[0].id).toBe(208848);
    expect(actual[1].id).toBe(208851);
  });
});

describe("comparator()", () => {
  test("should compare the transactions", async () => {
    expect(
      comparator(MOCK_TRANSACTIONS[0], MOCK_TRANSACTIONS[1])
    ).toBeGreaterThan(0);
    expect(comparator(MOCK_TRANSACTIONS[1], MOCK_TRANSACTIONS[0])).toBeLessThan(
      0
    );
  });
});

describe("condition()", () => {
  test("should check if condition is satisfied", async () => {
    expect(condition(MOCK_TRANSACTIONS[0])).toBe(true);
    expect(condition(MOCK_TRANSACTIONS[1])).toBe(false);
    expect(condition(MOCK_TRANSACTIONS[2])).toBe(false);
  });
});
