const express = require("express");
const config = require("config");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const bp = require("body-parser");
const connectDB = require("./config/db");
const fetch = require("node-fetch");
const app = express();
const path = require("path");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const app_id = config.get("app_id");
const app_key = config.get("app_key");

connectDB();

app.use("/api/words", require("./api/words"));
app.use("/api/dbwords", require("./api/dbWords"));

var schema = buildSchema(`
type Query {
  getWord(word: String): Word
}

  type Word {
      id: String
      results:[Results]
  }

  type Results{
    lexicalEntries:[LexicalEntries]
  }
  type LexicalEntries{
    lexicalCategory: LexicalCategory
    entries: [Entries]
  }
  type Entries{
    etymologies: [String]
    senses:[Senses]
  }
  type Senses {
    subsenses:[Subsenses]
    definitions:[String]
    examples:[Examples]
  }
  type Subsenses {
    definitions:[String]
    examples:[Examples]
  }
  type Examples{
    text: String
  }
  type LexicalCategory{
    id: String
  }
`);

var root = {
  getWord: async ({ word }) => {
    const response = await fetch(
      `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}
    `,
      {
        method: "GET",
        headers: { Accept: "application/json", app_id, app_key },
      }
    );
    return response.json();
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Production
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
