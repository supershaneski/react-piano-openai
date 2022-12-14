import React from 'react'
import classes from './App.module.css'

// Create an array of piano key frequencies
const pianoKeys = [
  { frequency: 261.63, label: "C" },
  { frequency: 277.18, label: "C# Db" },
  { frequency: 293.66, label: "D" },
  { frequency: 311.13, label: "D# Eb" },
  { frequency: 329.63, label: "E" },
  { frequency: 349.23, label: "F" },
  { frequency: 369.99, label: "F# Gb" },
  { frequency: 392.00, label: "G" },
  { frequency: 415.30, label: "G# Ab" },
  { frequency: 440.00, label: "A" },
  { frequency: 466.16, label: "A# Bb" },
  { frequency: 493.88, label: "B" },
]

const whiteKeys = [
  { frequency: 261.63, label: "C" },
  { frequency: 293.66, label: "D" },
  { frequency: 329.63, label: "E" },
  { frequency: 349.23, label: "F" },
  { frequency: 392.00, label: "G" },
  { frequency: 440.00, label: "A" },
  { frequency: 493.88, label: "B" },
]

const blackKeys = [
  { frequency: 277.18, label: "C# Db" },
  { frequency: 311.13, label: "D# Eb" },
  { frequency: 0, label: "skip", skip: true },
  { frequency: 369.99, label: "F# Gb" },
  { frequency: 415.30, label: "G# Ab" },
  { frequency: 466.16, label: "A# Bb" },
]

function App() {
  
  const audioContext = React.useRef()

  React.useEffect(() => {

    try {

      // Create an AudioContext object
      audioContext.current = new AudioContext();

    } catch(err) {
      //
    }

  }, [])

  // Button press event listener to each button that plays 
  // the corresponding piano sound when the button is pressed
  const handleButtonPress = (frequency) => () => {

    playPianoSound(frequency)

  }

  // Create a function that plays a piano sound
  function playPianoSound(frequency) {

    // Create an oscillator and gain node
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    // Set the oscillator type to "sine"
    oscillator.type = "sine";

    // Set the frequency of the oscillator
    oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);

    // Set the gain of the gain node
    gainNode.gain.setValueAtTime(0.5, audioContext.current.currentTime);

    // Connect the oscillator and gain node to the audio context destination
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    // Start the oscillator
    oscillator.start();

  }

  return (
    <div className={classes.container}>
      <div className={classes.keys}>
        <div className={classes.whiteKeys}>
          {
            whiteKeys.map((pianoKey) => {
              return (
                <button 
                key={pianoKey.label} 
                className={classes.white}
                onClick={handleButtonPress(pianoKey.frequency)}>{pianoKey.label}</button>
              )
            })
          }
        </div>
        <div className={classes.blackKeys}>
          {
            blackKeys.map((pianoKey) => {

              if(pianoKey.skip) {
                return <div key={pianoKey.label}  className={classes.skipKey} />
              }

              return (
                <button 
                key={pianoKey.label} 
                className={classes.black}
                onClick={handleButtonPress(pianoKey.frequency)}>{pianoKey.label}</button>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App
