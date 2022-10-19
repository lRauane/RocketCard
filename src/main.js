import "./css/index.css"
import IMask from "imask"

// expressoes regulares cartoes
/*
Visa: ^4[0-9]{12}(?:[0-9]{3})
Mastercard: ^5[1-5][0-9]{14}
Amex: ^3[47][0-9]{13}
Diners Club: ^3(?:0[0-5]|[68][0-9])[0-9]{11}
Discover: ^6(?:011|5[0-9]{2})[0-9]{12}
JCB: ^(?:2131|1800|35\d{3})\d{11}
*/

// funcionalidade da máscara para campos de formulário
const securityCode = document.querySelector("#security-code")

// padrão da máscara
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

// campo de expiração
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}00",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

// Mudança de cores do cartão
const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccBgColor03 = document.querySelector(".cc-bg svg > g g:nth-child(3) path")

// logo do cartão
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

// função que troca o cartão: cores / tipo
function setCardType(type) {
  const colors = {
    visa: ["#436d99", "#2d57f2"],
    mastercard: ["#DF6F29", "#C69347"],
    american: ["#51C647", "#29BEDF"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccBgColor03.setAttribute("fill", colors[type][3])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

// expressoes regulares para cartoes
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      Cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      Cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5078\d{2})(\d{2})(\d{11})$/,
      Cardtype: "aura",
    },
    {
      mask: "0000 0000 0000 0000",
      Cardtype: "default",
    },
  ],
  dispatch: function (appendend, dynamicMasked) {
    const number = (dynamicMasked.value + appendend).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    console.log(foundMask)

    return foundMask
  },
}

const cardNumberMask = IMask(cardNumber, cardNumberPattern)

globalThis.setCardType = setCardType
