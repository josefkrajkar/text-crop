// Components
import { Cropper } from '../lib/main';

// Styles
import './App.css'

function App() {

  return (
    <div
      style={{
        width: '100%',
        height: '228px',
        overflow: 'hidden',
        border: '1px solid #fff',
        textAlign: 'left',
      }}
    >
      <Cropper
        text='Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Donec iaculis gravida nulla. Maecenas lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Aenean id metus id velit ullamcorper pulvinar. Nullam dapibus fermentum ipsum. Aliquam ornare wisi eu metus. Aliquam id dolor. Vestibulum fermentum tortor id mi. Cras elementum. Aliquam in lorem sit amet leo accumsan lacinia. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Vestibulum fermentum tortor id mi. Nullam sit amet magna in magna gravida vehicula.'
      />
    </div>
  )
}

export default App
