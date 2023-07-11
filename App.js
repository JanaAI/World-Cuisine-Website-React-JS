import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import  DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import  DialogActions from "@material-ui/core/DialogActions";



import{
  
  AppNameComponent,
  AppIcon,
  SearchComponent,
  SearchIcon,
  SearchInput,
}from"./components/headerComponent";

import{
  RecipeContainer,
  CoverImage,
  RecipeName,
  IngredientsText,
  SeeMoreText,
}from"./components/recipeComponent";
 const APP_ID = "6b54544a";
 const APP_KEY = "a91eb80a8c9cbfa4becddfff730c1c05";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap:px;
  justify-content: space-evenly;
`;
const Placeholder =styled.img`
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;
`;
const RecipeComponent = (props) => {
  const [show, setshow] = React.useState(false);
  const { recipeObj } = props;
  return(
    <>
      <Dialog open={show}>
        <DialogTitle id="alert-dialog-slide-title">Ingredients</DialogTitle>
        <DialogContent>

          <table>
            <thead>
              <th>Ingredients</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {recipeObj.ingredients.map((ingredientObj)=>(

              <tr>
                <td>{ingredientObj.text}</td>
                <td>{ingredientObj.weight}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
        <SeeMoreText onClick={() => window.open(recipeObj.url)}>See More</SeeMoreText>
          <SeeMoreText onClick={() => setshow("")}>Close</SeeMoreText>
      </Dialog>
      <RecipeContainer>
        <CoverImage src={recipeObj.image} />
        <RecipeName>{recipeObj.label}</RecipeName>
        <IngredientsText onClick={() =>setshow(true)}>Ingredients</IngredientsText>
        <SeeMoreText onClick={() => window.open(recipeObj.url)}>
          See Complete Recipe</SeeMoreText>
      </RecipeContainer>
    </>
  );
};
function App() {
  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
    `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    
    updateRecipeList(response.data.hits);
  };
  const OnTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(()=> fetchRecipe(event.target.value),500);
    updateTimeoutId(timeout);
   
  };
  return (
    <Container>
    <Container>
      <AppNameComponent>
        <AppIcon src="burger.jpeg"/>
      Recipe Finder
      </AppNameComponent>
      <SearchComponent>
        <SearchIcon>
        </SearchIcon>
       <SearchInput placeholder="Search Recipe" onChange={OnTextChange} 
       />
      </SearchComponent>
    </Container>
    <RecipeListContainer>
      {recipeList.length &&
        recipeList.map((recipeObj) => (
        <RecipeComponent recipeObj={recipeObj.recipe} />
      ))}
      </RecipeListContainer>
      </Container>
  );
}

export default App;
