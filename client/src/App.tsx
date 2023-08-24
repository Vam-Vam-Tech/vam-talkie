import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react"
import { io, Socket } from "socket.io-client"

function App() {

  const [isRecording, setIsRecording] = useState(false);
  const [socket, setSocket] = useState<Socket>()

  const startRecording = () => {
    setIsRecording(true);

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks: BlobPart[] = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const reader = new FileReader();

          reader.onload = (event: ProgressEvent<FileReader>) => {
            const audioArrayBuffer = event?.target?.result;
            socket?.emit('sendAudio', { conversationId: 123, audioData: audioArrayBuffer });
          };

          reader.readAsArrayBuffer(audioBlob);
        };

        mediaRecorder.start();
        setTimeout(() => mediaRecorder.stop(), 5000); // Record for 5 seconds
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  useEffect(() => {
    const socketConnection = io('http://localhost:3000/events', {
      transports: ["websocket"]
    });
    setSocket(socketConnection)

    return () => {
      socketConnection.disconnect()
    }
  }, [])

  return (
    <>
      <Button onClick={startRecording} isLoading={isRecording}>Record</Button>
    </>
  )
}

export default App
