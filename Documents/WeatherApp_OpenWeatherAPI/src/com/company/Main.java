package com.company;

import java.io.IOException;
import java.util.Scanner;

public class Main {


    private static APIReturn CityFinder;


//    APIReturn CityFinder = new APIReturn();


    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
	// write your code here
        System.out.println("Please enter a city");
        String city = scanner.nextLine();

        CityFinder.getCities(city);



    }
}
