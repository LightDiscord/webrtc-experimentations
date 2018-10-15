console.log(':wave: world!');

const elements = {
    host: document.querySelector('#host'),
    connect: document.querySelector('#connect'),
    connectInput: document.querySelector('#connect-input'),
}

const connection = new RTCPeerConnection();

const gotOffer = (desc) => {
    connection.setLocalDescription(desc);
    console.log(desc);
}

const gotAnswer = (desc) => {
    connection.setRemoteDescription(desc);
}

const gotRemoteStream = (stream) => {
    console.log('stream', stream);
}

connection.onaddstream = gotRemoteStream;

const createOffer = (connection) => {
    return connection.createOffer().then((description) => {
        console.log('got description', description, description.toJSON());

        connection.setLocalDescription(description).then(() => {
            console.log({
                sdp: connection.localDescription,
            })
        })
    })
}

elements.host.addEventListener('click', () => {
    createOffer(connection);
});

elements.connect.addEventListener('click', () => {
    // connection.setRemoteDescription(elements.connectInput.value);
    
})