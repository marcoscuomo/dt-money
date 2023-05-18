import { ArrowCircleDown, ArrowCircleUp, CurrencyBtc } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionsContext";

export function Summary() {

  const { transactions } = useContext(TransactionContext);

  const sumary = transactions.reduce((acc, transaction) => {
    
    if(transaction.type === 'income') {
      acc.income += transaction.price;
      acc.total += transaction.price;
    } else {
      acc.outcome += transaction.price;
      acc.total -= transaction.price;
    }
    
    return acc;
  }, 
    {income: 0, outcome: 0, total: 0}
  );

  return(
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{sumary.income}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{sumary.outcome}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyBtc size={32} color="#fff" />
        </header>

        <strong>{sumary.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}