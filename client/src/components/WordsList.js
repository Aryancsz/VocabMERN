import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

const WordsList = ({ searchFromdb }) => {
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [detailViewToggle, setDetailViewToggle] = useState(false);
  const [getWordByIndex, setGetWordByIndex] = useState(null);
  const [alert, setAlert] = useState({ state: "" });
  const [wordVal, setWordVal] = useState("");
  const dupicateCheck = [];
  const generateData = {
    wordName: "",
    definitions: [],
    etymologies: [],
    exText: [],
    catId: [],
  };

  const getDbwords = async () => {
    const response = await axios.get("/api/dbwords");
    dispatch({ type: "RESULTS", payload: response.data });
  };
  useEffect(() => {
    getDbwords();
    // eslint-disable-next-line
  }, [dispatch]);
  const { results } = useSelector((state) => state.WordReducer);

  const toggleDetail = function () {
    if (detailViewToggle) {
      setDetailViewToggle(false);
    } else {
      setDetailViewToggle(true);
    }
  };

  const detailViewPage = function (e) {
    const orderNo = e.target.classList[0];
    const revertIndex = -1 * (orderNo - results.length) - 1;
    const detailCard = results[revertIndex]?.result?.data?.getWord?.id;
    setDetailViewToggle(true);
    setGetWordByIndex(detailCard);
  };

  const searchResults = results.filter((el) => {
    return el.word
      .toString()
      .toLowerCase()
      .startsWith(searchFromdb.trim().toLocaleLowerCase());
  });

  // Initial loading all data from database

  const wordLists = searchResults
    .slice(0)
    .reverse()
    .map((ele, ind) => {
      let destructured = ele?.result?.data?.getWord;
      dupicateCheck.push(destructured?.id);

      return (
        <div
          onClick={detailViewPage}
          className={ind}
          style={{ background: "white", borderBottom: "1px solid #ccc" }}
          key={ele?._id}
        >
          <div
            className={ind}
            style={{
              paddingLeft: "10px",
              fontSize: "20px",
              paddingTop: "10px",
            }}
          >
            {destructured?.id}
          </div>
          <br />
          <div
            className={ind}
            style={{
              paddingLeft: "10px",
            }}
          >
            (
            {destructured?.id &&
              destructured?.results[0]?.lexicalEntries[0]?.lexicalCategory?.id}
            )
            <span className={ind} style={{ paddingLeft: "10px" }}>
              {destructured?.id &&
                destructured?.results[0]?.lexicalEntries[0]?.entries[0]
                  ?.senses[0]?.definitions[0]}
            </span>
          </div>
          <br />
        </div>
      );
    });
  const detailView = results
    .filter((rel) => rel.word === getWordByIndex)
    .map((el) => {
      const destructured = el.result.data.getWord;
      generateData.wordName = destructured?.id;

      let results = [];
      destructured?.results?.map((def) => {
        let definitionArray = [];
        // creates array of keys in object
        const keys = Object.keys(def);
        keys.map((key) => {
          // builds regex that looks for capital lettersowerCase();
          // grabs the value for the parameter from the
          // definition object in response
          const value = def[key];
          // constructs new object to send to frontend
          let newObj = {
            value,
          };
          definitionArray.push(newObj);
          return null;
        });
        results.push(definitionArray);
        return null;
      });
      // Chdecking for object type to triverse
      const isObject = function (val) {
        if (val === null) {
          return false;
        }
        return typeof val === "object";
      };
      // scanning to each child and save in new object
      const reStructure = function (obj, arrProp) {
        for (let val in obj) {
          if (isObject(obj[val])) {
            reStructure(obj[val], val);
          } else {
            if (Array.isArray(obj)) {
              if (arrProp === "definitions") {
                generateData.definitions = [
                  ...generateData.definitions,
                  obj[val],
                ];
              }
              if (arrProp === "etymologies") {
                generateData.etymologies = [
                  ...generateData.etymologies,
                  obj[val],
                ];
              }
            } else {
              if (val === "text") {
                generateData.exText = [...generateData.exText, obj[val]];
              }
              if (val === "id") {
                generateData.catId = [...generateData.catId, obj[val]];
              }
            }
          }
        }
      };
      reStructure(results);
      const defination = generateData.definitions.map((el) => {
        return (
          <div key={uuidv4()}>
            <li>{el}</li>
          </div>
        );
      });
      const examples = generateData.exText.map((el) => {
        return (
          <div key={uuidv4()}>
            <li>{el}</li>
          </div>
        );
      });
      let carAr = new Set(generateData.catId);
      const addComma = [Array.from(carAr).join(", ")];
      const catId = Array.from(addComma).map((el) => {
        return (
          <span key={uuidv4()}>
            <span style={{ paddingRight: "7px" }}>{el}</span>
          </span>
        );
      });
      return (
        <div
          key={el.result.data.getWord?.id}
          style={{
            lineHeight: "30px",
            fontSize: "18px",
          }}
        >
          <div className='detail-view'>
            <div
              onClick={toggleDetail}
              style={{
                display: "flex",
                float: "right",
                margin: "20px 20px 0px 0px ",
              }}
            >
              <CloseIcon style={{ fontWeight: "bold", fontSize: "30px" }} />
            </div>
            <div
              style={{
                padding: "20px 0 0 20px",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {el.result.data.getWord?.id}
            </div>
            <div
              style={{
                paddingLeft: "20px",
                color: "#707070",
              }}
            >
              {catId}
            </div>
            <div
              style={{
                paddingLeft: "20px",
                color: "#707070",
              }}
            >
              Origin: {generateData.etymologies.at(-1)}
            </div>
            <div
              style={{
                marginTop: "20px",
                paddingLeft: "20px",
                fontWeight: "bold",
              }}
            >
              Definations
            </div>
            <div
              style={{
                marginTop: "20px",
                paddingLeft: "20px",
                fontSize: "17px",
              }}
            >
              {defination}
            </div>
            <div
              style={{
                marginTop: "20px",
                paddingLeft: "20px",
                fontWeight: "bold",
              }}
            >
              Examples
            </div>
            <div
              style={{
                marginTop: "20px",
                paddingLeft: "20px",
                fontSize: "17px",
              }}
            >
              {examples}
            </div>
          </div>
        </div>
      );
    });

  const addNewWordClicked = (e) => {
    e?.preventDefault();
    if (popup) {
      setPopup(false);
    } else {
      setPopup(true);
    }
    // bellow value set tp empty string to clear the old input
    setWordVal("");
  };

  const addNewWord = (e) => {
    addNewWordClicked();

    //  SEARCHING FOR NEW WORD TO ADD

    // If word is Already present in database and rendered dont add the word again
    if (dupicateCheck.includes(wordVal)) {
      setAlert({ state: "Word already exist in database" });
      setTimeout(() => {
        setAlert({ state: "" });
      }, 5000);
      return;
    }

    axios
      .post("/graphql", {
        headers: { "Content-type": "application/json" },
        query: `
        {
          getWord(word: "${wordVal}"){
            id
            results{
              lexicalEntries{
                entries{
                  etymologies
                  senses{
                    subsenses{
                      definitions
                      examples{
                        text
                      }
                    }
                    definitions
                    examples{
                      text
                    }
                  }
                }
                lexicalCategory{
                  id
                }
              }
            }
          }
        },
          `,
      })
      .then((response) => {
        // IF THE BODY RETURNS MESSAGE WE ARE RESTRICTING THE BODY TO SAVE IN DB AND RETURNING FROM HERE
        let searchResults = response.data;
        if (searchResults?.message) {
          setAlert({ state: "Search content error" });
          setTimeout(() => {
            setAlert({ state: "" });
          }, 5000);
          return;
        }
        if (searchResults?.errors) {
          setAlert({ state: "Search content error" });
          setTimeout(() => {
            setAlert({ state: "" });
          }, 5000);
          return;
        }
        if (searchResults?.data?.getWord?.id === null) {
          setAlert({ state: "invalid Search" });
          setTimeout(() => {
            setAlert({ state: "" });
          }, 3000);
          return;
        }
        if (
          searchResults?.data?.getWord?.results[0]?.lexicalEntries[0]
            ?.entries[0]?.etymologies === null &&
          !searchResults?.data?.getWord?.results[0]?.lexicalEntries[0]
            ?.entries[0]?.senses[0]?.definitions?.length > 0
        ) {
          setAlert({ state: "Has no definations" });
          setTimeout(() => {
            setAlert({ state: "" });
          }, 3000);
          return;
        }
        axios({
          method: "post",
          url: `api/words/${wordVal}`,
          data: searchResults,
        })
          .then(function (res) {})
          .catch(function (err) {
            console.error(err.message);
          });
        getDbwords();
      });
  };

  return (
    <div className='backg'>
      <div
        style={{
          position: "absolute",
          background: "#ff0f00",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: "20px",
          left: "50%",
          borderRadius: "5px",
        }}
      >
        {alert.state}
      </div>
      <div
        style={{
          position: "relative",
          background: "white",
          padding: "10px",
          borderBottom: "1px solid #ccc",
          borderRadius: "10px 10px 0px 0px",
        }}
      >
        Words List Through Database
        <div>{detailViewToggle ? detailView : null}</div>
      </div>
      <div>{wordLists}</div>
      <div
        onClick={addNewWordClicked}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#5e1949",
          position: "fixed",
          bottom: "100px",
          right: "35px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <AddIcon style={{ fontSize: "50px", color: "#fff" }} />
      </div>
      {!popup ? null : (
        <div
          style={{
            position: "absolute",
            zIndex: "1",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(1.5px)",
            top: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              height: "35%",
              width: "55%",
              backgroundColor: "#fff",
              zIndex: "5",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              border: "3px solid rgba(0, 0, 0, 0.3)",
              borderRadius: "7px",
            }}
          >
            <div
              style={{ margin: "20px", fontWeight: "bold", fontSize: "20px" }}
            >
              Add to Disctionary
            </div>
            <label
              style={{
                margin: "20px",
                color: "#5e1949",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              New Word
            </label>
            <div>
              <input
                type='text'
                className='add-word-input'
                autoFocus='autoFocus'
                onChange={(e) => {
                  setWordVal(e.target.value.toLowerCase());
                }}
                value={wordVal}
              />
            </div>
            <div
              onClick={addNewWordClicked}
              className='btn-popup'
              style={{
                bottom: "20px",
                right: "120px",
              }}
            >
              CANCEL
            </div>
            <div
              onClick={addNewWord}
              className='btn-popup'
              style={{
                bottom: "20px",
                right: "40px",
              }}
            >
              ADD
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordsList;
