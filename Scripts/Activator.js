const FileInputButton = document.getElementById("FileInput")

const DownloadFile = true //For developing purposes

function Output(text, type, href, downloadname){
    let outputdiv = document.querySelector(".Output")
    if (!outputdiv){
        outputdiv = document.createElement("div")
        outputdiv.classList.add("Output")
        document.querySelector("main").insertBefore(outputdiv, document.querySelector(".Warning"))
    }
    if (type == 'Title'){
        const titleElement = document.createElement('span')
        titleElement.textContent = text
        outputdiv.append(titleElement)
    }else if (type == 'Error') {
        const codeElement = document.createElement('pre')
        outputdiv.append(codeElement)
        codeElement.textContent = text
    }else if (type == 'DownloadLink'){
        const link = document.createElement('a')
        link.textContent = text
        link.href = href
        link.download = downloadname
        outputdiv.append(link)
    }
}

function Downl(text, filename){
    if (text == undefined || text == null || text == ''){return;}
    const blob = new Blob([text], {type: "text/html"})
    const blobUrl = URL.createObjectURL(blob)
    Output(`Download ${filename} (${(blob.size / 1000 / 1000).toFixed(2)}MB)`, "DownloadLink", blobUrl, filename)
    const a = document.createElement('a')
    a.download = filename
    a.href = blobUrl
    a.click()
    a.remove()
}

/* didnt work :( fetch("/Unpackager-Protection/websiteStatus.txt")
.then((response) => response.text().then((value) => {if(!value == 'Disabled'){document.querySelector('main').removeAttribute('hidden')}else{
    const div = document.createElement('div')
    div.style = 'margin: 0 auto'
    const header = document.createElement('h1')
    header.style = 'text-align: center'
    header.textContent = "🛠 Website is under maintenance 🛠"
    div.append(header)
    const header2 = document.createElement('h3')
    header2.style = 'text-align: center'
    header2.textContent = "Check back later!"
    div.append(header2)
    document.body.append(div)
}})) */
document.querySelector('main').removeAttribute('hidden')

FileInputButton.addEventListener('input', function(event){
    if (FileInputButton.files.length == 0){
        alert("Please select a packaged project")
        return;
    }
    const getfile = new FileReader()
        getfile.onload = function(loaded){
            if(DownloadFile){
                Obf(getfile.result, document.querySelector(".LevelDropdown").value).then((downloadresult) => Downl(downloadresult, FileInputButton.files[0].name))
            }else {
                Obf(getfile.result, document.querySelector(".LevelDropdown").value).then((html) => {
                    const blob = new Blob([html], {type: "text/html"})
                    const bloburl = URL.createObjectURL(blob)
                    window.open(bloburl)
                })
            }
        }
    Output(`Processing ${FileInputButton.files[0].name}...`, "Title")
    getfile.readAsText(FileInputButton.files[0])
})
