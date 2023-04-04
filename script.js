const openAIBearerToken = 'YOUR_OPENAI_BEARER_TOKEN';

document.addEventListener('DOMContentLoaded', () => {
    const chatgptForm = document.getElementById('chatgpt-form');
    const chatgptResult = document.getElementById('chatgpt-result');
    const dalleForm = document.getElementById('dalle-form');
    const dalleResult = document.getElementById('dalle-result');

    function showPleaseWait() {
        const pleaseWait = document.getElementById('please-wait');
        pleaseWait.classList.remove('d-none');
    }

    function hidePleaseWait() {
        const pleaseWait = document.getElementById('please-wait');
        pleaseWait.classList.add('d-none');
    }

    if (chatgptForm) {
        chatgptForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const prompt = document.getElementById('chatgpt-prompt').value;
            
            showPleaseWait();

            try {
                const response = await fetch('https://api.openai.com/v1/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${openAIBearerToken}`
                    },
                    body: JSON.stringify({
                        model: "text-davinci-003",
                        prompt: prompt,
                        max_tokens: 500,
                        n: 1,
                        stop: "null",
                        temperature: 0
                    })
                });

                const data = await response.json();
                chatgptResult.innerText = data.choices[0].text;
            } catch (error) {
                console.error(error);
                chatgptResult.innerText = 'Error fetching results';
            }

            hidePleaseWait();
        });
    }

    if (dalleForm) {
        dalleForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const prompt = document.getElementById('dalle-prompt').value;
            const imageSize = document.getElementById('image-size').value;

            showPleaseWait();

            try {
                const response = await fetch('https://api.openai.com/v1/images/generations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${openAIBearerToken}`
                    },

                    body: JSON.stringify({
                        "prompt": prompt,
                        "n": 1,
                        "size": imageSize
                    })
                });

                const data = await response.json();
                console.log(data);
                const img = document.createElement('img');
                img.src = data.data[0].url;
                img.alt = prompt;
                img.className = 'img-fluid';

                dalleResult.innerHTML = '';
                dalleResult.appendChild(img);
            } catch (error) {
                console.error(error);
                dalleResult.innerText = 'Error fetching results';
            }

            hidePleaseWait();
        });
    }
});

function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    let activeNavItem;

    switch (currentPage) {
        case 'index.html':
            activeNavItem = document.getElementById('nav-chatgpt');
            break;
        case 'dalle.html':
            activeNavItem = document.getElementById('nav-dalle');
            break;
        default:
            // No active nav item for index.html
            return;
    }

    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavItem();
    // The rest of your existing code...
});
