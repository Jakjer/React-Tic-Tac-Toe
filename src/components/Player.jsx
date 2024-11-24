import { useEffect, useState } from 'react'

export default function Player({initialName, symbol, isActive, onNameChange}){

  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    setIsEditing(editing => !editing);

    if(isEditing){
      onNameChange(symbol, playerName);
    }
  }

  function handleNameChange(e) {
    setPlayerName(e.target.value);
  }
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing ? <input type="text" value={playerName} onChange={handleNameChange} required></input> : <span className="player-name">{playerName}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}