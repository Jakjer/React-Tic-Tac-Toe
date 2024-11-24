import Player from '../components/Player'

export default function Players(){
  return (
    <ol id="players">
      <Player initialName="Kiryu" symbol="X"/>
      <Player initialName="Majima" symbol="O"/>
    </ol>
  );
}