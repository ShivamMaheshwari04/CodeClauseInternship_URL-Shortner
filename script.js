let LinkInput = document.querySelector('#Link-Input');
let LinkSubmitBtn = document.querySelector('#Link-submit');
let LinkViewer = document.querySelector('.Link-viewer');
const copyBtn = document.getElementsByClassName('copybtn');

let count = 0;

function render(link, count) {
    LinkViewer.classList.add("active");
    console.log(count)
    if (count % 2 == 0) {
        remove()
        LinkViewer.classList.remove("active");
    }
    
    else {
        LinkViewer.innerHTML += `
        <p class="Link-Preview">${link}</p>
        `;
    } 
}

function remove() {
    const linkPreviews = document.querySelectorAll('.Link-Preview');
    linkPreviews.forEach(linkPreview => {
        linkPreview.remove();
    });
}

async function LinkShortner(url) {
    try {
        let response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
        let data = await response.json();
        let shortLink = data?.result?.short_link;
        let LinkWork = data?.ok;

        if (LinkWork) {
            remove();
            render(shortLink);
        } else {
            alert('Please Enter a valid Link');
        }

        LinkViewer.addEventListener('click', event => {
            if (event.target.classList.contains('copybtn')) {
                const linkPreview = event.target.parentElement;
                const linkText = shortLink;

                navigator.clipboard.writeText(linkText).then(() => {
                    alert('Link copied to clipboard');
                }).catch(error => {
                    console.error('Failed to copy:', error);
                    alert('Failed to copy link');
                });
            }
        });
    }
    catch (error) {
        alert('Something Wrong' + error)
    }
}
LinkSubmitBtn.addEventListener('click', () => {
    if (LinkInput.value == "") {
        alert("Please Enter a Link");

    }
    else {
        let url = LinkInput.value;
        console.log(url);
        LinkShortner(url);
        count++;
    }
});



