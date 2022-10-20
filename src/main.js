import "./css/index.css"
import IMask from "imask"

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
      Cardtype: "american",
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

    return foundMask
  },
}

const cardNumberMask = IMask(cardNumber, cardNumberPattern)

//
const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("cartao adicionado")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code){
  const ccSecurity =  document.querySelector(".cc-security .value");

  ccSecurity.innerText = code.length === 0 ? "123" : code
}

cardNumberMask.on("accept",() => {
  const Cardtype = cardNumberMask.masked.currentMask.Cardtype
  setCardType(Cardtype)
  updateCardNumber(cardNumberMask.value)
})

function updateCardNumber(number){
  const ccNumber = document.querySelector(".cc-number")

  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}
expirationDateMasked.on("accept", () => {
  updatExpirationDate(expirationDateMasked.value)
})

function updatExpirationDate(date){
  const ccExpiration = document.querySelector(".cc-extra .value")

  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}
