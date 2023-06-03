let content = "", contentInput = "";
let it = 1;
let eventListeners = [];
function startRecording(){
    content = "import { Feature, Selector, Controller } from 'test-maker';\n\n\
    Feature(`My feature`)\n\
        .Scenario(`My Scenario`)\n\
            .Given(`Some Text`, async (I) => {\n\
                    await I.goto(`"  + getCurrentURL() + "`);\n\
    })\n";
    chrome.storage.local.set({ content });
    console.log("start");
    document.addEventListener('click', whenClicked);
    document.addEventListener('input', whenFilled);
}
function stopRecording(){
    console.log("stop");
        document.removeEventListener('click', whenClicked);
        document.removeEventListener('input', whenFilled);
        startWriting();
}

function getCurrentURL() {
    return window.location.href;
}

function whenClicked(event){
    console.log("click");
    if(contentInput != ""){
        content += contentInput;
        contentInput = "";
    }else{
        content += `.When('When${it}', async(I)=>{\n\
            const dialogModal = Selector('${event.target.localName}[id="${event.target.id}"]',{ timeout: 2000 })\n\
                if (await dialogModal.exists){\n\
                await I.focus(dialogModal);\n\
                await I.pressEnterKey();\n\
                }\n\
            })\n`;
        it++;
    }
    console.log('Clic détecté:', event.target);
    //chrome.runtime.sendMessage({message: "currentContent", content});
    chrome.storage.local.set({ content });
}

function whenFilled(event){
    if(!eventListeners.includes(event.target)){
        eventListeners = [...eventListeners, event.target];
        event.target.addEventListener("keyup", fullfill);
    }
}
function fullfill (event) {
    if (event.key === "Enter") {
        console.log("input");
        console.log(event.target.value);
        content += `.When('When${it}', async(I)=>{\n\
        await I.fillField('[id="${event.target.id}"]','${event.target.value}')\n\
        await I.pressEnterKey();\n\
        })`
        chrome.storage.local.set({ content });
        event.target.removeEventListener("keyup", fullfill);
        const x = eventListeners.indexOf(event.target);
        eventListeners = eventListeners.splice(x,1);
    }
}
function startWriting(){
    chrome.storage.local.get(['content'], function(result) {
        if (result.content) {
          let finalContent = result.content
          if(contentInput != ""){
            finalContent += contentInput;
            contentInput = "";
        }
          chrome.storage.local.remove('content');
          console.log(finalContent);
    // Créer un objet Blob à partir du contenu
    var blob = new Blob([finalContent], { type: 'text/plain' });
  
    // Générer un nom de fichier unique
    var nomFichier = 'myMacro-spec.ts';
  
    // Créer une URL locale pour le Blob
    var blobURL = URL.createObjectURL(blob);
  
    injecterContenu(blobURL,nomFichier);
        }
      });
    
  }
  
  // Fonction d'injection de contenu dans la page
  function injecterContenu(blobURL, nomFichier) {
    var a = document.createElement('a');
    a.href = blobURL;
    a.download = nomFichier;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobURL);
  }