import { Fab } from "./components/Fab";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Line } from "../../components/Line";
import { api } from "../../../app/services/api";
import { CardTotal } from "./components/CardTotal";
import { CardBalance } from "./components/CardBalance";
import { CardAccount } from "./components/CardAccount";
import { FilterMonth } from "../../modals/FilterMonth";
import { CreateIncome } from "../../modals/CreateIncome";
import { CreateExpense } from "../../modals/CreateExpense";
import { CreateAccounts } from "../../modals/CreateAccounts";
import { useMonth } from "../../../app/shared/hooks/useMonth";
import { AccountModel } from "../../../app/models/AccountModel";

import { CurrencyDollar, PlusCircle, Wallet } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function Home() {
  const { setMonth, month } = useMonth();

  const [openFilterMonth, setOpenFilterMonth] = useState(false);
  const [openCreateIncome, setOpenCreateIncome] = useState(false);
  const [openCreateExpense, setOpenCreateExpense] = useState(false);
  const [openCreateAccounts, setOpenCreateAccounts] = useState(false);

  const [account, setAccount] = useState<AccountModel | null>(null);

  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [transactionTotal, setTransactionTotal] = useState<{
    expense: number;
    income: number;
    totalExpense: number;
    totalIncome: number;
    prevExpense: number;
    prevIncome: number;
    totalPrevIncome: number;
    totalPrevExpense: number;
  }>({
    expense: 0,
    income: 0,
    totalExpense: 0,
    totalIncome: 0,
    totalPrevExpense: 0,
    totalPrevIncome: 0,
    prevIncome: 0,
    prevExpense: 0,
  });

  async function getAccounts() {
    const data = (await api.get(`/accounts?month=${month}`)).data;
    setAccounts(data);
  }

  async function getTransactionsTotal() {
    const data = (await api.get(`/transactions/total?month=${month}`)).data;
    setTransactionTotal(data);
  }

  useEffect(() => {
    getAccounts();
    getTransactionsTotal();
  }, [
    openCreateAccounts,
    openCreateExpense,
    openCreateIncome,
    openFilterMonth,
  ]);

  return (
    <main className="h-screen relative w-screen p-6 flex flex-col gap-6">
      <Header
        openModalFilterMonth={() => setOpenFilterMonth(!openFilterMonth)}
      />

      <div className="flex flex-col gap-4 bg-slate-800 p-4 rounded-lg">
        <CardTotal
          title="Saldo atual"
          value={transactionTotal.totalIncome - transactionTotal.totalExpense}
        />

        <div className="flex items-center gap-4">
          <Link className="flex-1" to={"/transactions"}>
            <CardBalance
              title="Receita"
              icon={<CurrencyDollar size={20} weight="bold" />}
              value={transactionTotal.income}
              className="text-success-500 bg-success-100"
            />
          </Link>
          <Link className="flex-1" to={"/transactions"}>
            <CardBalance
              title="Despesa"
              icon={<CurrencyDollar size={20} weight="bold" />}
              value={transactionTotal.expense}
              className="text-danger-500 bg-danger-100"
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-slate-800 p-4 rounded-lg">
        <CardTotal
          title="Saldo previsão"
          value={
            transactionTotal.totalPrevIncome - transactionTotal.totalPrevExpense
          }
        />

        <div className="flex items-center gap-4">
          <CardBalance
            title="Prev. Receita"
            icon={<CurrencyDollar size={20} weight="bold" />}
            value={transactionTotal.prevIncome}
            className="text-success-100 bg-success-500"
          />
          <CardBalance
            title="Prev. Despesa"
            icon={<CurrencyDollar size={20} weight="bold" />}
            value={transactionTotal.prevExpense}
            className="text-danger-100 bg-danger-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-md mt-2 bg-slate-800 p-4">
        <div className="flex items-center justify-between text-sm ">
          <div className="flex items-center gap-2">
            <Wallet size={24} weight="fill" />
            <span className="font-light">
              Minhas <span className="font-bold">contas</span>
            </span>
          </div>
          <button
            className="font-bold"
            onClick={() => {
              setAccount(null);
              setOpenCreateAccounts(!openCreateAccounts);
            }}
          >
            <PlusCircle size={24} weight="fill" />
          </button>
        </div>

        <Line />

        <div className="flex flex-col gap-2">
          {accounts.length > 0 ? (
            accounts.map((account: AccountModel) => (
              <CardAccount
                openModalAccountEdit={() => {
                  setAccount(account);
                  setOpenCreateAccounts(!openCreateAccounts);
                }}
                key={account.id}
                account={account}
              />
            ))
          ) : (
            <div className="text-center">
              <span className="text-sm">Nenhuma conta cadastrada</span>
            </div>
          )}
        </div>
      </div>

      <Fab
        openModalIncome={() => setOpenCreateIncome(!openCreateIncome)}
        openModalExpense={() => setOpenCreateExpense(!openCreateExpense)}
        openModalAccounts={() => {
          setAccount(null);
          setOpenCreateAccounts(!openCreateAccounts);
        }}
      />

      <FilterMonth
        open={openFilterMonth}
        onClose={() => setOpenFilterMonth(false)}
        onFilter={({ month }) => setMonth(month)}
      />

      <CreateIncome
        open={openCreateIncome}
        onClose={() => setOpenCreateIncome(false)}
      />
      <CreateExpense
        open={openCreateExpense}
        onClose={() => setOpenCreateExpense(false)}
      />
      <CreateAccounts
        account={account}
        open={openCreateAccounts}
        onClose={() => setOpenCreateAccounts(false)}
      />
    </main>
  );
}
