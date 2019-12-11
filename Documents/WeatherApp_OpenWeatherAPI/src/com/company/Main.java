package com.company;
//import com.ObjectMapper;
import com.company.APIReturn;

import java.io.IOException;
import java.util.Scanner;

public abstract class Main {







    public static void main(String[] args) throws IOException {
//        APIReturn CityFinder = new APIReturn();
//        ObjectMapper mapper = new ObjectMapper();
//        locationObject city1 = mapper.readValue(json, locationObject.class);
//        System.out.println(city1);

        Scanner scanner = new Scanner(System.in);
        System.out.println("Please enter a city");
        String city = scanner.nextLine();
//
//
//        CityFinder.getCities(city);
//
        APIReturn CityFinder = new APIReturn();
        CityFinder.APIReturn(city);
    }

}
