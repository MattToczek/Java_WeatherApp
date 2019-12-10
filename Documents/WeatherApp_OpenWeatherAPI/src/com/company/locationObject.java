package com.company;

public class locationObject {
    String city;
    String region;
    String countryCode;
    double latitude;
    double longitude;

    public void setCity(String value){
        this.city = value;
    }

    public void setRegion(String value){
        this.region = value;
    }

    public void setCode(String value){
        this.countryCode = value;
    }

    public void setLatitude(String value){
        this.latitude = Double.parseDouble(value);
    }

    public void setLongitude(String value){
        this.longitude = Double.parseDouble(value);
    }

    public void setValues(String v1, String v2, String v3, String v4, String v5){
        this.setCity(v1);
        this.setRegion(v2);
        this.setCode(v3);
        this.setLatitude(v4);
        this.setLongitude(v5);
    }
}
