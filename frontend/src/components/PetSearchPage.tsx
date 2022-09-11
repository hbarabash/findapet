import { makeStyles, TablePagination, TextField } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import React, { FormEvent, useState } from "react";
import "../styles/App.css";
import MultipleSelect from "./MultiSelectMenu";
import SearchBar from "./SearchBar";
import SearchResultCard from "./SearchResultCard";
import axios from "axios";
import { Button, SelectChangeEvent } from "@mui/material";
import { JsonObjectExpression } from "typescript";
import { ThemeProvider } from "@emotion/react";

const useStyles = makeStyles(() => ({
  container: {
    padding: 100
  },
  search: {
    padding: 30,
    fontFamily: 'Poppins',
    alignItems: 'center',
    justifySelf: 'auto',
  }
}));


export function PetSearchPage() {
  const classes = useStyles();

  let [searchResults, setSearchResults] = useState([]);
  let [breeds, setBreeds] = useState("");
  let [gender, setGender] = useState("male,female");
  let [postal, setPostal] = useState("");
  let [age, setAge] = useState("baby,young,adult,senior");

  function getAnimals() {
    axios({
      method: "GET",
      url:"/cats?breed=" + breeds + '&gender=' + gender + '&age=' + age + "&location=" + postal,
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
  const handleAgeChange = (
    event: SelectChangeEvent<string[]>
  ) => {
    age = event.target.value.toString();
    setAge(age);
  };
  const handlePostalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    postal = event.target.value.toString();
    setPostal(postal);
    console.log("postal", postal)
  };
  const handleGenderChange = (
    event: SelectChangeEvent<string[]>
  ) => {
    gender = event.target.value.toString();
    setGender(gender);
  };
  const breedsOptions = ['Abyssinian','American Bobtail','American Curl','American Shorthair','American Wirehair','Applehead Siamese','Balinese','Bengal','Birman','Bombay','British Shorthair','Burmese','Burmilla','Calico','Canadian Hairless','Chartreux','Chausie','Chinchilla','Cornish Rex','Cymric','Devon Rex','Dilute Calico','Dilute Tortoiseshell','Domestic Long Hair','Domestic Medium Hair','Domestic Short Hair','Egyptian Mau','Exotic Shorthair','Extra-Toes Cat / Hemingway Polydactyl','Havana','Himalayan','Japanese Bobtail','Javanese','Korat','LaPerm','Maine Coon','Manx','Munchkin','Nebelung','Norwegian Forest Cat','Ocicat','Oriental Long Hair','Oriental Short Hair','Oriental Tabby','Persian','Pixiebob','Ragamuffin','Ragdoll','Russian Blue','Scottish Fold','Selkirk Rex','Siamese','Siberian','Silver','Singapura','Snowshoe','Somali','Sphynx / Hairless Cat','Tabby','Tiger','Tonkinese','Torbie','Tortoiseshell','Toyger','Turkish Angora', 'Turkish Van', 'Tuxedo', 'York Chocolate'];
  const ageOptions = ['baby', 'young', 'adult', 'senior'];
  const genderOptions = ['male', 'female'];
  return (
    <>
    <h1>Find a pet!</h1>
    <h3>Use this search function to find cats in nearby shelters looking for homes. Cats labelled as higher risk are less likely to be adopted, and are worth taking into consideration, as many shelters are overwhelmed and have limited capacity. Find a friend and help a cat today :{')'}</h3>
    <Grid container
        className={classes.search}
        columns={4}>
      <Grid item><MultipleSelect names={breedsOptions} category='Breed' onClick={handleBreedChange}/></Grid>
      <Grid item><MultipleSelect names={ageOptions} category='Age' onClick={handleAgeChange}/></Grid>
      <Grid item><MultipleSelect names={genderOptions} category='Gender' onClick={handleGenderChange}/></Grid>
      <Grid item><TextField  required
          id="filled-required"
          style={{marginLeft: '10px'}}
          label="(Required) Postal Code" variant="outlined" placeholder="XXX XXX" onChange={handlePostalChange}/>
      </Grid>
      </Grid>
      <Button onClick={getAnimals} variant="outlined">See Cats</Button>
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
              outcome={item.predicted_outcome.toString()}
              location={item["contact.address.postcode"]+ ", " + item["contact.address.city"] + ", " + item["contact.address.state"]}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
