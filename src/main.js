import "./css/index.css"

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
    american: ["#51C647","#29BEDF"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccBgColor03.setAttribute("fill", colors[type][3])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType