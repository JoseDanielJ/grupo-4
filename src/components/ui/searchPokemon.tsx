import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleClick = () => {
    const inputValue = inputRef.current?.value;
    const pokemonId = inputValue ? parseInt(inputValue) : 0;
    const hasLetters = inputValue ? String(inputValue) : "";
    const regex = /\D/;
    if (pokemonId > 1010) {
      alert("El id del pokemon a buscar no existe.");
    }
    if (pokemonId !== undefined && regex.test(hasLetters)) {
      alert("La búsqueda no se puede completar, ya que contiene caracteres no numéricos");
    } else {
      if (!pokemonId) return alert("Primero digite un numero de pokemon a buscar");
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(async (response) => {
        if (response.ok) {
          router.push(`../../pokemon/id/${pokemonId}`);
        } else {
          router.push(`#`);
        }
      });
    }
  };

  return (
    <div className="flex flex-row space-x-4 justify-self-end mr-8">
      <input
        ref={inputRef}
        className="mt-2 h-10 form-input w-full px-3 py-2 rounded-md bg-white"
        type="text"
        placeholder="ID de pokemon a buscar"
        id="search"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleClick();
          }
        }}
        onKeyPress={(event) => {
          const charCode = event.which ? event.which : event.keyCode;
          if (charCode < 48 || charCode > 57) {
            event.preventDefault();
          }
        }}
      />
      <button className=" mt-2 h-10 w-40 rounded-md bg-blue-800 mx-3" onClick={handleClick}>
        Search
      </button>
    </div>
  );
};
//1010max
//evitar letras en el input
