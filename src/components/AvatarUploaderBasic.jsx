import React, { useState } from "react";

const AvatarUploaderBasic = ({ id, initialSrc, size = 100, onUpload }) => {
  const handleClick = () => {
    // Disparamos el input usando getElementById
    const input = document.getElementById(`avatar-upload-${id}`);
    if (input) input.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (onUpload) onUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={initialSrc}
        title=""
        width={size}
        height={size}
        onClick={handleClick} // Click en imagen dispara input
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          cursor: "pointer",
          border: "2px solid #ccc",
          display: "block", // Para que no haya espacios extraños abajo
        }}
      />
      <input
        id={`avatar-upload-${id}`}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }} // input oculto
      />
    </div>
  );
};

export default AvatarUploaderBasic;
