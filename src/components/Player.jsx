import { useState } from "react";
import AvatarUploader from "./AvatarUploaderBasic.jsx";
export default function Player({
  id,
  initialName = "default",
  symbol,
  isActive,
  onChangeName,
  avatar,
  onChangeAvatar,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  //este estado se asocia a un solo componente osea a un solo jugador.

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing); //siempre devolver un nuevo valor
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  
  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  function handleAvatar(newImage) {
    onChangeAvatar(symbol, newImage);
  }
  let editable = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editable = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editable}
        <AvatarUploader
          id={id}
          initialSrc={avatar}
          size={40}
          onUpload={handleAvatar}
        />
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleEditClick}>
          {isEditing ? "Guardar" : "Cambiar"}
        </button>
      </span>
    </li>
  );
}
