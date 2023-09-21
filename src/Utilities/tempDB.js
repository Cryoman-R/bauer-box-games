import * as XLSX from 'xlsx/xlsx.mjs';

const data = await fetch("https://docs.google.com/spreadsheets/d/1P21rQRqEtHm_HevlIX3pdS0uGl_ZkkM95aQ0-HSN8bc/edit?usp=sharing")
    .then(resp => resp.arrayBuffer())
    .then(buff => XLSX.read(buff))
    .catch(err => console.error(err))

console.log(data);

export let USER = {
    id: "M.Money",
    fName: "Mark",
    lName: "Bauer",
    currentRide: null
}

export const PARKS = {
    allParks: {
        parkName: "All Parks & Resorts",
        lands: {
            characters: {
                landName: "Misc.",
                attractions: {
                    character: {
                        attractionName: "Character Meet & Greet",
                        attractionType: "Meet & Greet",
                        ticketValue: 'M'
                    },
                    photo: {
                        attractionName: "Photo Pass Picture",
                        attractionType: "Photo Pass",
                        ticketValue: 'P'
                    }
                }
            }
        }
    },
    californiaAdventure: {
        parkName: "California Adventure",
        lands: {
            avengersCampus: {
                landName: "Avengers Campus",
                attractions: {
                    guardians: {
                        attractionName: "Guardians of the Galaxy - Mission: BREAKOUT!",
                        attractionType: "Thrill Ride",
                        ticketValue: 'E'
                    }
                }
            },
            buenaVista: {
                landName: "Buena Vista Street",
                attractions: {
                    redCarTrolley: {
                        attractionName: "Red Car Trolley",
                        attractionType: "Slow Ride",
                        ticketValue: 'A'
                    }
                }
            },
            pixarPier: {
                landName: "Pixar Pier",
                attractions: {
                    adorableSnowmanTreats: {
                        attractionName: "Adorable Snowman Frosted Treats",
                        attractionType: "Restaurant",
                        ticketValue: 'R'
                    }
                }
            }
        }
    },
    disneyLand: {
        parkName: "Disneyland",
        lands: {    
            adventureLand: {
                landName: "Adventureland",
                attractions: {
                    indianaJones: {
                        attractionName: "Indiana Jones Adventure",
                        attractionType: "Thrill Ride",
                        ticketValue: 'E'
                    },
                    jungleCruise: {
                        attractionName: "Jungle Cruise",
                        attractionType: "Water Ride",
                        ticketValue: 'D'
                    }
                }
            },        
            fantasyLand: {
                landName: "Fantasy Land",
                attractions: {
                    aliceInWonderland: {
                        attractionName: "Alice in Wonderland",
                        attractionType: "Dark Ride",
                        ticketValue: 'C'
                    }
                }
            },        
            critterCountry: {
                landName: "Critter Country",
                attractions: {
                    crockettCanoe: {
                        attractionName: "Davy Crockett's Explorer Canoes",
                        attractionType: "Water Ride",
                        ticketValue: 'B'
                    },
                    winnieThePooh: {
                        attractionName: "The Many Adventures of Winnie the Pooh",
                        attractionType: "Kiddie",
                        ticketValue: 'B'
                    }
                }
            },
            mainStreet: {
                landName: "Main Street U.S.A.",
                attractions: {
                    twentiethMusicCo: {
                        attractionName: "20th Century Music Company",
                        attractionType: "Shop",
                        ticketValue: "O"
                    }
                }
            },
            toonTown: {
                landName: "Toon Town",
                attractions: {
                    mickeyRunaway: {
                        attractionName: "Mickey & Minnie's Runaway Railway",
                        attractionType: "Dark Ride",
                        ticketValue: "S"
                    }
                }
            }
        }
    }
}