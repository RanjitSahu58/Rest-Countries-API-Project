// const countryDetails = document.querySelector('.country-details')
const countryName = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector(".country-details img");
const countryNameH1 = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const currencies = document.querySelector(".currencies");
const capital = document.querySelector(".capital");
const subRegion = document.querySelector(".sub-region");
const topLevelDomain = document.querySelector(".top-level-domain");
const language = document.querySelector(".language");
const borderContries = document.querySelector('.border-countries');
const themeChanger = document.querySelector('.theme-changer')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    // console.log(country.currencies);
    // console.log(Object.values(country.)
    // .map((currency) => currency.name)
    // .join(', '));
    flagImg.src = country.flags.svg;
    countryNameH1.innerHTML = country.name.common;
    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;

    topLevelDomain.innerText = country.tld.join(", ");

    // language.innerText = country.languages[0];
    language.innerText = Object.values(country.languages).join(", ");

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    } else {
      subRegion.innerText = "NA";
    }

    if (country.capital) {
      capital.innerText = country.capital.join(", ");
    } else {
      capital.innerText = "NA";
    }

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }  

    if (country.borders) {
      country.borders.forEach((border) => {
        // console.log(country.border);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountryData]) => {
            const borderCountryTag = document.createElement('a');
            borderCountryTag.innerText = borderCountryData.name.common;
            borderCountryTag.href = `country.html?name=${borderCountryData.name.common}`
            // console.log(borderCountryTag);
            borderContries.append(borderCountryTag)
          });
      });
    }
  });

  themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
  })
