import GoogleButton from 'react-google-button';
import { useNavigation } from '@react-navigation/native';

function App() {
  const navigator= useNavigation();

  

  return (
    <div className="App">
      <h1> Commit</h1>
      <GoogleButton
        type="light" // can be light or dark
        onClick={() => { console.log('Google button clicked') }}
      />
    </div>
  );
}

export default App;