import { makeStyles, TablePagination } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { RecipeSearchList, breed, BreedList } from "../models";
import { getBreeds, getPetSearchResults } from "../services";
import "../styles/App.css";
import MultipleSelect from "./MultiSelectMenu";
import SearchBar from "./SearchBar";
import SearchResultCard from "./SearchResultCard";
import axios from "axios";
import { Button, SelectChangeEvent } from "@mui/material";
import { JsonObjectExpression } from "typescript";

const useStyles = makeStyles(() => ({
  container: {
    padding: 100
  }
}));


export function PetSearchPage() {
  const classes = useStyles();

  let [searchResults, setSearchResults] = useState([]);
  let [breeds, setBreeds] = useState("");

  function getAnimals() {
    axios({
      method: "GET",
      url:"/cats?breed=" + breeds,
    })
    .then((response) => {
      const res =response.data
      for (var i=0; i < res.length; i++) {
        //console.log(res[i].primary_photo_cropped.full);
      }
      //console.log("Response:", res)
      searchResults = res;
      setSearchResults(searchResults);
      console.log(searchResults)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }
  const handleBreedChange = (
    event: SelectChangeEvent<string[]>
  ) => {
    breeds = event.target.value.toString();
    setBreeds(breeds);
    console.log(breeds);
  };
  const breedsOptions = ['Abyssinian','American Bobtail','American Curl','American Shorthair','American Wirehair','Applehead Siamese','Balinese','Bengal','Birman','Bombay','British Shorthair','Burmese','Burmilla','Calico','Canadian Hairless','Chartreux','Chausie','Chinchilla','Cornish Rex','Cymric','Devon Rex','Dilute Calico','Dilute Tortoiseshell','Domestic Long Hair','Domestic Medium Hair','Domestic Short Hair','Egyptian Mau','Exotic Shorthair','Extra-Toes Cat / Hemingway Polydactyl','Havana','Himalayan','Japanese Bobtail','Javanese','Korat','LaPerm','Maine Coon','Manx','Munchkin','Nebelung','Norwegian Forest Cat','Ocicat','Oriental Long Hair','Oriental Short Hair','Oriental Tabby','Persian','Pixiebob','Ragamuffin','Ragdoll','Russian Blue','Scottish Fold','Selkirk Rex','Siamese','Siberian','Silver','Singapura','Snowshoe','Somali','Sphynx / Hairless Cat','Tabby','Tiger','Tonkinese','Torbie','Tortoiseshell','Toyger','Turkish Angora', 'Turkish Van', 'Tuxedo', 'York Chocolate'];
  return (
    <>
      <MultipleSelect names={breedsOptions} category='Breed' onClick={handleBreedChange}/>
      <Button onClick={getAnimals}>Get Animals</Button>
      <Grid
        container
        className={classes.container}
        rowSpacing={3}
        columnSpacing={{ xs: 3, sm: 5, md: 7 }}
      >
        {searchResults?.map((item: any) => (
    
          <Grid item key={item.id} xs={6} sm={6} md={4}>
            <SearchResultCard
              title={item.name}
              description={item.breed}
              image={item.photos.length !==  0 ? item.photos[0].medium : ""}
              summary={item.description}
              link={item.url}
              gender={item.gender}
              age={item.age}
              location={item["contact.address.postcode"]+ ", " + item["contact.address.city"] + ", " + item["contact.address.state"]}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
