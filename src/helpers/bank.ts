import bb from "../assets/banks/banco-brasil.svg"
import bradesco from "../assets/banks/bradesco.svg"
import caixa from "../assets/banks/caixa.svg"
import hsbc from "../assets/banks/hsbc.svg"
import inter from "../assets/banks/inter.svg"
import itau from "../assets/banks/itau.svg"
import nubank from "../assets/banks/nubank.svg"
import original from "../assets/banks/original.svg"
import safra from "../assets/banks/safra.svg"
import santander from "../assets/banks/santander.svg"
import sicredi from "../assets/banks/sicredi.svg"

export function getBank(name: string) {
  let bank = ""
  switch (name.toLocaleLowerCase()) {
    case "banco brasil":
      bank = bb
      break;
    case "bradesco":
      bank = bradesco
      break;
    case "caixa":
      bank = caixa
      break;
    case "bradesco":
      bank = bradesco
      break;
    case "hsbc":
      bank = hsbc
      break;
    case "inter":
      bank = inter
      break;
    case "bradesco":
      bank = bradesco
      break;
    case "itau":
      bank = itau
      break;
    case "nubank":
      bank = nubank
      break;
    case "nuinvest":
      bank = nubank
      break;
    case "original":
      bank = original
      break;
    case "safra":
      bank = safra
      break;
    case "santander":
      bank = santander
      break;
    case "sicredi":
      bank = sicredi
      break;
  }

  return bank
}
