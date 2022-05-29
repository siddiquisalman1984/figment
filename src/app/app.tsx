import styles from "./app.module.css";
import { Header } from "./components/Header";
import { TransactionView } from "./components/TransactionView";
import { NotificationsProvider } from "./providers/NotificationsContext";
import { TransactionType } from "./types";

const App = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.copy}>
        <NotificationsProvider>
          <TransactionView transactionType={TransactionType.Near} />
        </NotificationsProvider>
      </section>
      <section className={styles.features}></section>
      <footer className={styles.footer}></footer>
    </main>
  );
};

export default App;
