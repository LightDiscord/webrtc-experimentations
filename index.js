console.log(':wave: world!');

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
        console.log('got description', description);

        connection.setLocalDescription(description).then(() => {
            console.log({
                sdp: connection.localDescription,
            })
        })
    })
}

createOffer(connection);