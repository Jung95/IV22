"use strict";

let metaInfo;

function initPage() {
    //populate page with required elements, e.g., header for title and drawing area
    const main = document.getElementById("main");

    metaInfo = getTutorialInfo(); //should be provided in app.js
    if (!metaInfo)
        metaInfo = { groupNames: "ERROR", exerciseNum: "ERROR" };


    const mainTitle = document.createElement("h1");
    mainTitle.style.fontFamily = "sans-serif";
    mainTitle.style.margin = "1rem auto";
    mainTitle.style.textAlign = "center";
    mainTitle.textContent = "InfoVIS Exercise " + metaInfo.exerciseNum;
    main.appendChild(mainTitle);

    document.title = "InfoVIS Exercise " + metaInfo.exerciseNum;

    const groupBlock = document.createElement("h2");
    groupBlock.style.fontFamily = "sans-serif";
    groupBlock.style.margin = "1rem auto";
    groupBlock.style.textAlign = "center";
    groupBlock.style.color = "gray";
    groupBlock.textContent = metaInfo.groupNames;
    main.appendChild(groupBlock);

    const drawingArea = document.createElement("div");
    drawingArea.id = "mainCanvas";
    drawingArea.style.width = "900px";
    drawingArea.style.height = "1100px";
    drawingArea.style.margin = "4rem auto";
    main.appendChild(drawingArea);

    return drawingArea;
}

function start() {
    if (document.getElementById("mainCanvas"))
        return; //already initialized

    const drawingArea = initPage();

    const params = {
        width: 900,
        height: 1200
    };

    const two = new Two(params);
    two.appendTo(drawingArea);

    //perform drawing instructions, this is defined in app.js
    draw(two);

    // render content, either once or 60 times per second for animated/changeable shapes
    if (metaInfo.isAnimated)
        two.play();
    else
        two.update();
}

// retrive global temperature anomalies data
function getData() {
    const res = {};
    res.a01Task4 =  {
        "description": {
            "title": "Global Land and Ocean Temperature Anomalies, January-October",
            "units": "Degrees Celsius",
            "base_period": "1901-2000",
            "missing": -999
        },
        "tempAnomalies": {
            "1880": -0.12,
            "1881": -0.08,
            "1882": -0.09,
            "1883": -0.17,
            "1884": -0.26,
            "1885": -0.25,
            "1886": -0.23,
            "1887": -0.28,
            "1888": -0.13,
            "1889": -0.08,
            "1890": -0.34,
            "1891": -0.25,
            "1892": -0.30,
            "1893": -0.32,
            "1894": -0.31,
            "1895": -0.24,
            "1896": -0.09,
            "1897": -0.09,
            "1898": -0.27,
            "1899": -0.15,
            "1900": -0.07,
            "1901": -0.15,
            "1902": -0.26,
            "1903": -0.37,
            "1904": -0.45,
            "1905": -0.27,
            "1906": -0.20,
            "1907": -0.38,
            "1908": -0.43,
            "1909": -0.44,
            "1910": -0.40,
            "1911": -0.44,
            "1912": -0.34,
            "1913": -0.32,
            "1914": -0.14,
            "1915": -0.09,
            "1916": -0.33,
            "1917": -0.40,
            "1918": -0.31,
            "1919": -0.25,
            "1920": -0.23,
            "1921": -0.16,
            "1922": -0.25,
            "1923": -0.25,
            "1924": -0.24,
            "1925": -0.18,
            "1926": -0.08,
            "1927": -0.17,
            "1928": -0.18,
            "1929": -0.32,
            "1930": -0.11,
            "1931": -0.06,
            "1932": -0.13,
            "1933": -0.26,
            "1934": -0.11,
            "1935": -0.15,
            "1936": -0.12,
            "1937": -0.01,
            "1938": -0.02,
            "1939": 0.01,
            "1940": 0.16,
            "1941": 0.27,
            "1942": 0.11,
            "1943": 0.11,
            "1944": 0.28,
            "1945": 0.18,
            "1946": -0.01,
            "1947": -0.03,
            "1948": -0.05,
            "1949": -0.07,
            "1950": -0.15,
            "1951": 0.00,
            "1952": 0.04,
            "1953": 0.13,
            "1954": -0.10,
            "1955": -0.13,
            "1956": -0.18,
            "1957": 0.07,
            "1958": 0.12,
            "1959": 0.08,
            "1960": 0.05,
            "1961": 0.09,
            "1962": 0.10,
            "1963": 0.12,
            "1964": -0.14,
            "1965": -0.07,
            "1966": -0.01,
            "1967": 0.00,
            "1968": -0.03,
            "1969": 0.10,
            "1970": 0.06,
            "1971": -0.07,
            "1972": 0.04,
            "1973": 0.19,
            "1974": -0.06,
            "1975": 0.01,
            "1976": -0.07,
            "1977": 0.21,
            "1978": 0.12,
            "1979": 0.23,
            "1980": 0.28,
            "1981": 0.32,
            "1982": 0.19,
            "1983": 0.36,
            "1984": 0.17,
            "1985": 0.16,
            "1986": 0.24,
            "1987": 0.38,
            "1988": 0.39,
            "1989": 0.29,
            "1990": 0.45,
            "1991": 0.39,
            "1992": 0.24,
            "1993": 0.28,
            "1994": 0.34,
            "1995": 0.47,
            "1996": 0.32,
            "1997": 0.51,
            "1998": 0.65,
            "1999": 0.44,
            "2000": 0.42,
            "2001": 0.57,
            "2002": 0.62,
            "2003": 0.64,
            "2004": 0.58,
            "2005": 0.67,
            "2006": 0.63,
            "2007": 0.62,
            "2008": 0.54,
            "2009": 0.64,
            "2010": 0.72,
            "2011": 0.57,
            "2012": 0.63,
            "2013": 0.67,
            "2014": 0.74,
            "2015": 0.93,
            "2016": 0.99,
            "2017": 0.90,
            "2018": 0.82,
            "2019": 0.94,
            "2020": 0.98,
            "2021": 0.84
        }
    }
    return res;
}

// generate the temperature stripes color scale (blue - min temp) --> (red - max temp)
function getStripesColorScale(min, avg, max) {
    let color_scale = chroma.scale('RdBu').domain([max, avg, min], 7, 'quantiles');
    return color_scale;
}

// set bar color (red if positive & blue if negative)
function getTempColor(temp_anomaly) {
    let color = temp_anomaly < 0? 'blue': 'red';
    return color;
}

function xScale(val) {
    return val / 4 * 250
}
function yScale(val) {
    return val / 2 * 450
}

function drawAxes(two) {
    // x
    two.makeLine(xScale(0)+30, yScale(1)+50, xScale(11.35)+30, yScale(1)+50);
    // y
    two.makeLine(xScale(0)+30, yScale(1)-150, xScale(0)+30, yScale(2)-50);
    // y axis ticks
    two.makeLine(xScale(0)+28, yScale(0)+75, xScale(0)+32, yScale(0)+75);
    two.makeLine(xScale(0)+28, yScale(2)-50, xScale(0)+32, yScale(2)-50);
    // y axis values
    two.makeText('1.00°', xScale(0)+13, yScale(0)+75);
    two.makeText('0.00°', xScale(0)+14.5, yScale(1)+50);
    two.makeText('-0.5°', xScale(0)+13, yScale(2)-50);
  }
  

//make sure that everything is loaded and all functions are ready to call before running framework
window.onload = start;
