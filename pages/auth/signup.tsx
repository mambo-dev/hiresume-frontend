import React from "react";

export default function SignUp() {
  function handleSignUp(e: any) {
    e.preventDefault();
  }
  return (
    <div className="h-full w-full overflow-y-hidden flex gap-x-2 items-center">
      <div className="w-1/2 h-screen hidden md:flex  ">
        <img
          className="w-full h-full  rounded-tr-2xl "
          src="https://images.unsplash.com/photo-1660721858662-9ad9f37447f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
      </div>
      <div className="w-1/2 h-screen py-2 px-10 flex  flex-col gap-y-2">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-teal-800 text-3xl font-semibold">
            Join us at Hiresume
          </h1>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <form className="flex flex-col gap-y-2 w-full  h-full">
            <div className="flex gap-x-6 items-center justify-between px-20 text-gray-700 font-medium">
              <div className="flex flex-col">
                <label>first name</label>
                <input
                  type="text"
                  name="firstName"
                  className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                />
              </div>
              <div className="flex flex-col">
                <label>second name</label>
                <input
                  type="text"
                  name="lastName"
                  className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2 items-center  px-20 justify-center text-gray-700 font-medium ">
              <div className="flex flex-col w-full">
                <label>email</label>
                <input
                  type="email"
                  name="email"
                  className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                />
              </div>
              <div className="flex flex-col w-full">
                <label>password</label>
                <input
                  type="password"
                  name="password"
                  className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                />
              </div>
              <div className="flex flex-col w-full">
                <label>confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="py-2 px-1 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                />
              </div>
              <div className="flex flex-col w-full">
                <label>country</label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className=" py-2 px-1 rounded bg-white  border border-gray-300 focus:outline-none focus:ring-2 focus:border-teal-200 focus:shadow-sm focus:shadow-teal-200  focus:ring-teal-100 "
                >
                  {country_list.map((country) => (
                    <option>{country}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col py-1 gap-y-2 px-20">
              <p className="text-gray-700 font-bold">Join us as </p>
              <div className="flex gap-x-2 ">
                <div className="flex items-center justify-between gap-x-2">
                  <input
                    name="client"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-200"
                  />
                  <label
                    htmlFor="push-everything"
                    className=" text-sm font-bold  text-gray-700"
                  >
                    client
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    name="client"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-200"
                  />
                  <label
                    htmlFor="push-everything"
                    className=" text-sm font-bold  text-gray-700"
                  >
                    freelancer
                  </label>
                </div>
              </div>
            </div>
            <div className="px-20 py-2">
              <button
                onClick={handleSignUp}
                className="inline-flex items-center justify-center shadow shadow-teal-500 bg-teal-600 rounded  text-gray-100  focus:shadow-md focus:shadow-teal-400 p-2 w-full "
              >
                create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

var country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
