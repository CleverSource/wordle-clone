import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { Grid } from "../components/Grid";
import { useCallback, useEffect, useRef, useState } from "react";
import { scrabbleDictionary } from "../dictionary";
import { MAX_ROWS, INPUT_VALIDATION, MAX_WORD_LENGTH } from "../constants";

const Home: NextPage = () => {
  const [currentRow, setCurrentRow] = useState(0);
  const [guessMap, setGuessMap] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");

  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key, code } = event;

      if (code === "Backspace") {
        setCurrentWord((prevWord) => {
          return `${prevWord.slice(0, prevWord.length - 1)}`;
        });
      }

      if (code === "Enter") {
        if (
          currentWord.length === MAX_WORD_LENGTH &&
          scrabbleDictionary.indexOf(currentWord) > -1 &&
          guessMap.indexOf(currentWord)
        ) {
          guessMap.push(currentWord);
          setGuessMap(guessMap);

          setCurrentRow((prevRow) => {
            if (prevRow + 1 < MAX_ROWS) {
              return currentRow + 1;
            }
            return currentRow;
          });

          setCurrentWord("");
        }
      }

      if (INPUT_VALIDATION.test(code)) {
        setCurrentWord((prevWord) => {
          return prevWord.length - 1 === MAX_WORD_LENGTH - 1
            ? `${prevWord}`
            : `${prevWord}${key}`;
        });
      }
    },
    [currentWord]
  );

  // Register event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <Grid
          solution="zesty"
          guesses={guessMap}
          currentGuess={currentWord}
          currentRow={currentRow}
        />
      </div>
    </Layout>
  );
};

export default Home;
