console.log(':wave: world!');

const elements = {
    host: document.querySelector('#host'),
    hostOutput: document.querySelector('#host-output'),
    connect: document.querySelector('#connect'),
    connectInput: document.querySelector('#connect-input'),
    answer: document.querySelector('#answer'),
    answerInput: document.querySelector('#answer-input'),
}

const connection = new RTCPeerConnection();

const gotAnswer = (desc) => {
    connection.setRemoteDescription(desc);
}

const gotRemoteStream = (stream) => {
    console.log('stream', stream);
}

connection.onaddstream = gotRemoteStream;

const createOffer = (connection) => {
    return connection.createOffer().then((description) => {
        console.log('got description', description);

        elements.hostOutput.value = JSON.stringify(description);

        return connection.setLocalDescription(description)
    })
}

const channel = connection.createDataChannel('chat', { negotiated: true, id: 0 });

channel.onopen = event => {
    channel.send(':wave:');
}

channel.onmessage = event => {
    console.log('receive', event)
}

elements.host.addEventListener('click', () => {
    createOffer(connection);
});

elements.connect.addEventListener('click', () => {
    const description = JSON.parse(elements.connectInput.value);

    console.log(description);

    connection.setRemoteDescription(description)
        .then(() => connection.createAnswer())
        .then((description) => {
            console.log(description)
            return connection.setLocalDescription(description)
        })
})

elements.answer.addEventListener('click', () => {
    const description = JSON.parse(elements.answerInput.value);

    connection.setRemoteDescription(description);
})