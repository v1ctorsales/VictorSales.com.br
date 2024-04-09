function fecharModalConfig(){
    document.querySelector("dialog").style.opacity = 0
    document.querySelector("dialog").classList.add("animated");
    }

function abrirModal(){
    document.querySelector("dialog").style.opacity = 0.2
    document.querySelector("dialog").classList.remove("animated");
}
