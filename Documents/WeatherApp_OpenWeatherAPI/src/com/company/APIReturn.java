package com.company;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.ResponseCache;
import java.net.URL;
import java.util.Scanner;

public class APIReturn {

    private String city;
    private String[] countriesWithCity;
    private Object URLConnection;
    String inline;

    public void APIReturn(String cityChoice) throws IOException {
//    public void APIReturn1() throws IOException {


        URL url = new URL("http://battuta.medunes.net/api/city/gb/search/?city=" + cityChoice + "&key=9e7d437118ca8d6dec01b47fbc2e1e3d");
//        URL url = new URL("http://battuta.medunes.net/api/city/gb/search/?city=manchester&key=9e7d437118ca8d6dec01b47fbc2e1e3d");


        HttpURLConnection conn = (HttpURLConnection)url.openConnection();

        conn.setRequestMethod("GET");

        conn.connect();

        int responseCode = conn.getResponseCode();
        System.out.println("HttpResponseCode: " + responseCode);

        if(responseCode != 200)
            throw new RuntimeException("HttpResponseCode: " + responseCode);
        else {

            Scanner sc = new Scanner(url.openStream());
            System.out.println(1);


            while (sc.hasNext())

            {
            inline += sc.nextLine();

            }



            System.out.println("\nJSON data in string format");
            System.out.println(inline);
            sc.close();
        }
    }

}
