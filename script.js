// Documentation data for CDPs
const translations = {
    en:{
    "Segment": {
        "how do I set up a new source?": {
            response: "To set up a new source in Segment, go to the Segment dashboard, click on 'Sources', then 'Add Source'. Follow the steps to integrate your source.",
            link: "https://segment.com/docs/connections/sources/"
        },
        "how can I create a user profile?": {
            response: "To create a user profile in Segment, go to the 'Profiles' section and input the required user data.",
            link: "https://segment.com/docs/profiles/"
        },
        "how do I build an audience segment?": {
            response: "To build an audience segment in Segment, navigate to the 'Audience' tab, select 'Create Segment', and define your segmentation criteria.",
            link: "https://segment.com/docs/audiences/"
        },
        "how can I integrate my data?": {
            response: "To integrate your data with Segment, go to the 'Integrations' section and follow the instructions to upload your data.",
            link: "https://segment.com/docs/integrations/"
        }
    },
    "mParticle": {
        "how do I set up a new source?": {
            response: "To set up a new source in mParticle, go to the 'Sources' section and follow the steps for integration.",
            link: "https://docs.mparticle.com/integrations/"
        },
        "how can I create a user profile?": {
            response: "To create a user profile in mParticle, go to the 'Profiles' section and click on 'Create Profile'. Input the required information and save.",
            link: "https://docs.mparticle.com/guides/profiles/"
        },
        "how do I build an audience segment?": {
            response: "To build an audience segment in mParticle, go to the 'Audience' tab and define your segmentation criteria.",
            link: "https://docs.mparticle.com/guides/audiences/"
        }
    },
    "Zeotap": {
        "how do I use Zeotap’s Data Enrichment feature?": {
            response: "To use Zeotap’s Data Enrichment, go to the 'Enrichment' section and choose the data points you want to enhance your profiles with.",
            link: "https://www.zeotap.com/data-enrichment/"
        },
        "how do I integrate Zeotap with Facebook?": {
            response: "To integrate Zeotap with Facebook, go to 'Integrations', select Facebook, and follow the integration setup to synchronize your data.",
            link: "https://www.zeotap.com/integrations/facebook/"
        }
    }
    }
};
let documentationData = translations.en;

// Function to populate the FAQ dropdown
function populateQuestionDropdown(selectedCDP) {
    const faqDropdown = document.getElementById('faq-dropdown');
    const sendButton = document.getElementById('send-button');
    
    faqDropdown.innerHTML = '<option value="">Select a question</option>';

    if (selectedCDP && documentationData[selectedCDP]) {
        const questions = documentationData[selectedCDP];
        for (const question in questions) {
            const option = document.createElement('option');
            option.value = question;
            option.textContent = question;
            faqDropdown.appendChild(option);
        }
        faqDropdown.disabled = false;
        sendButton.disabled = false;
    } else {
        faqDropdown.disabled = true;
        sendButton.disabled = true;
    }
}

// Function to display messages
function displayMessage(message, sender, link) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

    const messageText = document.createElement('p');
    messageText.textContent = message;
    messageContainer.appendChild(messageText);

    if (link) {
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.textContent = 'Learn More';
        linkElement.target = '_blank';
        messageContainer.appendChild(linkElement);
    }

    document.getElementById('messages').appendChild(messageContainer);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

// Typing indicator functions
function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.textContent = 'Bot is typing...';
    typingIndicator.style.fontStyle = 'italic';
    document.getElementById('messages').appendChild(typingIndicator);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Bot response functions
function provideBotResponseWithDelay(selectedCDP, selectedQuestion) {
    showTypingIndicator();
    setTimeout(() => {
        hideTypingIndicator();
        provideBotResponse(selectedCDP, selectedQuestion);
    }, 1000);
}

function provideBotResponse(selectedCDP, selectedQuestion) {
    const responseData = documentationData[selectedCDP] && documentationData[selectedCDP][selectedQuestion];
    if (responseData) {
        displayMessage(responseData.response, 'bot', responseData.link);
    } else {
        displayMessage("Sorry, I could not find an answer for that question.", 'bot');
    }
}

// Event Listeners
document.getElementById('cdp-dropdown').addEventListener('change', (e) => {
    const selectedCDP = e.target.value;
    populateQuestionDropdown(selectedCDP);
});

document.getElementById('send-button').addEventListener('click', () => {
    const selectedCDP = document.getElementById('cdp-dropdown').value;
    const selectedQuestion = document.getElementById('faq-dropdown').value;

    if (selectedCDP && selectedQuestion) {
        displayMessage(`You asked: ${selectedQuestion}`, 'user');
        provideBotResponseWithDelay(selectedCDP, selectedQuestion);
    }
});