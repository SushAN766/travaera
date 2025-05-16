
import { FlightData } from "@/types/travel";

export const mockFlightData: FlightData = {
  "best_flights": [
    {
      "flights": [
        {
          "departure_airport": {
            "name": "Indira Gandhi International Airport",
            "id": "DEL",
            "time": "2025-04-15 00:05"
          },
          "arrival_airport": {
            "name": "Tan Son Nhat International Airport",
            "id": "SGN",
            "time": "2025-04-15 06:35"
          },
          "duration": 300,
          "airplane": "Airbus A330",
          "airline": "Vietjet",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/VJ.png",
          "travel_class": "Economy",
          "flight_number": "VJ 896",
          "legroom": "31 in",
          "extensions": [
            "Average legroom (31 in)",
            "Carbon emissions estimate: 233 kg"
          ],
          "overnight": true
        },
        {
          "departure_airport": {
            "name": "Tan Son Nhat International Airport",
            "id": "SGN",
            "time": "2025-04-15 10:25"
          },
          "arrival_airport": {
            "name": "Noi Bai International Airport",
            "id": "HAN",
            "time": "2025-04-15 12:35"
          },
          "duration": 130,
          "airplane": "Airbus A320",
          "airline": "Vietjet",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/VJ.png",
          "travel_class": "Economy",
          "flight_number": "VJ 1130",
          "legroom": "28 in",
          "extensions": [
            "Below average legroom (28 in)",
            "Carbon emissions estimate: 112 kg"
          ]
        }
      ],
      "layovers": [
        {
          "duration": 230,
          "name": "Tan Son Nhat International Airport",
          "id": "SGN"
        }
      ],
      "total_duration": 660,
      "carbon_emissions": {
        "this_flight": 346000,
        "typical_for_this_route": 225000,
        "difference_percent": 54
      },
      "price": 289,
      "type": "One way",
      "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/VJ.png",
      "booking_token": "WyJDalJJY25CeWNuQXRNMHR5YUVGQlNVMUdiR2RDUnkwdExTMHRMUzB0TFc5clltdHpPVUZCUVVGQlIyWTVRM3BKU1c5ZlVFVkJFZ3hXU2pnNU5ueFdTakV4TXpBYUN3akY0UUVRQWhvRFZWTkVPQnh3eGVFQiIsW1siREVMIiwiMjAyNS0wNC0xNSIsIlNHTiIsbnVsbCwiVkoiLCI4OTYiXSxbIlNHTiIsIjIwMjUtMDQtMTUiLCJIQU4iLG51bGwsIlZKIiwiMTEzMCJdXV0="
    },
    {
      "flights": [
        {
          "departure_airport": {
            "name": "Indira Gandhi International Airport",
            "id": "DEL",
            "time": "2025-04-15 22:05"
          },
          "arrival_airport": {
            "name": "Kuala Lumpur International Airport",
            "id": "KUL",
            "time": "2025-04-16 06:00"
          },
          "duration": 325,
          "airplane": "Boeing 737",
          "airline": "Batik Air",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/OD.png",
          "travel_class": "Economy",
          "flight_number": "OD 206",
          "legroom": "32 in",
          "extensions": [
            "Above average legroom (32 in)",
            "In-seat USB outlet",
            "On-demand video",
            "Carbon emissions estimate: 328 kg"
          ],
          "overnight": true
        },
        {
          "departure_airport": {
            "name": "Kuala Lumpur International Airport",
            "id": "KUL",
            "time": "2025-04-16 10:10"
          },
          "arrival_airport": {
            "name": "Noi Bai International Airport",
            "id": "HAN",
            "time": "2025-04-16 12:30"
          },
          "duration": 200,
          "airplane": "Boeing 737MAX 8 Passenger",
          "airline": "Batik Air",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/OD.png",
          "travel_class": "Economy",
          "flight_number": "OD 571",
          "legroom": "29 in",
          "extensions": [
            "Below average legroom (29 in)",
            "Stream media to your device",
            "Carbon emissions estimate: 154 kg"
          ]
        }
      ],
      "layovers": [
        {
          "duration": 250,
          "name": "Kuala Lumpur International Airport",
          "id": "KUL"
        }
      ],
      "total_duration": 775,
      "carbon_emissions": {
        "this_flight": 483000,
        "typical_for_this_route": 225000,
        "difference_percent": 115
      },
      "price": 384,
      "type": "One way",
      "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/OD.png",
      "booking_token": "WyJDalJJY25CeWNuQXRNMHR5YUVGQlNVMUdiR2RDUnkwdExTMHRMUzB0TFc5clltdHpPVUZCUVVGQlIyWTVRM3BKU1c5ZlVFVkJFZ3RQUkRJd05ueFBSRFUzTVJvTENOR3JBaEFDR2dOVlUwUTRISERScXdJPSIsW1siREVMIiwiMjAyNS0wNC0xNSIsIktVTCIsbnVsbCwiT0QiLCIyMDYiXSxbIktVTCIsIjIwMjUtMDQtMTYiLCJIQU4iLG51bGwsIk9EIiwiNTcxIl1dXQ=="
    },
    {
      "flights": [
        {
          "departure_airport": {
            "name": "Indira Gandhi International Airport",
            "id": "DEL",
            "time": "2025-04-15 18:00"
          },
          "arrival_airport": {
            "name": "Netaji Subhash Chandra Bose International Airport",
            "id": "CCU",
            "time": "2025-04-15 20:15"
          },
          "duration": 135,
          "airplane": "Airbus A321neo",
          "airline": "IndiGo",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/6E.png",
          "travel_class": "Economy",
          "flight_number": "6E 2057",
          "legroom": "28 in",
          "extensions": [
            "Below average legroom (28 in)",
            "Carbon emissions estimate: 92 kg"
          ]
        },
        {
          "departure_airport": {
            "name": "Netaji Subhash Chandra Bose International Airport",
            "id": "CCU",
            "time": "2025-04-15 21:45"
          },
          "arrival_airport": {
            "name": "Noi Bai International Airport",
            "id": "HAN",
            "time": "2025-04-16 02:10"
          },
          "duration": 175,
          "airplane": "Airbus A320neo",
          "airline": "IndiGo",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/6E.png",
          "travel_class": "Economy",
          "flight_number": "6E 1631",
          "legroom": "28 in",
          "extensions": [
            "Below average legroom (28 in)",
            "Carbon emissions estimate: 123 kg"
          ],
          "overnight": true
        }
      ],
      "layovers": [
        {
          "duration": 90,
          "name": "Netaji Subhash Chandra Bose International Airport",
          "id": "CCU"
        }
      ],
      "total_duration": 400,
      "carbon_emissions": {
        "this_flight": 216000,
        "typical_for_this_route": 225000,
        "difference_percent": -4
      },
      "price": 417,
      "type": "One way",
      "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/6E.png",
      "booking_token": "WyJDalJJY25CeWNuQXRNMHR5YUVGQlNVMUdiR2RDUnkwdExTMHRMUzB0TFc5clltdHpPVUZCUVVGQlIyWTVRM3BKU1c5ZlVFVkJFZzAyUlRJd05UZDhOa1V4TmpNeEdnc0lvc1VDRUFJYUExVlRSRGdjY0tMRkFnPT0iLFtbIkRFTCIsIjIwMjUtMDQtMTUiLCJDQ1UiLG51bGwsIjZFIiwiMjA1NyJdLFsiQ0NVIiwiMjAyNS0wNC0xNSIsIkhBTiIsbnVsbCwiNkUiLCIxNjMxIl1dXQ=="
    }
  ]
};
