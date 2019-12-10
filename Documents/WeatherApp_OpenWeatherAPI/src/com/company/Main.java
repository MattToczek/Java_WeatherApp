package com.company;

import java.io.IOException;
import java.util.Scanner;

public class Main {





//    APIReturn CityFinder = new APIReturn();


    public static void main(String[] args) throws IOException {
        APIReturn CityFinder = new APIReturn();

        Scanner scanner = new Scanner(System.in);
        System.out.println("Please enter a city");
        String city = scanner.nextLine();

        CityFinder.getCities(city);



    }
}
