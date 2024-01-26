import nubank from "../../assets/banks/nubank.png"
import inter from "../../assets/banks/inter.png"
import caixa from "../../assets/banks/caixa.png"
import bradesco from "../../assets/banks/bradesco.png"
import itau from "../../assets/banks/itau.png"
import santander from "../../assets/banks/santander.png"
import will from "../../assets/banks/will.png"
import next from "../../assets/banks/next.png"
import c6 from "../../assets/banks/c6.png"
import pan from "../../assets/banks/pan.png"

export function getBank(name: string) {
  let bank = ""
  switch (name.toLocaleLowerCase()) {
    case "c6 bank":
      bank = c6
      break;
    case "bradesco":
      bank = bradesco
      break;
    case "caixa":
      bank = caixa
      break;
    case "inter":
      bank = inter
      break;
    case "itau":
      bank = itau
      break;
    case "next":
      bank = next
      break;
    case "nubank":
      bank = nubank
      break;
    case "pan":
      bank = pan
      break;
    case "santander":
      bank = santander
      break;
    case "will":
      bank = will
      break;
  }

  return bank
}
