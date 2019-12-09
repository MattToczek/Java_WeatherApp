package com.company;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLEncoder;

public class APIReturn {
    private String city;
    private String[] countriesWithCity;
    private Object URLConnection;

    void getCities(String cityChoice) throws IOException {
        this.city = cityChoice.toLowerCase();

//        String encodedCityName = URLEncoder.encode(city, "UTF-8").replaceAll(" ", "%20");

        java.net.URLConnection cityFinder = new URL("http://battuta.medunes.net/api/city/fr/search/?city=" + this.city + "&key=9e7d437118ca8d6dec01b47fbc2e1e3d").openConnection();

        String header1 = "";
        cityFinder.setRequestProperty("header1", header1);

        String header2 = "";
        cityFinder.setRequestProperty("header2", header2);
//Get Response
        InputStream is = cityFinder.getInputStream();
        System.out.println(cityFinder.getContentType());

    }
}
